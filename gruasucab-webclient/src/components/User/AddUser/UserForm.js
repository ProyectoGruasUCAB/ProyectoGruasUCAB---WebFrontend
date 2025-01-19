import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { recordUserData, setAuthToken } from '../../../api/api';

const UserForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userEmail: localStorage.getItem('userEmail'),
        userId: localStorage.getItem('userID'),
        role: localStorage.getItem('role'),
        name: '',
        phone: '',
        cedulaPrefix: 'V-', // Variable extra para el prefijo
        cedulaNumber: '', // Variable para el número de la cédula
        birthDate: '',
        cedulaExpirationDate: null,
        medicalCertificate: null,
        medicalCertificateExpirationDate: null,
        driverLicense: null,
        driverLicenseExpirationDate: null,
        position: ''
    });

    const [error, setError] = useState('');

    useEffect(() => {
        setUser((prevUser) => ({
            ...prevUser,
            userEmail: localStorage.getItem('userEmail'),
            userId: localStorage.getItem('userID'),
            role: localStorage.getItem('role'),
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleCedulaPrefixChange = (e) => {
        const prefix = e.target.value;
        setUser((prevUser) => ({
            ...prevUser,
            cedulaPrefix: prefix, // Actualizar el prefijo
            cedulaNumber: prevUser.cedulaNumber // Mantener el número
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('authToken');
            setAuthToken(token);

            const formattedUser = {
                ...user,
                birthDate: formatDate(user.birthDate),
                cedula: user.cedulaPrefix + user.cedulaNumber // Unir el prefijo y el número
            };

            const response = await recordUserData(formattedUser);
            console.log('Usuario agregado:', response);
            setUser((prevUser) => ({
                ...prevUser,
                name: '',
                phone: '',
                cedulaPrefix: 'V-', // Reiniciar el prefijo
                cedulaNumber: '',
                birthDate: '',
                cedulaExpirationDate: null,
                medicalCertificate: null,
                medicalCertificateExpirationDate: null,
                driverLicense: null,
                driverLicenseExpirationDate: null,
                position: '',
            }));
            navigate('/orders')
            setError(''); // Limpiar cualquier mensaje de error anterior
        } catch (error) {
            console.error('Error al agregar el usuario:', error);
            setError('Error al agregar el usuario, intenta de nuevo');
        }
    };

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="text-center mb-4">Ingresar datos del usuario</h2>
                <div className="card shadow-sm p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Teléfono:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={user.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cedula" className="form-label">Cédula:</label>
                            <div className="input-group">
                                <select
                                    className="form-select"
                                    value={user.cedulaPrefix} // Solo tomar el prefijo
                                    onChange={handleCedulaPrefixChange}
                                    style={{ maxWidth: '70px' }} // Hacer el recuadro más pequeño
                                >
                                    <option value="V-">V-</option>
                                    <option value="J-">J-</option>
                                </select>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cedulaNumber"
                                    name="cedulaNumber"
                                    value={user.cedulaNumber} // Solo mostrar el número
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="birthDate" className="form-label">Fecha de Nacimiento:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="birthDate"
                                name="birthDate"
                                value={user.birthDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {user.role === 'Trabajador' && (
                            <div className="mb-3">
                                <label htmlFor="position" className="form-label">Posición:</label>
                                <select
                                    className="form-control"
                                    id="position"
                                    name="position"
                                    value={user.position}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccione una posición</option>
                                    <option value="Operador">Operador</option>
                                </select>
                            </div>
                        )}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div className='d-flex justify-content-center'>
                            <button type="submit" className="btn btn-primary w-50">Agregar Usuario</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserForm;

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';
import { updateUserData, getWorkerById } from '../../../api/apiUser';
import { setAuthToken } from '../../../api/apiAuth';

const EditUser = () => {
    const { id } = useParams(); // Obtener el ID del usuario desde la URL
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userEmail: '',
        userId: '',
        role: '',
        name: '',
        phone: '',
        cedulaPrefix: 'V-',
        cedulaNumber: '',
        birthDate: '',
        cedulaExpirationDate: null,
        medicalCertificate: null,
        medicalCertificateExpirationDate: null,
        driverLicense: null,
        driverLicenseExpirationDate: null,
        position: ''
    });
    const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
    const [error, setError] = useState('');

    // Cargar datos del usuario al montar el componente
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                setAuthToken(token); // Configurar el token de autenticación
                const response = await getWorkerById(id); // Fetch datos del usuario
                setUser({
                    ...response.data,
                    cedulaPrefix: response.data.cedula.split('-')[0], // Separar prefijo
                    cedulaNumber: response.data.cedula.split('-')[1]  // Separar número
                });
            } catch (error) {
                console.error('Error al cargar datos del usuario:', error);
                setError('No se pudieron cargar los datos del usuario.');
            } finally {
                setIsLoading(false); // Deshabilitar el estado de carga
            }
        };

        loadUserData();
    }, [id]);

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
            cedulaPrefix: prefix,
            cedulaNumber: prevUser.cedulaNumber
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
                cedula: user.cedulaPrefix + user.cedulaNumber // Unir prefijo y número
            };

            await updateUserData(id, formattedUser); // Actualizar datos del usuario
            navigate('/users'); // Redirigir a la lista de usuarios tras editar
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            setError('Error al actualizar el usuario, intenta de nuevo.');
        }
    };

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    if (isLoading) {
        return <p className="text-center">Cargando datos del usuario...</p>;
    }

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="text-center mb-4">Editar datos del usuario</h2>
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
                                    value={user.cedulaPrefix}
                                    onChange={handleCedulaPrefixChange}
                                    style={{ maxWidth: '70px' }}
                                >
                                    <option value="V-">V-</option>
                                    <option value="J-">J-</option>
                                </select>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cedulaNumber"
                                    name="cedulaNumber"
                                    value={user.cedulaNumber}
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
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary w-50">Actualizar Usuario</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUser;

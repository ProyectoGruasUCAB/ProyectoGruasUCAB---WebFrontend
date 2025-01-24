import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { recordUserData } from '../../../api/apiUser';
import { setAuthToken } from '../../../api/apiAuth';
import { getAllDepartments } from '../../../api/apiDepartment';
import { getAllSuppliers } from '../../../api/apiSuplier';

const UserForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userEmail: localStorage.getItem('userEmail'),
        userId: localStorage.getItem('userID'),
        name: '',
        phone: '',
        cedula: '', 
        birthDate: '',
        cedulaExpirationDate: null,
        medicalCertificate: null,
        medicalCertificateExpirationDate: null,
        driverLicense: null,
        driverLicenseExpirationDate: null,
        position: localStorage.getItem('workerName') || '',
        workplaceId: localStorage.getItem('workerId') || ''
    });
    const [cedulaPrefix, setCedulaPrefix] = useState('V-'); // Variable aparte para el prefijo
    const [departments, setDepartments] = useState([]); // Lista de departamentos
    const [suppliers, setSuppliers] = useState([]); // Lista de proveedores
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const departmentData = await getAllDepartments();
                setDepartments(departmentData.departments);
            } catch (error) {
                console.error('Error al obtener departamentos:', error);
            }
        };

        const fetchAllSuppliers = async () => {
            try {
                const suppliersData = await getAllSuppliers();
                setSuppliers(suppliersData.suppliers);
            } catch (error) {
                console.error('Error al obtener proveedores:', error);
            }
        }

        fetchDepartments();
        fetchAllSuppliers();

        setUser((prevUser) => ({
            ...prevUser,
            userEmail: localStorage.getItem('userEmail'),
            userId: localStorage.getItem('userID'),
            role: localStorage.getItem('role'),
            position: localStorage.getItem('workerName') || '',
            workplaceId: localStorage.getItem('workerId') || ''
        }));
    }, []);

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleCedulaPrefixChange = (e) => {
        setCedulaPrefix(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('authToken');
            setAuthToken(token);

            const formattedUser = {
                ...user,
                birthDate: formatDate(user.birthDate),
                cedula: cedulaPrefix + user.cedula
            };
            console.log(user);
            const response = await recordUserData(formattedUser);
            console.log('Usuario agregado:', response);
            setUser((prevUser) => ({
                ...prevUser,
                name: '',
                phone: '',
                cedula: '',
                birthDate: '',
                cedulaExpirationDate: null,
                medicalCertificate: null,
                medicalCertificateExpirationDate: null,
                driverLicense: null,
                driverLicenseExpirationDate: null,
                position: '',
                workplaceId: '' // Restablecer el campo del id del departamento o proveedor
            }));

            if (localStorage.getItem('role') === "Proveedor") {
                navigate('/vehicles');
            } else {
                navigate('/orders');
            }

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
                                onChange={handleUserChange}
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
                                onChange={handleUserChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cedula" className="form-label">Cédula:</label>
                            <div className="input-group">
                                <select
                                    className="form-select"
                                    value={cedulaPrefix} // Solo tomar el prefijo
                                    onChange={handleCedulaPrefixChange}
                                    style={{ maxWidth: '70px' }} // Hacer el recuadro más pequeño
                                >
                                    <option value="V-">V-</option>
                                    <option value="J-">J-</option>
                                </select>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cedula"
                                    name="cedula"
                                    value={user.cedula} // Solo mostrar el número
                                    onChange={handleUserChange}
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
                                onChange={handleUserChange}
                                required
                            />
                        </div>
                    
                        
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
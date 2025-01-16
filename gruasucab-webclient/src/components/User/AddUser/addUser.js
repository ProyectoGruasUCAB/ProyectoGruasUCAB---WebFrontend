import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUser, setAuthToken } from '../../../api/api';

const AddUser = () => {
    const { role } = useParams();

    const [user, setUser] = useState({
        userEmail: '',
        emailToCreate: '',
        nameRole: role,
        workplaceId: ''
    });

    const [error, setError] = useState('');

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            setUser((prevUser) => ({ ...prevUser, userEmail}));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('authToken');
            setAuthToken(token);
            const response = await createUser(user);
            console.log('Usuario agregado:', response);
            setUser({
                userEmail: '',
                emailToCreate: '',
                nameRole: role,
                workplaceId: ''
            });
            setError(''); // Limpiar cualquier mensaje de error anterior
        } catch (error) {
            console.error('Error al agregar el usuario:', error);
            setError('Error al agregar el usuario, intenta de nuevo');
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="text-center mb-4">Agregar Usuario</h2>
                <div className="card shadow-sm p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="userEmail" className="form-label">Correo del Usuario:</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="user@example.com"
                                id="userEmail"
                                name="userEmail"
                                value={user.userEmail}
                                readOnly
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="emailToCreate" className="form-label">Confirma tu correo:</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="user@example.com"
                                id="emailToCreate"
                                name="emailToCreate"
                                value={user.emailToCreate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="workplaceId" className="form-label">ID del Lugar de Trabajo:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="ID del Lugar de Trabajo"
                                id="workplaceId"
                                name="workplaceId"
                                value={user.workplaceId}
                                onChange={handleChange}
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

export default AddUser;

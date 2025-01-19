import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUser, setAuthToken } from '../../../api/api';

const AddUser = () => {
    const { role } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        emailToCreate: '',
    });

    const [error, setError] = useState('');

    useEffect(() => {
       
        const userEmail = localStorage.getItem('userEmail');  
        
        setUser({
            userEmail: userEmail,
            userId: localStorage.getItem('userID'),
            emailToCreate: '',
            nameRole: role,
            workplaceId: localStorage.getItem('userID'),
        });
    }, [role]); // Se ejecuta cuando cambia el valor de `role`

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
            await createUser(user);
            setUser((prevUser) => ({
                ...prevUser,
                emailToCreate: '',
            }));
            setError(''); // Limpiar cualquier mensaje de error anterior
            navigate("/orders");
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
                            <label htmlFor="emailToCreate" className="form-label">Correo electrónico:</label>
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

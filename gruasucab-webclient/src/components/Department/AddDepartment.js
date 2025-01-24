import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setAuthToken } from '../../api/apiAuth';
import { createDepartment } from '../../api/apiDepartment';

const AddDepartment = () => {
    const navigate = useNavigate();
    const [department, setDepartment] = useState({
        userEmail: '',
        userId: '',
        name: '',
        descripcion: '',
    });

    const [error, setError] = useState('');

    useEffect(() => {
        setDepartment({
            userEmail: localStorage.getItem('userEmail'),
            userId: localStorage.getItem('userID'),
            name: '',
            descripcion: '',
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({
            ...department,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('authToken');
            setAuthToken(token);
            await createDepartment(department);
            setDepartment({
                userEmail: localStorage.getItem('userEmail'),
                userId: localStorage.getItem('userID'),
                name: '',
                descripcion: '',
            });
            setError(''); // Limpiar cualquier mensaje de error anterior
            navigate("/departments");
        } catch (error) {
            console.error('Error al agregar el departamento:', error);
            setError('Error al agregar el departamento, intenta de nuevo');
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="text-center mb-4">Agregar Departamento</h2>
                <div className="card shadow-sm p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre del departamento"
                                id="name"
                                name="name"
                                value={department.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="descripcion" className="form-label">Descripción:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Descripción del departamento"
                                id="descripcion"
                                name="descripcion"
                                value={department.descripcion}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div className='d-flex justify-content-center'>
                            <button type="submit" className="btn btn-primary w-50">Agregar Departamento</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDepartment;

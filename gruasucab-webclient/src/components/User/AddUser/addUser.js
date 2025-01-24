import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUser, setAuthToken } from '../../../api/apiAuth';
import { getAllDepartments } from '../../../api/apiDepartment';
import { getAllSuppliers } from '../../../api/apiSuplier';

const AddUser = () => {
    const { role } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
            userEmail: localStorage.getItem('userEmail'),
            userId: localStorage.getItem('userID'),
            emailToCreate: '',
            nameRole: role,
            workplaceId: '',
            position: 'Empty'
    });

    const [departments, setDepartments] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const data = await getAllDepartments();
                setDepartments(data.departments);
            } catch (error) {
                console.error('Error al obtener los departamentos:', error);
            }
        };

        const fetchSuppliers = async () => {
            try {
                const data = await getAllSuppliers();
                setSuppliers(data.suppliers);
            } catch (error) {
                console.error('Error al obtener los proveedores:', error);
            }
        };

        if (role === 'Trabajador') {
            fetchDepartments();
        } else if (role === 'Conductor' || role === 'Proveedor') {
            fetchSuppliers();
        }

        const userEmail = localStorage.getItem('userEmail');  
        
        setUser({
            userEmail: localStorage.getItem('userEmail'),
            userId: localStorage.getItem('userID'),
            emailToCreate: '',
            nameRole: role,
            workplaceId: '',
            position: ''
        });
    }, [role]);

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
            console.log(user);
            await createUser(user);
            setUser((prevUser) => ({
                ...prevUser,
                emailToCreate: '',
                position: '',
                workplaceId: ''
            }));
            setError('');
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
                        {role === 'Trabajador' && (
                            <>
                                <div className="mb-3">
                                    <label htmlFor="departmentId" className="form-label">Departamento:</label>
                                    <select
                                        className="form-control"
                                        id="departmentId"
                                        name="workplaceId"
                                        value={user.workplaceId}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Selecciona un departamento</option>
                                        {departments.map(department => (
                                            <option key={department.departmentId} value={department.departmentId}>
                                                {department.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="position" className="form-label">Posición:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="position"
                                        name="position"
                                        value={user.position}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </>
                        )}
                        {(role === 'Conductor' || role === 'Proveedor') && (
                            <div className="mb-3">
                                <label htmlFor="supplierId" className="form-label">Proveedor:</label>
                                <select
                                    className="form-control"
                                    id="supplierId"
                                    name="workplaceId"
                                    value={user.workplaceId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecciona un proveedor</option>
                                    {suppliers.map(supplier => (
                                        <option key={supplier.supplierId} value={supplier.supplierId}>
                                            {supplier.name}
                                        </option>
                                    ))}
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

export default AddUser;

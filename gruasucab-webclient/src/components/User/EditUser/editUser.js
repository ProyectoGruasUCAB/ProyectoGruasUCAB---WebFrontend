import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditUser = ({ getUserData, updateUser }) => {
    const { role, id } = useParams();
    const fields = getFieldsForRole(role);

    const [user, setUser] = useState(() => {
        const initialState = {};
        fields.forEach(field => initialState[field.name] = '');
        return initialState;
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUserData(id);
            setUser(userData);
        };
        fetchUserData();
    }, [id, getUserData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(id, user);
        console.log(`Usuario ${role} actualizado:`, user);
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="text-center mb-4">Editar {role}</h2>
                <div className="card shadow-sm p-4">
                    {user ? (
                        <form onSubmit={handleSubmit}>
                            {fields.map((field, index) => (
                                <div key={index} className="mb-3">
                                    <label htmlFor={field.name} className="form-label">{field.label}:</label>
                                    <input
                                        type={field.type}
                                        className="form-control"
                                        placeholder={field.placeholder}
                                        id={field.name}
                                        name={field.name}
                                        value={user[field.name] || ''}
                                        onChange={handleChange}
                                        required={field.required}
                                    />
                                </div>
                            ))}
                            <div className='d-flex justify-content-center'>
                                <button type="submit" className="btn btn-primary w-50">Actualizar {role}</button>
                            </div>
                        </form>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const getFieldsForRole = (role) => {
    switch (role) {
        case 'Operador':
            return [
                { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Nombre...', required: true },
                { name: 'lastname', label: 'Apellido', type: 'text', placeholder: 'Apellido...', required: true },
                { name: 'email', label: 'Correo Electrónico', type: 'email', placeholder: 'ejemplo@correo.com...', required: true },
                { name: 'cedulaNumber', label: 'Número de Cédula', type: 'text', placeholder: 'Cédula...', required: true },
                { name: 'phoneNumber', label: 'Número de Teléfono', type: 'text', placeholder: '0123 4567890', required: true }
            ];
        case 'Proveedor':
            return [
                { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Nombre...', required: true },
                { name: 'lastname', label: 'Apellido', type: 'text', placeholder: 'Apellido...', required: true },
                { name: 'email', label: 'Correo Electrónico', type: 'email', placeholder: 'ejemplo@correo.com...', required: true },
                { name: 'cedulaNumber', label: 'Número de Cédula', type: 'text', placeholder: 'Cédula...', required: true },
                { name: 'phoneNumber', label: 'Número de Teléfono', type: 'text', placeholder: '0123 4567890', required: true },
                { name: 'company', label: 'Empresa', type: 'text', placeholder: 'Empresa...', required: true }
            ];
        case 'Conductor':
            return [
                { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Nombre...', required: true },
                { name: 'lastname', label: 'Apellido', type: 'text', placeholder: 'Apellido...', required: true },
                { name: 'email', label: 'Correo Electrónico', type: 'email', placeholder: 'ejemplo@correo.com...', required: true },
                { name: 'cedulaNumber', label: 'Número de Cédula', type: 'text', placeholder: 'Cédula...', required: true },
                { name: 'phoneNumber', label: 'Número de Teléfono', type: 'text', placeholder: '0123 4567890', required: true },
                { name: 'carLicense', label: 'Licencia de Conducción', type: 'text', placeholder: 'Licencia...'}
            ];
        case 'Cliente':
            return [
                { name: 'name', label: 'Nombre de Cliente', type: 'text', placeholder: 'Nombre...', required: true },
                { name: 'lastname', label: 'Apellido', type: 'text', placeholder: 'Apellido...', required: true },
                { name: 'email', label: 'Correo Electrónico', type: 'email', placeholder: 'ejemplo@correo.com...', required: true },
                { name: 'cedulaNumber', label: 'Número de Cédula', type: 'text', placeholder: 'Cédula...', required: true },
                { name: 'phoneNumber', label: 'Número de Teléfono', type: 'text', placeholder: '0123 4567890', required: true },
                { name: 'policy', label: 'Póliza', type: 'text', placeholder: 'Poliza...', required: true }
            ];
        default:
            return [];
    }
};

export default EditUser;

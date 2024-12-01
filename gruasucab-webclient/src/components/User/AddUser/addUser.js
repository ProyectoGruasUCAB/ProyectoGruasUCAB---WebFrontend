import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddUser = () => {
    const { role } = useParams();
    const fields = getFieldsForRole(role);

    const [user, setUser] = useState(() => {
        const initialState = {};
        fields.forEach(field => initialState[field.name] = '');
        return initialState;
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Usuario ${role} agregado:`, user);
        const resetState = {};
        fields.forEach(field => resetState[field.name] = '');
        setUser(resetState);
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="text-center mb-4">Agregar {role}</h2>
                <div className="card shadow-sm p-4">
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
                                    value={user[field.name]}
                                    onChange={handleChange}
                                    required={field.required}
                                />
                            </div>
                        ))}
                        <div className='d-flex justify-content-center'>
                            <button type="submit" className="btn btn-primary w-50">Agregar {role}</button>
                        </div>
                    </form>
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
                { name: 'policy', label: 'Póliza', type: 'Text', placeholder: 'Poliza...', required: true}
                ];
        case 'Vehiculo':
            return [
                { name: 'name', label: 'Nombre del Vehículo', type: 'text', placeholder: 'Nombre...', required: true },
                { name: 'color', label: 'Color', type: 'text', placeholder: 'Color...', required: true },
                { name:'model', label: 'Modelo', type: 'text', placeholder: 'Modelo...', required: true },
                { name: 'year', label: 'Año', type: 'number', placeholder: 'Año...', required: true },
                { name: 'licensePlate', label: 'Placa', type: 'text', placeholder: 'Placa...', required: true },
                { name: 'suplier', label: 'Proveedor', type: 'text', placeholder: 'Proveedor...', required: true },
            ];
        // Añadir más roles y sus campos correspondientes aquí
        default:
            return [];
    }
};

export default AddUser;

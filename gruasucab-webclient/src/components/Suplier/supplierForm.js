import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createSupplier } from '../../api/apiSuplier';
import { setAuthToken } from '../../api/apiAuth';

const SupplierForm = () => {
    const navigate = useNavigate();
    const [supplier, setSupplier] = useState({
        userEmail: localStorage.getItem('userEmail'),
        userId: localStorage.getItem('userID'),
        name: '',
        type: ''
    });
    const [error, setError] = useState('');

    const handleSupplierChange = (e) => {
        const { name, value } = e.target;
        setSupplier((prevSupplier) => ({
            ...prevSupplier,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('authToken');
            setAuthToken(token);

            await createSupplier(supplier);
            console.log('Proveedor agregado:', supplier);

            setSupplier({
                userEmail: localStorage.getItem('userEmail'),
                userId: localStorage.getItem('userID'),
                name: '',
                type: ''
            });

            navigate('/user-form');
            setError(''); // Limpiar cualquier mensaje de error anterior
        } catch (error) {
            console.error('Error al agregar el proveedor:', error);
            setError('Error al agregar el proveedor, intenta de nuevo');
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="text-center mb-4">Ingresar datos del proveedor</h2>
                <div className="card shadow-sm p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="supplierName" className="form-label">Nombre de la empresa:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="supplierName"
                                name="name"
                                value={supplier.name}
                                onChange={handleSupplierChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="supplierType" className="form-label">Tipo:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="supplierType"
                                name="type"
                                value={supplier.type}
                                onChange={handleSupplierChange}
                                required
                            />
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div className='d-flex justify-content-center'>
                            <button type="submit" className="btn btn-primary w-50">Agregar Proveedor</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SupplierForm;

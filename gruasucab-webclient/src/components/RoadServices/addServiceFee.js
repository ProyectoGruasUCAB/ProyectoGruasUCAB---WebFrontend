import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setAuthToken } from '../../api/apiAuth';
import { createServiceFee } from '../../api/apiServiceFee';

const AddServiceFee = () => {
    const { role } = useParams();
    const navigate = useNavigate();
    const [serviceFee, setServiceFee] = useState({
        userEmail: '',
        userId: '',
        name: '',
        description: '',
        price: '',
        priceKm: '',
        radius: '',
    });

    const [error, setError] = useState('');

    useEffect(() => {
        setServiceFee({
            userEmail: localStorage.getItem('userEmail'),
            userId: localStorage.getItem('userID'),
            name: '',
            description: '',
            price: '',
            priceKm: '',
            radius: '',
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceFee({
            ...serviceFee,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('authToken');
            setAuthToken(token);
            await createServiceFee(serviceFee);
            setServiceFee({
                userEmail: localStorage.getItem('userEmail'),
                userId: localStorage.getItem('userID'),
                name: '',
                description: '',
                price: '',
                priceKm: '',
                radius: '',
            });
            setError(''); // Limpiar cualquier mensaje de error anterior
            navigate("/orders");
        } catch (error) {
            console.error('Error al agregar la tarifa de servicio:', error);
            setError('Error al agregar la tarifa de servicio, intenta de nuevo');
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="text-center mb-4">Agregar Tarifa de Servicio</h2>
                <div className="card shadow-sm p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre de la tarifa"
                                id="name"
                                name="name"
                                value={serviceFee.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descripción:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Descripción de la tarifa"
                                id="description"
                                name="description"
                                value={serviceFee.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Precio:</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Precio de la tarifa"
                                id="price"
                                name="price"
                                value={serviceFee.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="priceKm" className="form-label">Precio por Km:</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Precio por Km"
                                id="priceKm"
                                name="priceKm"
                                value={serviceFee.priceKm}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="radius" className="form-label">Radio:</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Radio de cobertura"
                                id="radius"
                                name="radius"
                                value={serviceFee.radius}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div className='d-flex justify-content-center'>
                            <button type="submit" className="btn btn-primary w-50">Agregar Tarifa</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddServiceFee;

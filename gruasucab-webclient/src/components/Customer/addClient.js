import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setAuthToken } from '../../api/apiAuth';
import { createClient } from '../../api/apiClient';

const AddClient = () => {
    const navigate = useNavigate();
    const [client, setClient] = useState({
        nombre_completo_cliente: '',
        cedula_cliente: '',
        tlf_cliente: '',
        fecha_nacimiento_cliente: '',
    });

    const [error, setError] = useState('');

    useEffect(() => {
        setClient({
            nombre_completo_cliente: '',
            cedula_cliente: '',
            tlf_cliente: '',
            fecha_nacimiento_cliente: '',
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient({
            ...client,
            [name]: value
        });
    };

    const formatFechaNacimiento = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}T00:00:00`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('authToken');
            setAuthToken(token);

            const formattedDate = formatFechaNacimiento(client.fecha_nacimiento_cliente);

            const clientData = {
                ...client,
                fecha_nacimiento_cliente: '1985-05-15T00:00:00',
            };
            console.log(clientData);
            await createClient(clientData);
            setClient({
                nombre_completo_cliente: '',
                cedula_cliente: '',
                tlf_cliente: '',
                fecha_nacimiento_cliente: '',
            });
            setError(''); // Limpiar cualquier mensaje de error anterior
            navigate("/customer");
        } catch (error) {
            console.error('Error al agregar el cliente:', error);
            setError('Error al agregar el cliente, intenta de nuevo');
        }
    };

    /*   <div className="mb-3">
                            <label htmlFor="fecha_nacimiento_cliente" className="form-label">Fecha de Nacimiento:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="fecha_nacimiento_cliente"
                                name="fecha_nacimiento_cliente"
                                value={client.fecha_nacimiento_cliente}
                                onChange={handleChange}
                                required
                            />*/

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="text-center mb-4">Agregar Cliente</h2>
                <div className="card shadow-sm p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nombre_completo_cliente" className="form-label">Nombre Completo:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre Completo del Cliente"
                                id="nombre_completo_cliente"
                                name="nombre_completo_cliente"
                                value={client.nombre_completo_cliente}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cedula_cliente" className="form-label">Cédula:</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Cédula del Cliente"
                                id="cedula_cliente"
                                name="cedula_cliente"
                                value={client.cedula_cliente}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tlf_cliente" className="form-label">Teléfono:</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Teléfono del Cliente"
                                id="tlf_cliente"
                                name="tlf_cliente"
                                value={client.tlf_cliente}
                                onChange={handleChange}
                                required
                            />
                        </div>
                     
                        
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div className='d-flex justify-content-center'>
                            <button type="submit" className="btn btn-primary w-50">Agregar Cliente</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddClient;

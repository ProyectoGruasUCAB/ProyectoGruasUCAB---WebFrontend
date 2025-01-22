import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';
import { updateDepartment, getDepartmentById } from '../../api/apiDepartment';
import { setAuthToken } from '../../api/apiAuth';

const EditDepartment = () => {
    const { id } = useParams(); // Obtener el ID del departamento desde la URL
    const navigate = useNavigate();
    const [department, setDepartment] = useState({
        userEmail: '',
        userId: '',
        departmentId: '',
        name: '',
        descripcion: ''
    });
    const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
    const [error, setError] = useState('');

    // Cargar datos del departamento al montar el componente
    useEffect(() => {
        const loadDepartmentData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                setAuthToken(token); // Configurar el token de autenticación
                const response = await getDepartmentById(id); // Fetch datos del departamento
                setDepartment({
                    ...response.department,
                    userEmail: localStorage.getItem('userEmail'), // Asegurar que el userEmail y userId sean los correctos
                    userId: localStorage.getItem('userID')
                });
            } catch (error) {
                console.error('Error al cargar datos del departamento:', error);
                setError('No se pudieron cargar los datos del departamento.');
            } finally {
                setIsLoading(false); // Deshabilitar el estado de carga
            }
        };

        loadDepartmentData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment((prevDepartment) => ({
            ...prevDepartment,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('authToken');
            setAuthToken(token);
            console.log("Departamento", department);
            await updateDepartment(department); // Actualizar datos del departamento
            navigate('/departments'); // Redirigir a la lista de departamentos tras editar
        } catch (error) {
            console.error('Error al actualizar el departamento:', error);
            setError('Error al actualizar el departamento, intenta de nuevo.');
        }
    };

    if (isLoading) {
        return <p className="text-center">Cargando datos del departamento...</p>;
    }

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="text-center mb-4">Editar datos del departamento</h2>
                <div className="card shadow-sm p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre:</label>
                            <input
                                type="text"
                                className="form-control"
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
                                id="descripcion"
                                name="descripcion"
                                value={department.descripcion}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary w-50">Actualizar Departamento</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditDepartment;

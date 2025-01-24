import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { changePassword, setAuthToken } from '../../../api/apiAuth';
import { getWorkerById, getProviderById } from '../../../api/apiUser';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const UserProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
       const fetchUserData = async () => {
         try {
            const role = localStorage.getItem('role');
            setRole(role);
            const userId = localStorage.getItem('userID');
           if (role === "Trabajador") {
             const userData = await getWorkerById(userId);
             setUser(userData.worker);
           } else if (role === "Proveedor") {
             const userData = await getProviderById(userId);
             setUser(userData.provider);
           } 
           console.log("Usuario:", user)
         } catch (error) {
           console.error('Error al cargar los datos:', error);
           alert('Error al cargar datos del usuario');
         }
       };
   
         fetchUserData();
     }, []);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            setAuthToken(token);

            await changePassword(user.userEmail, newPassword);
            console.log('Contraseña cambiada correctamente.');
            handleCloseModal();
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
        }
    };

    const handleAddCompany = () => {
        navigate('/supplier-form');
    };

    return (
        <Container className="mt-5 d-flex justify-content-center">
            <div style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="text-center mb-4">Perfil de Usuario</h2>
                <Card className="shadow-sm p-4">
                    <div className="mb-3">
                        <label className="form-label">Nombre:</label>
                        <p>{user.name}</p>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Correo Electrónico:</label>
                        <p>{user.userEmail}</p>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Número de Cédula:</label>
                        <p>{user.cedula}</p>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Número de Teléfono:</label>
                        <p>{user.phone}</p>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha de Nacimiento:</label>
                        <p>{user.birthDate}</p>
                    </div>
                    {role === 'Trabajador' && (
                        <div className="mb-3">
                            <label className="form-label">Posición:</label>
                            <p>{user.position}</p>
                        </div>
                    )}
                    {role === 'Proveedor' && (
                        <div className="mb-3">
                            <label className="form-label">Supplier Id:</label>
                            <p>{user.supplierId}</p>
                        </div>
                    )}
                    <div className="d-flex justify-content-start">
                        <Button variant="outline-secondary" onClick={handleShowModal} className="me-2">
                            Cambiar Contraseña
                        </Button>
                        <Button variant="outline-primary" onClick={handleAddCompany}>
                            Agregar Empresa
                        </Button>
                    </div>
                </Card>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cambiar Contraseña</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleChangePassword}>
                            <Form.Group className="mb-3" controlId="formNewPassword">
                                <Form.Label>Nueva Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Ingresa la nueva contraseña"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Cambiar Contraseña
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </Container>
    );
};

export default UserProfile;

import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { changePassword, getWorkerById, setAuthToken } from '../../../api/api';

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser(userData);
        }
    }, []);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            setAuthToken(token);

            await changePassword(userEmail, newPassword);
            console.log('Contraseña cambiada correctamente.');
            handleCloseModal();
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
        }
    };

    const fetchUserData = async () => {
        const role = localStorage.getItem('role');
        const token = localStorage.getItem('authToken');
        const userid = localStorage.getItem('userID');
        setAuthToken(token);
        if (role === "Trabajador") {
            try {
                const workerData = await getWorkerById(userid);
                setUser(workerData.worker);
            } catch (error) {
                console.error('Error al obtener los datos del trabajador:', error);
            }
        }
    };

    const userEmail = localStorage.getItem('userEmail');
    
    useEffect(() => {
        fetchUserData();
    }, []);

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
                        <label className="form-label">Apellido:</label>
                        <p>{user.lastname}</p>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Correo Electrónico:</label>
                        <p>{userEmail}</p>
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
                    <div className="mb-3">
                        <label className="form-label">Posición:</label>
                        <p>{user.position}</p>
                    </div>
                    <div className="d-flex justify-content-start">
                        <Button variant="outline-secondary" onClick={handleShowModal}>
                            Cambiar Contraseña
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

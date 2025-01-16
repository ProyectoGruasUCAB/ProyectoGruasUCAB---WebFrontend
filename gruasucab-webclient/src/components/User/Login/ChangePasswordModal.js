import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ChangePasswordModal = ({ isOpen, onClose, onSubmit }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(currentPassword, newPassword);
      setMessage('Contraseña cambiada con éxito.');
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      console.error('Error al cambiar la contraseña', error);
      setMessage('Error al cambiar la contraseña. Por favor, inténtalo de nuevo.');
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setCurrentPassword('');
      setNewPassword('');
      setMessage('');
    }
  }, [isOpen]);

  const handleClickOutside = (event) => {
    if (event.target.className.includes('modal')) {
      onClose();
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} onClick={handleClickOutside}>
      <Modal.Header closeButton>
        <Modal.Title>Cambiar Contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCurrentPassword">
            <Form.Label>Contraseña Actual</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña actual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formNewPassword" className="mt-3">
            <Form.Label>Nueva Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>
          {message && <p className="mt-3">{message}</p>}
          <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
            Cambiar Contraseña
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChangePasswordModal;

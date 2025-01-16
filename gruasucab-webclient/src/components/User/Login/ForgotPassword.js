import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { forgotPassword, setAuthToken } from '../../../api/api'; // Asegúrate de ajustar la ruta a tu api.js

const ForgotPassword = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      setAuthToken(token); 
      await forgotPassword(email);
      setMessage('Correo enviado con éxito. Por favor, revisa tu bandeja de entrada.');
      setEmail('');  // Limpiar el campo de correo electrónico después de enviar el formulario
    } catch (error) {
      console.error('Error al enviar el correo', error);
      setMessage('Error al enviar el correo. Por favor, inténtalo de nuevo.');
    }
  };

  // Reiniciar el estado cuando el modal se cierra
  useEffect(() => {
    if (!show) {
      setEmail('');
      setMessage('');
    }
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Olvidaste tu Contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          {message && <p>{message}</p>}
          <Button variant="primary" type="submit" style={{marginTop: '10px'}}>
            Enviar Correo
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPassword;

import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { handleIncompleteAccount } from '../../../api/api'; // Asegúrate de ajustar la ruta a tu api.js
import { useNavigate } from 'react-router-dom';

const ChangePassword = ({ userEmail }) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await handleIncompleteAccount(userEmail, password, newPassword);
      console.log('Contraseña actualizada con éxito.');
      navigate('/orders'); // Redirigir a la página de "Orders" después de actualizar la contraseña exitosamente
    } catch (error) {
      console.error('Error al actualizar la contraseña', error);
      setError('Error al actualizar la contraseña. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <Container className="mt-5">
      <div className="d-flex flex-column align-items-center">
        <Card className="p-5 shadow" style={{ width: '100%', maxWidth: '500px' }}>
          <Card.Body>
            <h1 className="mb-4">Cambiar Contraseña</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Contraseña Actual</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña actual"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formNewPassword" className="mb-3">
                <Form.Label>Nueva Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu nueva contraseña"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Label>Confirmar Nueva Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirma tu nueva contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
              {error && <p className="text-danger">{error}</p>}
              <Button variant="primary" type="submit">Cambiar Contraseña</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default ChangePassword;

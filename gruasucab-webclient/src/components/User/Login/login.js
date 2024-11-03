import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import './login.css';

function Login({onLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para manejar el login
    console.log('Iniciar sesión:', { email, password });
  };

  return (
    <Container className="login-container mt-5">
      <Card className="p-5 shadow">
        <Card.Body>
          <h1 className="mb-4">Iniciar Sesión</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control-lg"
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control-lg"
              />
            </Form.Group>
            <Button onClick={onLogin} variant="primary" type="submit" className="btn-lg w-100">
              Iniciar Sesión
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
/*
Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};*/

export default Login;

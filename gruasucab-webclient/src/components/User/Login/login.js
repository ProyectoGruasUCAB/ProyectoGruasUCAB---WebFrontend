import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Lista de usuarios simulada con roles
  const users = [
    { email: 'admin@example.com', password: 'adminpass', role: 'Administrador', name: 'Nombre1', lastname: 'Apellido1', cedulaNumber: '12345678', phoneNumber: '04141234567'},
    { email: 'operator@example.com', password: 'operatorpass', role: 'Operador', name: 'Nombre2', lastname: 'Apellido2', cedulaNumber: '12345678', phoneNumber: '04141234567'},
    { email: 'provider@example.com', password: 'providerpass', role: 'Proveedor', name: 'Nombre3', lastname: 'Apellido3', cedulaNumber: '12345678', phoneNumber: '04141234567'},
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lógica simple de autenticación
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      console.log('Iniciar sesión:', { email, password, role: user.role });
      localStorage.setItem('user', JSON.stringify(user)); // Guardar la información del usuario en localStorage
      onLogin(user); // Pasar el usuario completo al callback onLogin
    } else {
      console.log('Credenciales incorrectas');
      alert('Correo o contraseña incorrectos');
    }
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
            <Button variant="primary" type="submit" className="btn-lg w-100">
              Iniciar Sesión
            </Button>
          </Form>
          <div className="text-center mt-3">
            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;

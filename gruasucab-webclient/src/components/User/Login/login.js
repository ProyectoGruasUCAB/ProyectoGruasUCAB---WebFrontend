
import { login } from '../../../api/apiLogin'; // Importa la función de login
import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Estado para manejar errores

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await login(email, password);
      console.log('Iniciar sesión:', user);
      localStorage.setItem('authToken', user.token); // Guardar la información del usuario en localStorage
      onLogin(user); // Pasar el usuario completo al callback onLogin
    } catch (error) {
      console.error('Credenciales incorrectas', error);
      setError('Correo o contraseña incorrectos');
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
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

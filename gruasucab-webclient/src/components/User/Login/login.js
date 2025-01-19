import { login, handleIncompleteAccount, getWorkerById, getProviderById, setAuthToken } from '../../../api/api';
import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../images/LOGO UCAB CON GRUA color.png';
import { useUser } from './UserContext';
import ForgotPassword from './ForgotPassword';
import './login.css';
import ChangePasswordModal from './ChangePasswordModal';

function Login({ onLogin, onLogout }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await login(email, password);
      console.log('Iniciar sesión:', user);
      localStorage.setItem('authToken', user.token); 
      localStorage.setItem('refreshToken', user.refreshToken);
      localStorage.setItem('userID', user.userID);
      localStorage.setItem('userEmail', user.userEmail);
      localStorage.setItem('role', user.role);
      setAuthToken(user.token);
      setUser(user); 
      onLogin(user);

      if (user.role === "Trabajador" || user.role === "Proveedor") {
        try {
          if (user.role === "Trabajador") {
            try {
              const userId = localStorage.getItem('userID');
              await getWorkerById(userId);
              navigate('/orders');
            } catch (error) {
              if (error.status === 500) {
                console.log("Completar Trabajador");
                navigate('/user-form');
              }
            }
          } else if (user.role === "Proveedor") {
            try {
              await getProviderById(localStorage.getItem('userID'));
              navigate('/orders');
            } catch (error) {
              if (error.status === 500) {
                console.log("Completar Proveedor");
                navigate('/user-form');
              }
            }
          } 
        } catch (error) {
          if (error.status === 500) {
            console.log("Completar usuario");
            navigate('/user-form');
          } else {
            console.error("Error desconocido");
            setError("Ocurrió un error desconocido");
          }
        }
      } else {
        navigate('/orders');
      }
    } catch (error) {
      if (error.message === "Account is not fully set up") {
        setModalOpen(true);
      } else {
        console.error('Credenciales incorrectas', error);
        setError('Correo o contraseña incorrectos');
      }
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSubmit = async (currentPassword, newPassword) => {
    try {
      await handleIncompleteAccount(email, currentPassword, newPassword);
      alert('Contraseña cambiada con éxito');
      setModalOpen(false);
    } catch (error) {
      alert('Error al cambiar la contraseña');
    }
  };

  return (
    <Container className="login-container mt-5">
      <div className="d-flex flex-column align-items-center">
        <img src={logo} alt="Logo GruasUCAB" className="logo mb-3" />
        <h1 style={{ paddingBottom: '30px' }}>Gruas<strong>UCAB</strong></h1>
        <Card className="p-5 shadow" style={{ width: '100%', maxWidth: '500px' }}>
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
              <Link to="/#" onClick={() => setShowForgotPassword(true)}>¿Olvidaste tu contraseña?</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
      <ForgotPassword show={showForgotPassword} handleClose={() => setShowForgotPassword(false)} />
      <ChangePasswordModal isOpen={isModalOpen} onClose={handleModalClose} onSubmit={handleModalSubmit} />
    </Container>
  );
}

export default Login;

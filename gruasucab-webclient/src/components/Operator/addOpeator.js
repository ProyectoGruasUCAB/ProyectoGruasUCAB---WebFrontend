import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import '../UI/showListCustom.css';  // Importa el archivo CSS que crearemos

function AddOperator() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para agregar un nuevo operador
    console.log('Agregar Operador:', { name, email });
    setName('');
    setEmail('');
  };

  return (
    <Container className="add-operator-container mt-5">
      <Card className="p-4 shadow">
        <Card.Body>
          <h1 className="mb-4">Agregar Operador</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control-lg"
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa el correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control-lg"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="btn-lg w-100">
              Agregar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddOperator;

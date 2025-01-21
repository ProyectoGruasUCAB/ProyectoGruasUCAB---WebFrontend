import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import './showListCustom.css';

function ShowList({ title, role, initialItems }) {
  const [items] = useState(initialItems || []);
  const navigate = useNavigate();

  const handleUserDetail = (id) => {
    navigate(`/users/${role}/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/editUser/${role}/${id}`);
  };

  const handleAddUser = () => {
    navigate(`/addUser/${role}`);
  };

  return (
    <Container>
      <Row className="my-4 align-items-center">
        <Col xs="auto">
          <h1>{title}</h1>
        </Col>
        <Col xs="auto">
          <Button className="btn-primario" onClick={handleAddUser}>
            Agregar {title}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cédula</th>
                <th>Correo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? 'bg-light' : 'bg-white'}>
                    <td>{item.name}</td>
                    <td>{item.cedula}</td>
                    <td>{item.userEmail}</td>
                    <td className="text-end">
                      {/* Botón Ver */}
                      <Button
                        variant="info"
                        className="ms-2"
                        onClick={() => handleUserDetail(item.id)}
                      >
                        Ver
                      </Button>
                      {/* Botón Editar */}
                      <Button
                        variant="warning"
                        className="ms-2"
                        onClick={() => handleEdit(item.id)}
                      >
                        Editar
                      </Button>
                      {/* Botón Eliminar */}
                     
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No se encontraron resultados.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

// Validación de props
ShowList.propTypes = {
  title: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  initialItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    cedula: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
  })).isRequired,
};

export default ShowList;

import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import '../UI/showListCustom.css';

function ShowListProviders({ title, initialItems }) {
  const [items] = useState(initialItems || []);
  const navigate = useNavigate();

  const handleSupplierDetail = (id) => {
    navigate(`/suppliers/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/editSupplier/${id}`);
  };

  const handleAddSupplier = () => {
    navigate(`/supplier-form`);
  };

  return (
    <Container>
      <Row className="my-4 align-items-center">
        <Col xs="auto">
          <h1>{title}</h1>
        </Col>
        <Col xs="auto">
          <Button className="btn-primario" onClick={handleAddSupplier}>
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
                <th>Tipo</th>
                <th>Correo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={item.userId} className={index % 2 === 0 ? 'bg-light' : 'bg-white'}>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>{item.userEmail}</td>
                    <td className="text-end">
                      {/* Botón Ver */}
                      <Button
                        variant="info"
                        className="ms-2"
                        onClick={() => handleSupplierDetail(item.userId)}
                      >
                        Ver
                      </Button>
                      {/* Botón Editar */}
                      <Button
                        variant="warning"
                        className="ms-2"
                        onClick={() => handleEdit(item.userId)}
                      >
                        Editar
                      </Button>
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
ShowListProviders.propTypes = {
  title: PropTypes.string.isRequired,
  initialItems: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
  })).isRequired,
};

export default ShowListProviders;
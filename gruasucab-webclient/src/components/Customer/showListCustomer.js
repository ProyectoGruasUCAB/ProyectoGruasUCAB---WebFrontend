import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import "../UI/showListCustom.css"

function ShowListCustomer({ title, role, initialItems }) {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialItems && initialItems.length > 0) {
      setItems(initialItems);
    }
  }, [initialItems]);

  const handleClientDetail = (id) => {
    navigate(`/client/${id}`);
  };
  
  const handleEdit = (id) => {
    navigate(`/editClient/${id}`);
  };

  const handleAddClient = () => {
    navigate(`/addClient/`);
  };

  return (
    <Container>
      <Row className="my-4 align-items-center">
        <Col xs="auto">
          <h1>{title}</h1>
        </Col>
        <Col xs="auto">
          <Button className="btn-primario" onClick={handleAddClient}>
            Agregar {title}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre Completo</th>
                <th>Cédula</th>
                <th>Teléfono</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={item.id_cliente} className={index % 2 === 0 ? 'bg-light' : 'bg-white'}>
                    <td>{item.nombre_completo_cliente}</td>
                    <td>{item.cedula_cliente}</td>
                    <td>{item.tlf_cliente}</td>
                    <td className="text-end">
                      {/* Botón Ver */}
                      <Button
                        variant="info"
                        className="ms-2"
                        onClick={() => handleClientDetail(item.id_cliente)}
                      >
                        Ver
                      </Button>
                      {/* Botón Editar */}
                      <Button
                        variant="warning"
                        className="ms-2"
                        onClick={() => handleEdit(item.id_cliente)}
                      >
                        Editar
                      </Button>
                      {/* Botón Eliminar */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No se encontraron resultados.</td>
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
ShowListCustomer.propTypes = {
  title: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  initialItems: PropTypes.arrayOf(PropTypes.shape({
    id_cliente: PropTypes.string.isRequired,
    nombre_completo_cliente: PropTypes.string.isRequired,
    cedula_cliente: PropTypes.string.isRequired,
    tlf_cliente: PropTypes.string.isRequired,
  })).isRequired,
};

export default ShowListCustomer;

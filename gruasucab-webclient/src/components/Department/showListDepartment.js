import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import "../UI/showListCustom.css"

function ShowListDeparment({ title, role, initialItems }) {
  const [items] = useState(initialItems || []);
  const navigate = useNavigate();

  const handleDepartmentDetail = (id) => {
    navigate(`/department/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/editDepartment/${id}`);
  };

  const handleAddDeparment = () => {
    navigate(`/addDepartment`);
  };

  return (
    <Container>
      <Row className="my-4 align-items-center">
        <Col xs="auto">
          <h1>{title}</h1>
        </Col>
        <Col xs="auto">
          <Button className="btn-primario" onClick={handleAddDeparment}>
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
                <th>Descripción</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={item.departmentId} className={index % 2 === 0 ? 'bg-light' : 'bg-white'}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td className="text-end">
                      {/* Botón Ver */}
                      <Button
                        variant="info"
                        className="ms-2"
                        onClick={() => handleDepartmentDetail(item.departmentId)}
                      >
                        Ver
                      </Button>
                      {/* Botón Editar */}
                      <Button
                        variant="warning"
                        className="ms-2"
                        onClick={() => handleEdit(item.departmentId)}
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
ShowListDeparment.propTypes = {
  title: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  initialItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    cedula: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
  })).isRequired,
};

export default ShowListDeparment;

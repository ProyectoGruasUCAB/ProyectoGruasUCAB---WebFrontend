import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import "../UI/showListCustom.css"

function ShowListVehicle({ title, role, initialItems }) {
  const [items] = useState(initialItems || []);
  const navigate = useNavigate();

  const handleVehicleDetail = (id) => {
    console.log("Id del vehiculo",id)
    navigate(`/vehicle/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/editVehicle/${id}`);
  };

  const handleAddVehicle = () => {
    navigate(`/addVehicle/`);
  };

  return (
    <Container>
      <Row className="my-4 align-items-center">
        <Col xs="auto">
          <h1>{title}</h1>
        </Col>
        <Col xs="auto">
          <Button className="btn-primario" onClick={handleAddVehicle}>
            Agregar {title}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Color</th>
                <th>Placa</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={item.vehicleId} className={index % 2 === 0 ? 'bg-light' : 'bg-white'}>
                    <td>{item.brand}</td>
                    <td>{item.model}</td>
                    <td>{item.color}</td>
                    <td>{item.licensePlate}</td>
                    <td className="text-end">
                      {/* Botón Ver */}
                      <Button
                        variant="info"
                        className="ms-2"
                        onClick={() => handleVehicleDetail(item.vehicleId)}
                      >
                        Ver
                      </Button>
                      {/* Botón Editar */}
                      <Button
                        variant="warning"
                        className="ms-2"
                        onClick={() => handleEdit(item.vehicleId)}
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
ShowListVehicle.propTypes = {
  title: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  initialItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    cedula: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
  })).isRequired,
};

export default ShowListVehicle;

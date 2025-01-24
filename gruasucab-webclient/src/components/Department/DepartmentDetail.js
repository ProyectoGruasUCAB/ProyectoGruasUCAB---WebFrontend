import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDepartmentById } from '../../api/apiDepartment';
import { setAuthToken } from '../../api/apiAuth';
import { Container, Row, Col } from 'react-bootstrap';

const DepartmentDetail = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);

  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        setAuthToken(localStorage.getItem('authToken'));
        const departmentData = await getDepartmentById(id);
        setDepartment(departmentData.department);
      } catch (error) {
        console.error('Error al cargar los datos del departamento:', error);
        alert('Error al cargar los datos del departamento');
      }
    };

    if (id) {
      fetchDepartmentData();
    }
  }, [id]);

  if (!department) {
    return <div>Cargando detalles del departamento...</div>;
  }

  return (
    <Container>
      <h2>Detalles del Departamento</h2>
      <Row className="mb-4">
        <Col>
          <p><strong>Nombre:</strong> {department.name}</p>
          <p><strong>Descripción:</strong> {department.descripcion}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default DepartmentDetail;

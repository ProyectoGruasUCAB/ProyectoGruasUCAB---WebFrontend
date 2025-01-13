import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import OrderList from '../Order/OrderList'; // Importa el componente OrderList

const UserDetail = () => {
  const { id, role } = useParams();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    // Simulación de datos del usuario
    const mockUser = { id, name: `Cliente ${id}`, email: `cliente${id}@example.com`, role };
    setUser(mockUser);

    const mockDrivers = [
      { id: 1, name: 'Conductor 1', status: 'Activo' },
      { id: 2, name: 'Conductor 2', status: 'Inactivo' },
      { id: 3, name: 'Conductor 3', status: 'Activo' },
    ];

    // Simulación de datos de órdenes
    const mockOrders = [
      { id: 1, name: 'Orden de Servicio 1', status: 'Pendiente' },
      { id: 2, name: 'Orden de Servicio 2', status: 'Completada' },
      { id: 3, name: 'Orden de Servicio 3', status: 'En Progreso' },
    ];
    
    setOrders(mockOrders);
    setDrivers(mockDrivers);
  }, [id, role]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2>Detalles del {role}</h2>
      <Row className="mb-4">
        <Col>
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.role}</p>
        </Col>
      </Row>
      <h3>{role === "Proveedor" ? "Conductores" : "Órdenes de Servicio"}</h3>
      {role === "Proveedor" ? (
        <OrderList orders={drivers} />
      ) : (
        <OrderList orders={orders} />
      )}
    </Container>
  );
};

export default UserDetail;

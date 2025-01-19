import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import OrderList from '../Order/OrderList'; // Importa el componente OrderList
import { getWorkerById, getProviderById, getDriverById, getAllOrders } from '../../api/api';

const UserDetail = () => {
  const { id, role } = useParams();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (role === "Trabajador") {
          const userData = await getWorkerById(id);
          setUser(userData.worker);
        } else if (role === "Proveedor") {
          const userData = await getProviderById(id);
          setUser(userData.provider);
        } else if (role === "Conductor") {
          const userData = await getDriverById(id);
          setUser(userData.driver);
        }
        console.log("Usuario:",user)
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        alert('Error al cargar datos del usuario');
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id, role]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const orderList = await getAllOrders();
        setOrders(orderList.serviceOrders);
      } catch (error) {
        console.error('Error al cargar las órdenes:', error);
        alert('Error al cargar las órdenes');
      }
    };
    fetchAllOrders();
  }, []);

  useEffect(() => {
    const mockDrivers = [
      { id: 1, name: 'Conductor 1', status: 'Activo' },
      { id: 2, name: 'Conductor 2', status: 'Inactivo' },
      { id: 3, name: 'Conductor 3', status: 'Activo' },
    ];

    setDrivers(mockDrivers);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2>Detalles del {role}</h2>
      <Row className="mb-4">
        <Col>
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.userEmail}</p>
          <p><strong>Cédula:</strong> {user.cedula}</p>
          <p><strong>Fecha de nacimiento:</strong> {user.birthDate}</p>
          <p><strong>Teléfono:</strong> {user.phone}</p>
          <p><strong>Nombre:</strong> {user.name}</p>
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

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import OrderList from '../Order/OrderList';
import OrderListDriver from '../Order/OrderListDriver';
import { getProviderById, getDriverById, getWorkerById, getAllDrivers } from '../../api/apiUser';
import { getAllOrders } from '../../api/apiServiceOrder';
import { getDepartmentById } from '../../api/apiDepartment';
import { getSupplierById } from '../../api/apiSuplier';

const UserDetail = () => {
  const { id, role } = useParams();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [departments, setDepartments] = useState(null);
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (role === "Trabajador") {
          const userData = await getWorkerById(id);
          setUser(userData.worker);
          if (userData.worker && userData.worker.workplaceId) {
            const departmentData = await getDepartmentById(userData.worker.workplaceId);
            setDepartments(departmentData.department);
          }
        } else {
          if (role === "Proveedor") {
            const userData = await getProviderById(id);
            setUser(userData.provider);
          } else if (role === "Conductor") {
            const userData = await getDriverById(id);
            setUser(userData.driver);
          }
          const supplierData = await getSupplierById(id);
          setSupplier(supplierData.supplier);
        }
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
    const fetchAllDrivers = async () => {
      try {
        const driversData = await getAllDrivers();
        setDrivers(driversData.drivers);
      } catch (error) {
        console.error('Error al cargar los conductores:', error);
        alert('Error al cargar los conductores');
      }
    };
    fetchAllDrivers();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const filteredOrders = orders.filter(order => order.operatorId === user.id);
  const filteredDrivers = drivers.filter(driver => driver.supplierId === user.supplierId);

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
          { role === "Trabajador" ? (
              <p><strong>Departamento:</strong> {departments?.name}</p>
            ) : (
              <p><strong>Empresa:</strong> {supplier?.name}</p>
            )
          }
        </Col>
      </Row>
      {role === "Proveedor" ? (
        <OrderListDriver drivers={filteredDrivers} />
      ) : (
        <OrderList orders={filteredOrders} />
      )}
    </Container>
  );
};

export default UserDetail;

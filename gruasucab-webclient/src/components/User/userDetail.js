import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import OrderList from '../Order/OrderList';
import { getProviderById, getDriverById, getWorkerById } from '../../api/apiUser';
import { getDepartmentById } from '../../api/apiDepartment';
import { getSupplierById } from '../../api/apiSuplier';
import { getServiceOrderByOperatorId, getServiceOrderByDriverId, getServiceOrderBySupplierId } from '../../api/apiServiceOrder';

const UserDetail = () => {
  const { id, role } = useParams();
  const [user, setUser] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [supplier, setSupplier] = useState(null);

 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (role === "Trabajador") {
          const userData = await getWorkerById(id);
          setUser(userData.worker);
          const departmentData = await getDepartmentById(user.departmentId);
          setDepartments(departmentData.department);
          return;
        } else {
          if (role === "Proveedor") {
            const userData = await getProviderById(id);
            setUser(userData.provider);
            console.log(user); 
          } else if (role === "Conductor") {
            const userData = await getDriverById(id);
            setUser(userData.driver); 
          }
          const supplierData = await getSupplierById(user.supplierId);
          setSupplier(supplierData.supplier);
          return;
        }
      } catch (error) {
        
      }
    };

   
      fetchUserData();

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
          { role === "Trabajador" ? (
              <p><strong>Departamento:</strong> {departments?.name}</p>
            ) : (
              <p><strong>Empresa:</strong> {supplier?.name}</p>
            )
          }
        </Col>
      </Row>
 
        <OrderList user={user} role={role} />

    </Container>
  );
};

export default UserDetail;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OrderListClient from '../Order/OrderListClient';
import { getClientById } from '../../api/apiClient';
import { getOrdersByClientId } from '../../api/apiServiceOrder';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap'; 
import { setAuthToken } from '../../api/apiAuth';
import { createPolicy, getAllPolicies } from '../../api/apiPolicy'; // Asegúrate de tener esta función en tu API

const ClientDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [policyData, setPolizyData] = useState({
    userEmail: localStorage.getItem('userEmail'),
    userId: localStorage.getItem('userID'),
    name: '',
    coverageAmount: 0,
    coverageKm: 1,
    baseAmount: 1,
    priceKm: 1,
    clientId: id
  });
  const [clientPolicy, setClientPolicy] = useState(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          setAuthToken(token);
        } else {
          throw new Error('No se encontró el token de autenticación');
        }
        const clientData = await getClientById(id);
        setClient(clientData);
        console.log("Cliente:", clientData);
      } catch (error) {
        console.error('Error al cargar los datos del cliente:', error);
        alert('Error al cargar datos del cliente');
      }
    };

    if (id) {
      fetchClientData();
    }
  }, [id]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      if (client) {
        try {
          const token = localStorage.getItem('authToken');
          if (token) {
            setAuthToken(token);
          } else {
            throw new Error('No se encontró el token de autenticación');
          }
          const orderList = await getOrdersByClientId(client.id_cliente);
          setOrders(orderList.serviceOrders);
          console.log("Órdenes:", orderList.serviceOrders);
        } catch (error) {
          console.error('Error al cargar las órdenes:', error);
          alert('Error al cargar las órdenes');
        }
      }
    };

    fetchAllOrders();
  }, [client]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          setAuthToken(token);
        } else {
          throw new Error('No se encontró el token de autenticación');
        }
        const policies = await getAllPolicies();
        const clientPolicy = policies.policies.find(policy => policy.clientId === id);
        setClientPolicy(clientPolicy);
      } catch (error) {
        console.error('Error al cargar las pólizas:', error);
        alert('Error al cargar las pólizas');
      }
    };

    fetchPolicies();
  }, [id]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPolizyData({ ...policyData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPolicy(policyData);
      alert('Póliza creada exitosamente');
      handleCloseModal();
      navigate(`/client/${id}`);
    } catch (error) {
      console.error('Error al crear la póliza:', error);
      alert('Error al crear la póliza');
    }
  };

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2>Detalles del Cliente</h2>
      <Row className="mb-4">
        <Col>
          <p><strong>Nombre:</strong> {client.nombre_completo_cliente}</p>
          <p><strong>Teléfono:</strong> {client.tlf_cliente}</p>
          <p><strong>Fecha de nacimiento:</strong> {client.fecha_nacimiento_cliente}</p>
          {clientPolicy ? (
            <div>
              <h3>Detalles de la Póliza</h3>
              <p><strong>Nombre:</strong> {clientPolicy.name}</p>
              <p><strong>Monto de Cobertura:</strong> {clientPolicy.coverageAmount}</p>
            </div>
          ) : (
            <Button variant="primary" onClick={handleShowModal}>Agregar Póliza</Button>
          )}
        </Col>
      </Row>
      
      <OrderListClient orders={orders} id={client.id_cliente} />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Póliza</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formPolizyName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={policyData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCoverageAmount">
              <Form.Label>Monto de Cobertura</Form.Label>
              <Form.Control
                type="number"
                name="coverageAmount"
                value={policyData.coverageAmount}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
              Crear Póliza
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ClientDetail;
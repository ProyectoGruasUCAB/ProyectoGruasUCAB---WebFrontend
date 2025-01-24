import React, { useState, useEffect} from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getServiceOrderByOperatorId, getServiceOrderByDriverId, getServiceOrderBySupplierId } from '../../api/apiServiceOrder';
import { setAuthToken } from '../../api/apiAuth';
const OrderList = ({ user, role }) => {
  const navigate = useNavigate();
  const userData = user;
  const roleData = role;
  const [orders, setOrders] = useState([]);
  const handleViewClick = (id) => {
    navigate(`/order-detail/${id}`);
  };

  useEffect(() => {
    const fetchOrders = async ()  => {
      try {
        await setAuthToken(localStorage.getItem('authToken'));
        if (roleData === 'Trabajador') {
          const orderData = await getServiceOrderByOperatorId(userData.id)
          setOrders(orderData.serviceOrders);
        } else if (roleData === 'Proveedor') {
          const orderData = await getServiceOrderBySupplierId(userData.supplierId)
          setOrders(orderData.serviceOrders);
        } else if (roleData === 'Conductor') {
          const orderData = await getServiceOrderByDriverId(userData.id)
          setOrders(orderData.serviceOrders);
        }
      } catch (error) {
        console.error('Error al cargar las órdenes:', error);
      }
    };
    fetchOrders();
  });

  return (
    <div>
      <h2>Lista de Órdenes de Servicio</h2>
      <ListGroup>
        {orders.map(order => (
          <ListGroup.Item key={order.id} className="d-flex justify-content-between align-items-center">
            <div>
              {order.incidentDescription} - {order.statusServiceOrder} - {order.incidentCost}$
            </div>
            <Button variant="primary" onClick={() => handleViewClick(order.serviceOrderId)}>
              Ver
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default OrderList;

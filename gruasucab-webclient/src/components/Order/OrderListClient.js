import React, { useState, useEffect } from 'react';
import { getOrdersByClientId } from '../../api/apiServiceOrder';
import { setAuthToken } from '../../api/apiAuth';
import { ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OrderListClient = ({ id }) => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          setAuthToken(token);
          const response = await getOrdersByClientId(id);
          setOrders(response.serviceOrders);
          console.log('Órdenes obtenidas:', response.serviceOrders);
        } else {
          console.error('No hay token de autenticación disponible.');
        }
      } catch (error) {
        console.error('Error al obtener las órdenes de servicio:', error);
      }
    };

    fetchOrders();
  }, [id]);

  const handleViewClick = (orderId) => {
    console.log('Order ID clicked:', orderId);
    navigate(`/order-detail/${orderId}`);
  };

  return (
    <div>
      <h2>Lista de Órdenes de Servicio</h2>
      <ListGroup>
        {orders.length > 0 ? (
          orders.map(order => (
            <ListGroup.Item
              key={order.serviceOrderId}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                {order.incidentDescription} - {order.statusServiceOrder} - {order.incidentCost}$
              </div>
              <Button variant="primary" onClick={() => handleViewClick(order.serviceOrderId)}>
                Ver
              </Button>
            </ListGroup.Item>
          ))
        ) : (
          <p>No hay órdenes disponibles para este vehículo.</p>
        )}
      </ListGroup>
    </div>
  );
};

export default OrderListClient;

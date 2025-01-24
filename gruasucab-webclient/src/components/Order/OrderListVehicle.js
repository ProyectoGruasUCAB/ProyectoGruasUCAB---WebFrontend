import React, { useEffect } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OrderListVehicle = ({ orders }) => {
  const navigate = useNavigate();
  const orderData = orders;

  console.log('Filtered Orders:', orderData);

  const handleViewClick = (orderId) => {
    console.log('Order ID clicked:', orderId);
    navigate(`/order-detail/${orderId}`);
  };

  return (
    <div>
      <h2>Lista de Órdenes de Servicio</h2>
      <ListGroup>
        {orderData.length > 0 ? (
          orderData.map(order => (
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

export default OrderListVehicle;
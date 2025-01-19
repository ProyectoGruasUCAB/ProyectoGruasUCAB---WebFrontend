import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OrderList = ({ orders }) => {
  const navigate = useNavigate();

  const handleViewClick = (id) => {
    navigate(`/order-detail/${id}`);
  };

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

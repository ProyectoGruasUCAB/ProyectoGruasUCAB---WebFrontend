import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OrderList = ({ orders }) => {
  const navigate = useNavigate();

  const handleViewClick = (id) => {
    navigate(`/orders/${id}`);
  };

  return (
    <div>
      <h2>Lista de Órdenes de Servicio</h2>
      <ListGroup>
        {orders.map(order => (
          <ListGroup.Item key={order.id} className="d-flex justify-content-between align-items-center">
            <div>
              {order.name} - {order.status}
            </div>
            <Button variant="primary" onClick={() => handleViewClick(order.id)}>
              Ver
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default OrderList;

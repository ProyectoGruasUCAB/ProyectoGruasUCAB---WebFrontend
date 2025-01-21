import React, { useEffect } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OrderListVehicle = ({ orders, id }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Component mounted');
    console.log('Orders:', orders);
    console.log('Vehicle ID:', id);
  }, [orders, id]);

  // Filtro de órdenes (asegurando que el tipo de datos sea consistente)
  const filteredOrders = orders.filter((order) => {
    const isMatch = order.vehicleId == id; // Cambiado a '==' para evitar problemas de tipo
    console.log(`Comparando: ${order.vehicleId} == ${id} -> ${isMatch}`);
    return isMatch;
  });

  console.log('Filtered Orders:', filteredOrders);

  const handleViewClick = (orderId) => {
    console.log('Order ID clicked:', orderId);
    navigate(`/order-detail/${orderId}`);
  };

  return (
    <div>
      <h2>Lista de Órdenes de Servicio</h2>
      <ListGroup>
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
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

import React from 'react';
import { ListGroup } from 'react-bootstrap';

const OrderListDriver = ({ drivers }) => {
  return (
    <div>
      <h2>Lista de Órdenes de Servicio</h2>
      <ListGroup>
        {drivers.map(driver => (
          <ListGroup.Item key={drivers.id} className="d-flex justify-content-between align-items-center">
            <div>
              {driver.name} - {driver.cedula} - {driver.userEmail}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default OrderListDriver;

import React from "react";
import './orderBox.css';

const orders = [
  { id: 1, status: "Pendiente", driver: "Conductor 1", client: "Cliente 1", service: "Servicio de Grua" },
  { id: 2, status: "En Proceso", driver: "Conductor 2", client: "Cliente 2", service: "Servicio de Mecanica" },
  { id: 3, status: "Completada", driver: "Conductor 3", client: "Cliente 3", service: "Servicio de Remolque" },
  
];

function OrderBox() {
  return (
    <div className="orders-container">
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <h3>Orden #{order.id}</h3>
          <p><strong>Estado:</strong> {order.status}</p>
          <p><strong>Conductor:</strong> {order.driver}</p>
          <p><strong>Cliente:</strong> {order.client}</p>
          <p><strong>Servicio:</strong> {order.service}</p>
        </div>
      ))}
    </div>
  );
}

export default OrderBox;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../../api/api"; 
import './orderBox.css';

function OrderBox() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getAllOrders(); 
        setOrders(fetchedOrders.serviceOrders); 
      } catch (error) {
        console.error("Error al cargar las órdenes:", error);

      }
    };

    fetchOrders(); 
  }, []); 

  const handleClick = (orderId) => {
    navigate(`/order-detail/${orderId}`);
  };

  return (
    <div className="orders-container">
      {orders.length === 0 ? (
        <p>No hay órdenes disponibles.</p>
      ) : (
        orders.map((order) => (
          <div key={order.serviceOrderId} className="order-card" onClick={() => handleClick(order.serviceOrderId)}>
            <h3>Orden #{order.serviceOrderId.slice(0,8)}</h3>
            <p><strong>Estado:</strong> {order.statusServiceOrder}</p>
            <p><strong>Conductor:</strong> {order.driverId}</p> {/* Este campo puede cambiar si se necesitan más datos */}
            <p><strong>Cliente:</strong> {order.customerId}</p> {/* Lo mismo para el cliente */}
            <p><strong>Servicio:</strong> {order.incidentDescription}</p> {/* Asegúrate de que esto sea lo que necesitas */}
          </div>
        ))
      )}
    </div>
  );
}

export default OrderBox;

import React, { useState, useEffect } from 'react';
import { getOrdersByClientId } from '../../api/apiServiceOrder';
import { setAuthToken } from '../../api/apiAuth'; // Asegúrate de tener esta función para configurar el token de autenticación

const OrderListClient = ({ id }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        setAuthToken(token);
        const response = await getOrdersByClientId(id);
        setOrders(response.serviceOrders);
      } catch (error) {
        console.error('Error al obtener las órdenes de servicio:', error);
      }
    };

    fetchOrders();
  }, [id]);

  return (
    <div>
      <h3>Órdenes de Servicio</h3>
      {orders.length === 0 ? (
        <p>No hay órdenes de servicio para este cliente.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <p><strong>ID de Orden:</strong> {order.id}</p>
              <p><strong>Descripción:</strong> {order.description}</p>
              <p><strong>Fecha:</strong> {order.date}</p>
              {/* Agrega más detalles de la orden según sea necesario */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderListClient;
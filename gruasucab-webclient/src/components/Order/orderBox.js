import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../../api/apiServiceOrder";
import { getDriverById } from "../../api/apiUser";
import './orderBox.css';

function OrderBox() {
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getAllOrders();
        const filteredOrders = fetchedOrders.serviceOrders.filter(order =>
          order.statusServiceOrder !== "Finalizado" && order.statusServiceOrder !== "Cancelado" && order.statusServiceOrder !== "CanceladoPorCobrar"
        );

        // Fetch driver details for each order
        const driverPromises = filteredOrders.map(order => 
          getDriverById(order.driverId).then(driverData => ({
            orderId: order.serviceOrderId,
            driverName: driverData.driver.name
          }))
        );

        const driverResults = await Promise.all(driverPromises);
        const driverMap = driverResults.reduce((acc, { orderId, driverName }) => {
          acc[orderId] = driverName;
          return acc;
        }, {});

        setDrivers(driverMap);
        setOrders(filteredOrders);

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
            <p><strong>Conductor:</strong> {drivers[order.serviceOrderId] || order.driverId}</p>
            <p><strong>Cliente:</strong> {order.customerId}</p>
            <p><strong>Servicio:</strong> {order.incidentDescription}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderBox;

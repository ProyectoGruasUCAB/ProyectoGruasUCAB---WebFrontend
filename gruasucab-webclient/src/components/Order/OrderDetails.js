import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Para manejar parámetros en la URL
import { getServiceOrderById } from "../../api/api"; // Asegúrate de tener este endpoint
import MapComponent from "../MapContainer/mapComponent"; // El componente del mapa
import "./orderDetails.css";

const OrderDetails = () => {
  const { orderId } = useParams(); // Obtenemos el ID de la orden desde la URL
  const [orderDetails, setOrderDetails] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    console.log("orderId desde useParams:", orderId); // Verifica si el orderId está llegando
    const fetchOrderDetails = async () => {
      try {
        const response = await getServiceOrderById(orderId);
        console.log("Respuesta de la API:", response); // Verifica la respuesta
        if (response) {
          const { serviceOrder } = response; // Desestructuramos la orden de servicio
          setOrderDetails(serviceOrder);
          setOrigin({
            lat: serviceOrder.incidentLocationLat,
            lng: serviceOrder.incidentLocationLon,
          });
          setDestination({
            lat: serviceOrder.incidentLocationEndLat,
            lng: serviceOrder.incidentLocationEndLon,
          });
          setDriver({
            lat: serviceOrder.initialLocationDriverLat,
            lng: serviceOrder.initialLocationDriverLon,
          });
        } else {
          alert("Error al obtener los detalles de la orden.");
        }
      } catch (error) {
        console.error("Error al obtener los detalles de la orden:", error);
        alert("Hubo un error al intentar obtener los detalles.");
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]); 

  if (!orderDetails) {
    return <div>Cargando detalles de la orden...</div>;
  }

  return (
    <div className="order-details-container">
      <h1>Detalles de la Orden: {orderDetails.serviceOrderId.slice(0, 8)}</h1>
      <div className="order-map">
        <MapComponent origin={origin} destination={destination} driver={driver} />
      </div>
      <div className="order-info">
        <h3>Detalles de la Orden</h3>
        <div className="order-info-item">
          <strong>Estado:</strong> <span>{orderDetails.statusServiceOrder}</span>
        </div>
        <div className="order-info-item">
          <strong>Cliente:</strong> <span>{orderDetails.customerId}</span>
        </div>
        <div className="order-info-item">
          <strong>Póliza:</strong> <span>{orderDetails.policyId}</span>
        </div>
        <div className="order-info-item">
          <strong>Service Fee:</strong> <span>{orderDetails.serviceFeeId}</span>
        </div>
        
        <div className="order-info-item">
          <strong>Distancia Total:</strong> <span>{orderDetails.incidentDistance} km</span>
        </div>
        <div className="order-info-item">
          <strong>Costo del Servicio:</strong> <span>${orderDetails.incidentCost}</span>
        </div>
        <div className="order-info-item">
          <strong>Vehículo:</strong> <span>{orderDetails.customerVehicleDescription}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServiceOrderById, updateServiceOrder } from "../../api/apiServiceOrder"; // Asegúrate de tener este endpoint y updateServiceOrder
import MapComponent from "../MapContainer/mapComponent"; // El componente del mapa
import { Container, Row, Col, Button } from "react-bootstrap";
import "./orderDetails.css";
import { getVehicleById } from "../../api/apiVehicle";
import { getServiceFeeById } from "../../api/apiServiceFee";
import { getClientById } from "../../api/apiClient";
import { getPolicyById } from "../../api/apiPolicy";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [driver, setDriver] = useState(null);
  const [vehicle, setVehicle ] = useState(null);
  const [serviceFee, setServiceFee] = useState();
  const [client, setClient] = useState(null);
  const [policy, setPolicy] = useState(null);

  useEffect(() => {
    console.log("orderId desde useParams:", orderId);

    const fetchOrderDetails = async () => {
      try {
        const response = await getServiceOrderById(orderId);
        if (response) {
          const serviceOrder = response.serviceOrder;
          setOrderDetails(serviceOrder);
          console.log("Detalles de la orden:", serviceOrder);

          const vehicleData = await getVehicleById(serviceOrder.vehicleId);
          setVehicle(vehicleData.vehicle);
          
          const serviceFeeIdData = await getServiceFeeById(serviceOrder.serviceFeeId);
          setServiceFee(serviceFeeIdData.serviceFee);
          
          const clientData = await getClientById(serviceOrder.customerId);
          setClient(clientData);
          console.log("Cliente", clientData);
          
          const policyIdData = await getPolicyById(serviceOrder.policyId);
          setPolicy(policyIdData.policy);

          setOrigin({
            lat: serviceOrder.incidentLocationLatitude,
            lng: serviceOrder.incidentLocationLongitude,
          });
          setDestination({
            lat: serviceOrder.incidentLocationEndLatitude,
            lng: serviceOrder.incidentLocationEndLongitude,
          });
          setDriver({
            lat: serviceOrder.initialLocationDriverLatitude,
            lng: serviceOrder.initialLocationDriverLongitude,
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

  useEffect(() => {
    console.log("Cliente actualizado:", client);
  }, [client]);

  const cancelOrder = async () => {
    console.log("Cancelling order: ", orderDetails);
    try {
      const updatedServiceOrder = {
        ...orderDetails,
        userEmail: localStorage.getItem('userEmail'),
        userId: localStorage.getItem('userID'),
        serviceOrderId: orderDetails.serviceOrderId,
        incidentDescription: orderDetails.incidentDescription,
        statusServiceOrder: "Cancelado",
        initialLocationDriverLatitude: orderDetails.initialLocationDriverLatitude,
        initialLocationDriverLongitude: orderDetails.initialLocationDriverLongitude,
        incidentLocationLatitude: orderDetails.incidentLocationLatitude,
        incidentLocationLongitude: orderDetails.incidentLocationLongitude,
        incidentLocationEndLatitude: orderDetails.incidentLocationEndLatitude,
        incidentLocationEndLongitude: orderDetails.incidentLocationEndLongitude,
        incidentDistance: orderDetails.incidentDistance,
        customerVehicleDescription: orderDetails.customerVehicleDescription,
        incidentCost: orderDetails.incidentCost,
        incidentDate: orderDetails.incidentDate,
        policyId: orderDetails.policyId,
        vehicleId: orderDetails.vehicleId,
        driverId: orderDetails.driverId,
        customerId: orderDetails.customerId,
        operatorId: orderDetails.operatorId,
        serviceFeeId: orderDetails.serviceFeeId
      };
      console.log("Orden a cancelar:", updatedServiceOrder);
      await updateServiceOrder(updatedServiceOrder);
      setOrderDetails(updatedServiceOrder); // Actualiza el estado local
      alert("Orden cancelada con éxito.");
    } catch (error) {
      console.error("Error al cancelar la orden:", error);
      alert("Hubo un error al intentar cancelar la orden.");
    }
  };

  if (!orderDetails) {
    return <div>Cargando detalles de la orden...</div>;
  }

  return (
    <Container className="order-details-container">
      <div className="order-details-header">
        <h1>Detalles de la Orden: {orderDetails.serviceOrderId.slice(0, 8)}</h1>
        <Button variant="danger" onClick={cancelOrder}>Cancelar Orden</Button>
      </div>
      <Row className="order-map mb-4">
        <Col>
          <MapComponent origin={origin} destination={destination} driver={driver} />
        </Col>
      </Row>
      <Row className="order-info mb-4">
        <Col>
          <h3>Detalles de la Orden</h3>
          <div className="order-info-item">
            <strong>Estado:</strong> <span>{orderDetails.statusServiceOrder}</span>
          </div>
          <div className="order-info-item">
            <strong>Cliente:</strong> <span>{client?.nombre_completo_cliente}</span>
          </div>
          <div className="order-info-item">
            <strong>Grua:</strong> <span>{vehicle?.brand} {vehicle?.model} {vehicle?.color}</span>
          </div>
          <div className="order-info-item">
            <strong>Póliza:</strong> <span>{policy?.name}</span>
          </div>
          <div className="order-info-item">
            <strong>Servicio:</strong> <span>{serviceFee?.name}</span>
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
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetails;

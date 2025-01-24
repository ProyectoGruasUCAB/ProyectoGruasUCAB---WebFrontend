import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OrderListVehicle from '../Order/OrderListVehicle'; // Importa el componente OrderListVehicle
import { getVehicleById, updateVehicle } from '../../api/apiVehicle'; // Añade la función getDrivers
import { getOrdersByVehicleId } from '../../api/apiServiceOrder';
import { getAllDrivers } from '../../api/apiUser';
import { Container, Row, Col } from 'react-bootstrap'; // Importa Container, Row y Col

const VehicleDetail = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const vehicleData = await getVehicleById(id);
        setVehicle(vehicleData.vehicle);
        setSelectedDriver(vehicleData.vehicle.driverId || '');
        console.log("Vehiculo:", vehicleData.vehicle);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        alert('Error al cargar datos del vehículo');
      }
    };

    if (id) {
      fetchVehicleData();
    }
  }, [id]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      if (vehicle) {
        try {
          const orderList = await getOrdersByVehicleId(vehicle.vehicleId);
          setOrders(orderList.serviceOrders);
          console.log("Órdenes:", orderList.serviceOrders);
        } catch (error) {
          console.error('Error al cargar las órdenes:', error);
        }
      }
    };

    fetchAllOrders();
  }, [vehicle]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const driversData = await getAllDrivers();
        setDrivers(driversData.drivers);
      } catch (error) {
        console.error('Error al cargar los conductores:', error);
        alert('Error al cargar los conductores');
      }
    };

    fetchDrivers();
  }, []);

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  const handleDriverChange = async (e) => {
    const newDriverId = e.target.value;
    if (newDriverId) {
      setSelectedDriver(newDriverId);
      try {
        const updatedVehicle = {
          userEmail: localStorage.getItem('userEmail'),
          userId: localStorage.getItem('userID'),
          vehicleId: vehicle.vehicleId,
          driverId: newDriverId,
          supplierId: vehicle.supplierId,
          civilLiability: vehicle.civilLiability,
          civilLiabilityExpirationDate: vehicle.civilLiabilityExpirationDate,
          trafficLicense: vehicle.trafficLicense,
          licensePlate: vehicle.licensePlate,
          brand: vehicle.brand,
          color: vehicle.color,
          model: vehicle.model,
          vehicleTypeId: vehicle.vehicleTypeId
        }; // Actualiza el vehículo con el nuevo conductor
        await updateVehicle(updatedVehicle); // Llama a updateVehicle con el vehículo actualizado
      } catch (error) {
        console.error('Error al actualizar el conductor:', error);
        alert('Error al actualizar el conductor');
      }
    } else {
      setSelectedDriver('');
      console.log("Conductor no asignado");
    }
  };

  return (
    <Container>
      <h2>Detalles del Vehiculo</h2>
      <Row className="mb-4">
        <Col>
          <p><strong>Marca:</strong> {vehicle.brand}</p>
          <p><strong>Modelo:</strong> {vehicle.model}</p>
          <p><strong>Color:</strong> {vehicle.color}</p>
          <p><strong>Placa:</strong> {vehicle.licensePlate}</p>
          <p><strong>Proveedor:</strong> {vehicle.supplierId}</p>
          <p><strong>Conductor:</strong> {selectedDriver || 'Conductor no asignado'}</p>
          <select
            value={selectedDriver}
            onChange={handleDriverChange}
            className="input-field"
            style={{ width: "300px" }}
          >
            <option value="" disabled={selectedDriver === ''}>Asignar Conductor</option>
            {drivers.map(driver => (
              <option key={driver.id} value={driver.id}>
                {driver.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>
      
      <OrderListVehicle orders={orders} id={vehicle.vehicleId} />
      
    </Container>
  );
};

export default VehicleDetail;
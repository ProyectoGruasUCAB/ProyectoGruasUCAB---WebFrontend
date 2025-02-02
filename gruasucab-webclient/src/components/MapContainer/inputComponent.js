import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './SearchDecorator.css';
import { createServiceOrder } from "../../api/apiServiceOrder";
import { getAllServiceFees } from '../../api/apiServiceFee';
import { setAuthToken } from '../../api/apiAuth';
import { getAllDrivers } from '../../api/apiUser';
import { getAllClients } from "../../api/apiClient";
import { getAllVehicle } from "../../api/apiVehicle";
import { getAllPolicies } from "../../api/apiPolicy";



const driverLocations = [
  { id: "1ec85f24-f238-4897-ab1c-8c1fc21fef68", lat: 10.5061, lng: -66.9146 },
  { id: "22222222-2222-2222-2222-222222222222", lat: 10.4806, lng: -66.9036 },
  { id: "33333333-3333-3333-3333-333333333333", lat: 10.4924, lng: -66.8459 },
];

const InputComponent = ({ setOrigin, setDestination, setDriver }) => {
  const originRef = useRef(null);
  const destinationRef = useRef(null);
  const [origin, setOriginState] = useState(null);
  const [destination, setDestinationState] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [incidentDescription, setIncidentDescription] = useState('');
  const [vehicleDescription, setVehicleDescription] = useState('');
  const [totalDistance, setTotalDistance] = useState(null); // Nueva variable de estado
  const [drivers, setDrivers] = useState([]);  // Lista de conductores
  const [serviceFees, setServiceFees] = useState([]);
  const [selectedServiceFees, setSelectedServiceFees] = useState('');
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [vehicle, setVehicle] = useState();
  const [policy, setPolicy] = useState();
  const navigate = useNavigate();

  const calculateTotalDistance = (driver, origin, destination) => {
    return new Promise((resolve, reject) => {
      if (!driver || !origin || !destination) {
        reject("Driver, origin, or destination is missing.");
        return;
      }

      const service = new window.google.maps.DistanceMatrixService();
      console.log("Coordenadas del conductor Lat:", driver.lat, "Lng: ", driver.lng)
      console.log("Coordenadas del origen Lat:", origin.lat, "Lng: ", origin.lng)
      console.log("Coordenadas del Destino Lat:", destination.lat, "Lng: ", destination.lng)

      // Validar coordenadas
      if (isNaN(driver.lat) || isNaN(driver.lng) || isNaN(origin.lat) || isNaN(origin.lng) || isNaN(destination.lat) || isNaN(destination.lng)) {
        reject("Invalid coordinates");
        return;
      }

      const driverLatLng = new window.google.maps.LatLng(driver.lat, driver.lng);
      const originLatLng = new window.google.maps.LatLng(origin.lat, origin.lng);
      const destinationLatLng = new window.google.maps.LatLng(destination.lat, destination.lng);

      // Calcular distancia del conductor al origen
      service.getDistanceMatrix(
        {
          origins: [driverLatLng],
          destinations: [originLatLng],
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (response1, status1) => {
          if (status1 !== "OK") {
            reject("Error calculating distance from driver to origin.");
            return;
          }

          const driverToOriginDistance = response1.rows[0].elements[0].distance.value; // Distancia en metros

          // Calcular distancia del origen al destino
          service.getDistanceMatrix(
            {
              origins: [originLatLng],
              destinations: [destinationLatLng],
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (response2, status2) => {
              if (status2 !== "OK") {
                reject("Error calculating distance from origin to destination.");
                return;
              }

              const originToDestinationDistance = response2.rows[0].elements[0].distance.value;

              // Sumar ambas distancias
              const totalDistance = driverToOriginDistance + originToDestinationDistance;
              resolve(totalDistance); // Devuelve la distancia total
            }
          );
        }
      );
    });
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedServiceFees) {
    alert('Por favor, selecciona un servicio.');
    return;
  }

  const driver = drivers.find(d => d.id === selectedDriver);

  if (!driver) {
    alert('Conductor no válido.');
    return;
  }

  const driverLocation = driverLocations.find(loc => loc.id === selectedDriver);

  if (!driverLocation) {
    alert('Ubicación del conductor no encontrada.');
    return;
  }

  const { lat: driverLat, lng: driverLng } = driverLocation;

  try {
    console.log("Coordenadas del conductor en el submit Lat:", driverLat, "Lng:", driverLng);
    const totalDistanceInMeters = await calculateTotalDistance(
      { lat: driverLat, lng: driverLng },
      origin,
      destination
    );
    setTotalDistance(totalDistanceInMeters);

        const vehicleData = await getAllVehicle();
     
        const filteredVehicle = vehicleData.vehicles.find(v => v.driverId === driver.id);
        setVehicle(filteredVehicle);

        const policyData = await getAllPolicies();
        
  
        const filteredPolicy = policyData.policies.find(p => p.clientId === selectedClient);
        setPolicy(filteredPolicy);
      console.log("Policy");  
    const orderData = {
      userEmail: localStorage.getItem('userEmail') || 'test@example.com',
      userId: localStorage.getItem('userID') || 'testUserID',
      incidentDescription,
      initialLocationDriverLatitude: driverLat,
      initialLocationDriverLongitude: driverLng,
      incidentLocationLatitude: origin.lat,
      incidentLocationLongitude: origin.lng,
      incidentLocationEndLatitude: destination.lat,
      incidentLocationEndLongitude: destination.lng,
      incidentDistance: totalDistanceInMeters / 1000,
      customerVehicleDescription: vehicleDescription,
      initialStatus: "PorAceptado",
      policyId: filteredPolicy.policyId,
      vehicleId: filteredVehicle.vehicleId,
      driverId: driver.id,
      customerId: selectedClient,
      operatorId: localStorage.getItem('userID'),
      serviceFeeId: selectedServiceFees,
      
    };

    console.log("orderData", orderData);

    setAuthToken(localStorage.getItem('authToken'));
    await createServiceOrder(orderData);
    alert('Orden creada satisfactoriamente.');
    navigate('/orders')
  } catch (error) {
    console.error('Error al calcular la distancia o enviar la orden:', error);
    alert('Hubo un error al intentar crear la orden.');
  }
};


  
  
  useEffect(() => {
    const fetchServiceFees = async () => {
      try {
        const token = localStorage.getItem('authToken');
        setAuthToken(token);
        const response = await getAllServiceFees();
        const serviceFeeData = response.serviceFees.map(serviceFee => ({
          serviceFeeId: serviceFee.serviceFeeId,
          name: serviceFee.name,
        }));
        setServiceFees(serviceFeeData);
        const clientData = await getAllClients();
        setClients(clientData);


      } catch (error) {
        console.error('Error al obtener los gastos de servicio:', error);
        alert('Hubo un error al intentar obtener los gastos de servicio.');
      }
    };
  
  
    fetchServiceFees();
  }, []);
  


  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        setAuthToken(token);  // Establecer el token de autenticación

        // Llamada a la API para obtener los conductores
        const response = await getAllDrivers();

        // Aquí, los conductores ahora tienen sus datos básicos sin la ubicación
        const driverData = response.drivers.map(driver => ({
          id: driver.id,
          name: driver.name, // O cualquier otro campo que devuelva el API
        }));

        // Establecer los conductores en el estado
        setDrivers(driverData);
      } catch (error) {
        console.error('Error al obtener los conductores:', error);
        alert('Hubo un error al intentar obtener los conductores.');
      }
    };

    fetchDrivers();
  }, []);

  // Cuando se selecciona un conductor, se carga la ubicación desde la lista simulada
  useEffect(() => {
    if (selectedDriver) {
      const driver = drivers.find(d => d.id === selectedDriver);
      if (!driver) {
        console.log('Conductor no encontrado');
        return;
      }

      // Asegurarse de que estamos usando los datos correctos de las ubicaciones
      const location = driverLocations.find(loc => loc.id === selectedDriver);

      if (location) {
        setDriver({ lat: location.lat, lng: location.lng }); // Establecer la ubicación del conductor
      } else {
        console.log('Ubicación del conductor no encontrada');
      }
    }
  }, [selectedDriver, drivers]);

  useEffect(() => {
    if (window.google?.maps?.places) {
      const initAutocomplete = (ref, callback) => {
        const autocomplete = new window.google.maps.places.Autocomplete(ref, {
          types: ['geocode'],
          componentRestrictions: { country: 've' },
        });
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place.geometry) {
            const location = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            };
            callback(location);
          }
        });
      };

      initAutocomplete(originRef.current, (location) => {
        setOrigin(location);
        setOriginState(location);
      });
      initAutocomplete(destinationRef.current, (location) => {
        setDestination(location);
        setDestinationState(location);
      });
    }
  }, []);

  return (
    <form className="input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar Origen"
        ref={originRef}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Buscar Destino"
        ref={destinationRef}
        className="input-field"
      />
      <select
        value={selectedDriver}
        onChange={(e) => {
          const driverId = e.target.value;
          setSelectedDriver(driverId);
        }}
        className="input-field"
      >
        <option value="">Seleccionar Conductor</option>
        {drivers.map(driver => (
          <option key={driver.id} value={driver.id}>
            {driver.name} 
          </option>
        ))}
      </select>
      <select
        value={selectedClient}
        onChange={(e) => {
          const clientId = e.target.value;
          setSelectedClient(clientId);
        }}
        className="input-field"
      >
        <option value="">Seleccionar Cliente</option>
        {clients.map(client => (
          <option key={client.id_cliente} value={client.id_cliente}>
            {client.nombre_completo_cliente} 
          </option>
        ))}
      </select>
      <select
        value={selectedServiceFees}
        onChange={(e) => {
          const serviceFeeId = e.target.value;
          setSelectedServiceFees(serviceFeeId);
        }}
        className="input-field"
      >
        <option value="">Seleccionar Servicio</option>
        {serviceFees.map(serviceFee => ( // Asegúrate de que serviceFees sea un array antes de usar .map
          <option key={serviceFee.serviceFeeId} value={serviceFee.serviceFeeId}>
            {serviceFee.name} 
          </option>
        ))}
      </select>
      <textarea
        placeholder="Descripción del Incidente"
        value={incidentDescription}
        onChange={(e) => setIncidentDescription(e.target.value)}
        className="input-field textarea"
      ></textarea>
      <textarea
        placeholder="Descripción del Vehículo"
        value={vehicleDescription}
        onChange={(e) => setVehicleDescription(e.target.value)}
        className="input-field textarea"
      ></textarea>
      <button type="submit" className="add-order-button">Agregar Orden</button>
      {totalDistance && (
        <div className="distance-display">
          Distancia total: {(totalDistance / 1000).toFixed(2)} km
        </div>
      )}
    </form>
  );
};

export default InputComponent;

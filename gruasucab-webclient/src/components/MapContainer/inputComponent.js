import React, { useRef, useEffect, useState } from "react";
import './SearchDecorator.css';

const drivers = [
  { name: 'Conductor 1', lat: 10.5061, lng: -66.9146 },
  { name: 'Conductor 2', lat: 10.4806, lng: -66.9036 },
  { name: 'Conductor 3', lat: 10.4924, lng: -66.8459 },
];

const clients = [
  'Cliente 1',
  'Cliente 2',
  'Cliente 3',
  'Cliente 4'
];

const services = [
  'Servicio de Grua',
  'Servicio de Mecanica',
  'Servicio de Remolque'
];

const InputComponent = ({ setOrigin, setDestination, setDriver }) => {
  const originRef = useRef(null);
  const destinationRef = useRef(null);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [clientQuery, setClientQuery] = useState('');
  const [selectedService, setSelectedService] = useState('');

  // Inicializar autocompletado
  const initAutocomplete = () => {
    if (window.google?.maps?.places) {
      const init = (ref, callback) => {
        const autocomplete = new window.google.maps.places.Autocomplete(ref, {
          types: ['geocode'],
          componentRestrictions: { country: 've' },
        });
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place.geometry) {
            callback({
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            });
          }
        });
      };

      init(originRef.current, setOrigin);
      init(destinationRef.current, setDestination);
    }
  };

  useEffect(() => {
    if (window.google?.maps?.places) {
      initAutocomplete();
    }
  }, []);

  useEffect(() => {
    const filteredClients = clients.filter(client =>
      client.toLowerCase().includes(clientQuery.toLowerCase())
    );
  }, [clientQuery]);

  return (
    <div className="input-container">
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
          setSelectedDriver(e.target.value);
          const driver = drivers.find(d => d.name === e.target.value);
          if (driver) {
            setDriver({ lat: driver.lat, lng: driver.lng });
          }
        }}
        className="input-field"
      >
        <option value="">Seleccionar Conductor</option>
        {drivers.map(driver => (
          <option key={driver.name} value={driver.name}>
            {driver.name}
          </option>
        ))}
      </select>
      <div className="service-selector">
        <label className="service-label">Seleccionar Servicio:</label>
        {services.map(service => (
          <div key={service} className="service-item">
            <input
              type="radio"
              id={service}
              name="service"
              value={service}
              checked={selectedService === service}
              onChange={(e) => setSelectedService(e.target.value)}
              className="service-radio"
            />
            <label htmlFor={service}>{service}</label>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Buscar Cliente"
        value={clientQuery}
        onChange={(e) => setClientQuery(e.target.value)}
        className="input-field"
      />
      <button className="add-order-button">Agregar Orden</button>
    </div>
  );
};

export default InputComponent;

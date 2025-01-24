import React, { useState } from 'react';

const ServiceOrder = () => {
  const [customer, setCustomer] = useState('');
  const [vehicle, setVehicle] = useState({ make: '', model: '', year: '' });
  const [customerLocation, setCustomerLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');

  const handleCustomerSearch = () => {
    // Simulamos la búsqueda de cliente
    alert(`Buscando cliente: ${customer}`);
  };

  const handleSubmit = () => {
    // Aquí iría la lógica para manejar el envío de la orden de servicio
    alert('Orden de servicio creada');
  };

  return (
    <div>
      <h1>Agregar Orden de Servicio</h1>

      <div>
        <label>Buscar Cliente:</label>
        <input
          type="text"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
        <button onClick={handleCustomerSearch}>Buscar</button>
      </div>

      <div>
        <h2>Agregar Vehículo</h2>
        <label>Marca:</label>
        <input
          type="text"
          value={vehicle.make}
          onChange={(e) => setVehicle({ ...vehicle, make: e.target.value })}
        />
        <label>Modelo:</label>
        <input
          type="text"
          value={vehicle.model}
          onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
        />
        <label>Año:</label>
        <input
          type="text"
          value={vehicle.year}
          onChange={(e) => setVehicle({ ...vehicle, year: e.target.value })}
        />
      </div>

      <div>
        <h2>Ubicaciones</h2>
        <label>Ubicación del Cliente:</label>
        <input
          type="text"
          value={customerLocation}
          onChange={(e) => setCustomerLocation(e.target.value)}
        />
        <label>Ubicación de Destino:</label>
        <input
          type="text"
          value={destinationLocation}
          onChange={(e) => setDestinationLocation(e.target.value)}
        />
      </div>

      <button onClick={handleSubmit}>Agregar Orden</button>
    </div>
  );
};

export default ServiceOrder;

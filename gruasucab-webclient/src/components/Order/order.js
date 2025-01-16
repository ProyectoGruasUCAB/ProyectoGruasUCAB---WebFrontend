import React, { useState } from "react";
import MapContainer from "../MapContainer/mapContainer";
import OrderBox from "./orderBox";
import OrderBar from "./orderBar";
import './orderBox.css';

function Orders() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [driver, setDriver] = useState(null);

  const orders = [
    { id: 1, name: "Order1", description: "Descripcion de la orden 1" },
    { id: 2, name: "Order2", description: "Descripcion de la orden 2" }
  ];

  return (
    <div className="d-flex">
      <OrderBar setOrigin={setOrigin} setDestination={setDestination} setDriver={setDriver} />
      <div className="flex-grow-1 p-3">
        <h1>Ordenes</h1>
        {console.log("Ubicación del conductor en Orders1:", driver)}
        <MapContainer origin={origin} destination={destination} driver={driver} />
        <OrderBox orders={orders} />
      </div>
    </div>
  );
}

export default Orders;

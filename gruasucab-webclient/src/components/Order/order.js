import React, { useState } from "react";
import MapContainer from "../MapContainer/mapContainer";
import OrderBox from "./orderBox";
import OrderBar from "./orderBar";
import './orderBox.css';

function Orders() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [driver, setDriver] = useState(null);

  

  return (
    <div className="d-flex">
      <OrderBar setOrigin={setOrigin} setDestination={setDestination} setDriver={setDriver} />
      <div className="flex-grow-1 p-3">
        <h1>Ordenes</h1>
        <MapContainer origin={origin} destination={destination} driver={driver} />
        <OrderBox/>
      </div>
    </div>
  );
}

export default Orders;

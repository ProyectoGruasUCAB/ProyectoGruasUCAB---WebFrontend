import React, { useState } from "react";
import InputComponent from "./inputComponent";
import MapComponent from "./mapComponent";

const MapContainer = () => {

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [path, setPath] = useState([]);

  const handleRoute = () => {
    if (origin && destination) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            const newPath = result.routes[0].overview_path.map(point => ({
              lat: point.lat(),
              lng: point.lng(),
            }));
            setPath(newPath);
          } else {
            console.error(`Error fetching directions ${status}`);
          }
        }
      );
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
        <InputComponent setOrigin={setOrigin} setDestination={setDestination} />
        <button onClick={handleRoute} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', marginLeft: '10px' }}>
          Agregar
        </button>
      </div>
      <MapComponent origin={origin} destination={destination} path={path}/>
    </div>
  );
};

export default MapContainer;

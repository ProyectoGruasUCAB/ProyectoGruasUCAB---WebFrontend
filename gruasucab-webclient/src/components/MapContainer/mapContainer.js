import React, { useState, useEffect } from "react";
import MapComponent from "./mapComponent";

const MapContainer = ({ origin, destination, driver }) => {
  const [path, setPath] = useState([]);

  useEffect(() => {
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

    handleRoute();
  }, [origin, destination]);

  return (
    <div className="map-content">
      <MapComponent origin={origin} destination={destination} driver={driver} path={path} />
    </div>
  );
};

export default MapContainer;

import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const initialCoordinates = {
  lat: 10.48801,
  lng: -66.87919,
};

const MapComponent = ({ origin, destination, driver }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: ["places"],
    });

    let map;
    let directionsRenderer;
    let directionsService;

    loader.load().then(() => {
      map = new window.google.maps.Map(mapRef.current, {
        center: initialCoordinates,
        zoom: 12,
        mapId: "b26807eeb8a510f9", // Añadimos el mapId proporcionado
      });

      console.log("Ubicación del conductor en MapComponent:", driver); // Agregamos el console.log

      // Configurar los marcadores solo si las ubicaciones están disponibles
      if (origin) {
        new window.google.maps.Marker({
          position: origin,
          map,
          title: "Origen",
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          },
        });
      }

      if (destination) {
        new window.google.maps.Marker({
          position: destination,
          map,
          title: "Destino",
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
          },
        });
      }

      if (driver) {
        new window.google.maps.Marker({
          position: driver,
          map,
          title: "Conductor",
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png",
          },
        });
      }

      directionsRenderer = new window.google.maps.DirectionsRenderer({
        suppressMarkers: true, // Suppress the default markers
      });
      directionsService = new window.google.maps.DirectionsService();
      directionsRenderer.setMap(map);

      if (origin && destination) {
        directionsService.route(
          {
            origin: origin,
            destination: destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              directionsRenderer.setDirections(result);
            } else {
              console.error(`Error fetching directions: ${status}`);
            }
          }
        );
      }
    });
  }, [origin, destination, driver]);

  return <div ref={mapRef} style={{ width: "100%", height: "500px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }} />;
};

export default MapComponent;

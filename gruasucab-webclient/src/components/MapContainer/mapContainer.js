import React, { useState, useEffect, useMemo } from "react";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

const initialCoordinates = {
  lat: 10.48801,
  lng: -66.87919,
};

function extractCoordinates(url) {
  // Función para extraer coordenadas de una URL de Google Maps
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);
  const coords = params.get('q').split(',');
  return {
    lat: parseFloat(coords[0]),
    lng: parseFloat(coords[1]),
  };
}

function MapContainer({ locationUrl }) {
  // Extraer coordenadas y almacenarlas en variables separadas
  const { lat, lng } = useMemo(() => {
    if (locationUrl) {
      const extractedCoords = extractCoordinates(locationUrl);
      return { lat: extractedCoords.lat, lng: extractedCoords.lng };
    }
    return initialCoordinates;
  }, [locationUrl]);

  // Estado para almacenar la instancia del mapa (opcional)
  const [map, setMap] = useState(null);

  // useEffect para manejar la inicialización y limpieza del mapa (opcional)
  useEffect(() => {
    if (map) {
      // Agregar listeners de eventos al mapa (por ejemplo, clics)
      map.addListener('click', (event) => {
        // Hacer algo cuando se hace clic en el mapa
        console.log('Clic en el mapa:', event.latLng.lat(), event.latLng.lng());
      });
    }

    return () => {
      // Remover listeners de eventos cuando el componente se desmonta
      if (map) {
        map.off('click');
      }
    };
  }, [map]);

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
      <div style={{ width: '100%', height: '500px' }}>
        <Map defaultZoom={14} defaultCenter={{ lat, lng }} mapId={"b26807eeb8a510f9"} ref={setMap}>
          <AdvancedMarker position={{ lat, lng }}>
            <Pin background={"#40b4e5"} borderColor={"#40b4e5"} glyphColor={"#2a7798"} />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
}

export default MapContainer;
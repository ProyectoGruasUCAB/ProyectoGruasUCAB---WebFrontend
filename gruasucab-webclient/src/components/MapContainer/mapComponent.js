import React, { useRef, useEffect } from "react";
import { APIProvider, Map, Pin, AdvancedMarker, GoogleMapsContext } from "@vis.gl/react-google-maps";

const initialCoordinates = {
  lat: 10.48801,
  lng: -66.87919,
};

const MapComponent = ({ origin, destination, path }) => {
  const mapRef = useRef(null);

  const renderPath = () => { 
    if (path.length === 0) return null; 
    
    return ( 
        <GoogleMapsContext.Consumer> 
            {({ map }) => { 
                if (!map) return null; 
                const line = new window.google.maps.Polyline({ 
                    path: path.map(point => ({ lat: point.lat, lng: point.lng })), 
                    strokeColor: '#5cd561', 
                    strokeOpacity: 1.0, 
                    strokeWeight: 2, 
                }); 
                line.setMap(map); 
                return null; 
            }} 
        </GoogleMapsContext.Consumer> 
    );
    };

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <div style={{ width: '100%', height: '500px' }}>
        <Map defaultZoom={14} defaultCenter={initialCoordinates} mapId="b26807eeb8a510f9" ref={mapRef}>
          {origin && (
            <AdvancedMarker position={origin}>
              <Pin background={"#40b4e5"} borderColor={"#40b4e5"} glyphColor={"#2a7798"} />
            </AdvancedMarker>
          )}
          {destination && (
            <AdvancedMarker position={destination}>
              <Pin background={"#40b4e5"} borderColor={"#40b4e5"} glyphColor={"#2a7798"} />
            </AdvancedMarker>
          )}
          {renderPath()}
        </Map>
      </div>
    </APIProvider>
  );
};

export default MapComponent;

import React from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '500px'
};

const center = {
    lat: 10.48801,
    lng: -66.87919
};

function MapContainer() {
    return (
            <LoadScript
                id="google-map-script"
                apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={14}
                >
                    {/* Child components, such as markers, info windows, etc. go here */}
                </GoogleMap> 
            </LoadScript>
    )
}

export default MapContainer;
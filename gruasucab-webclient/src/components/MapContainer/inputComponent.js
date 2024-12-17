import React, { useRef, useEffect } from "react";

const InputComponent = ({ setOrigin, setDestination }) => {
  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const initAutocomplete = () => {
    if (window.google && window.google.maps && window.google.maps.places) {
      const originAutocomplete = new window.google.maps.places.Autocomplete(originRef.current);
      originAutocomplete.addListener('place_changed', () => {
        const place = originAutocomplete.getPlace();
        if (place.geometry) {
          setOrigin({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
        }
      });

      const destinationAutocomplete = new window.google.maps.places.Autocomplete(destinationRef.current);
      destinationAutocomplete.addListener('place_changed', () => {
        const place = destinationAutocomplete.getPlace();
        if (place.geometry) {
          setDestination({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
        }
      });
    }
  };

  useEffect(() => {
    initAutocomplete();
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%'}}>
      <input 
        type="text" 
        placeholder="Buscar Origen" 
        ref={originRef} 
        style={{ flex: 1, marginRight: '10px', padding: '10px', border: '1px solid #ccc', borderRadius:'5px' }} 
      /> 
      <input 
        type="text" 
        placeholder="Buscar Destino" 
        ref={destinationRef} 
        style={{ flex: 1, marginRight: '10px', padding: '10px', border: '1px solid #ccc', borderRadius:'5px' }} 
      />
    </div>
  );
};

export default InputComponent;

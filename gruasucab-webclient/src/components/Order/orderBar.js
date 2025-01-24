import React from 'react';
import './orderBox.css';
import InputComponent from '../MapContainer/inputComponent';

function OrderBar({ setOrigin, setDestination, setDriver }) {

  return (
    <div>
      <InputComponent setOrigin={setOrigin} setDestination={setDestination} setDriver={setDriver}/>
    </div>
  );
}

export default OrderBar;

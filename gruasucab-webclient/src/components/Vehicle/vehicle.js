import React, { useEffect, useState } from "react";
import { getAllVehicle, setAuthToken } from '../../api/api';
import ShowListVehicle from "./showListVehicle";

function Operator() {
  const [vehicle, setVehicle] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const token = localStorage.getItem('authToken');
        setAuthToken(token);
        const response = await getAllVehicle();
        console.log('Response:', response.vehicles);
        setVehicle(response.vehicles); 
      } catch (error) {
        setError(error.message || 'Error al obtener los vehiculos, intenta de nuevo'); 
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchVehicle();
  }, []);
  

  return (
    <div>
      {isLoading ? (
        <p>Cargando...</p> 
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ShowListVehicle title="Vehiculos" role="Vehiculo" initialItems={vehicle} />
      )}
    </div>
  );
}

export default Operator;
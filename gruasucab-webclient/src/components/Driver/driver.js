import React, { useEffect, useState } from "react";
import ShowList from "../UI/showList";
import { getAllDrivers, setAuthToken } from '../../api/api';

function Operator() {
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        setAuthToken(token);
        const response = await getAllDrivers();
        setDrivers(response.drivers); 
      } catch (error) {
        setError(error.message || 'Error al obtener los conductores, intenta de nuevo'); 
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchDrivers();
  }, []);
  

  return (
    <div>
      {isLoading ? (
        <p>Cargando...</p> 
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ShowList title="Operadores" role="Conductor" initialItems={drivers} />
      )}
    </div>
  );
}

export default Operator;
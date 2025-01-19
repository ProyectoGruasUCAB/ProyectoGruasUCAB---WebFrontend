import React, { useEffect, useState } from "react";
import { getAllServiceFees, setAuthToken } from '../../api/api';
import ShowListServiceFee from "./showListServiceFee";

function Services() {
  const [serviceFee, setServiceFee] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchServiceFees = async () => {
      try {
        const token = localStorage.getItem('authToken');
        setAuthToken(token);
        const response = await getAllServiceFees();
        console.log('Response:', response.serviceFees);
        setServiceFee(response.serviceFees); 
      } catch (error) {
        setError(error.message || 'Error al obtener los vehiculos, intenta de nuevo'); 
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchServiceFees();
  }, []);
  

  return (
    <div>
      {isLoading ? (
        <p>Cargando...</p> 
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ShowListServiceFee title="Servicios" role="Servicio" initialItems={serviceFee} />
      )}
    </div>
  );
}

export default Services;
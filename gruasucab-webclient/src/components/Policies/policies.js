import React, { useEffect, useState } from "react";
import { getAllPolicies, setAuthToken } from '../../api/api';
import ShowListPolicy from "./showListPolicy";

function Policy() {
  const [policy, setPolicy] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const token = localStorage.getItem('authToken');
        setAuthToken(token);
        const response = await getAllPolicies();
        console.log('Response:', response.policies);
        setPolicy(response.policies); 
      } catch (error) {
        setError(error.message || 'Error al obtener los vehiculos, intenta de nuevo'); 
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchPolicy();
  }, []);
  

  return (
    <div>
      {isLoading ? (
        <p>Cargando...</p> 
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ShowListPolicy title="Polizas" role="Poliza" initialItems={policy} />
      )}
    </div>
  );
}

export default Policy;
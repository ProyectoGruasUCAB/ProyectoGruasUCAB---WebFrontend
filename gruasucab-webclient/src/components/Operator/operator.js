import React, { useEffect, useState } from "react";
import ShowList from "../UI/showList";
import { getAllWorkers } from '../../api/apiUser';
import { setAuthToken } from '../../api/apiAuth';

function Operator() {
  const [workers, setWorkers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        setAuthToken(token);
        const response = await getAllWorkers();
        console.log('Response:', response.workers); // Imprimir estructura completa del response
        setWorkers(response.workers); 
      } catch (error) {
        setError(error.message || 'Error al obtener los trabajadores, intenta de nuevo'); 
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchWorkers();
  }, []);
  

  return (
    <div>
      {isLoading ? (
        <p>Cargando...</p> 
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ShowList title="Operadores" role="Trabajador" initialItems={workers} />
      )}
    </div>
  );
}

export default Operator;
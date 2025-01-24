import React, { useEffect, useState } from "react";
import ShowList from "../UI/showList";
import { getAllProviders } from '../../api/apiUser';
import { setAuthToken } from '../../api/apiAuth';
function Suplier() {
  const [providers, setWorkers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const token = localStorage.getItem('authToken');
        setAuthToken(token);
        const response = await getAllProviders();
        console.log('Response:', response.providers); // Imprimir estructura completa del response
        setWorkers(response.providers); 
      } catch (error) {
        setError(error.message || 'Error al obtener los trabajadores, intenta de nuevo'); 
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProviders();
  }, []);
  

  return (
    <div>
      {isLoading ? (
        <p>Cargando...</p> 
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ShowList title="Proveedores" role="Proveedor" initialItems={providers} />
      )}
    </div>
  );
}

export default Suplier;
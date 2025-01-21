import React, { useEffect, useState } from "react";
import ShowList from "../UI/showList";
import { getAllSuppliers } from '../../api/apiSuplier';
import { setAuthToken } from '../../api/apiAuth';
function Provides() {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchAllSuppliers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        setAuthToken(token);
        const response = await getAllSuppliers();
        console.log('Response:', response.suppliers); // Imprimir estructura completa del response
        setSuppliers(response.providers); 
      } catch (error) {
        setError(error.message || 'Error al obtener los trabajadores, intenta de nuevo'); 
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchAllSuppliers();
  }, []);
  

  return (
    <div>
      {isLoading ? (
        <p>Cargando...</p> 
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ShowList title="Empresas" role="Empresa" initialItems={suppliers} />
      )}
    </div>
  );
}

export default Provides;
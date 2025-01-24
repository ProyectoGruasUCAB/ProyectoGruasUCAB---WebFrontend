import React, { useEffect, useState } from "react";
import ShowList from "../UI/showList";
import { getAllSuppliers } from '../../api/apiSuplier';
import { setAuthToken } from '../../api/apiAuth';
import ShowListProviders from "./showListProviders";

function Providers() {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchAllSuppliers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          setAuthToken(token);
        } else {
          throw new Error('No se encontró el token de autenticación');
        }
        const response = await getAllSuppliers();
        if (response && response.suppliers) {
          setSuppliers(response.suppliers);
          console.log(response.suppliers);
        } else {
          throw new Error('Error en la estructura de la respuesta de la API');
        }
      } catch (error) {
        setError(error.message || 'Error al obtener los proveedores, intenta de nuevo'); 
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
        <ShowListProviders title="Empresas" role="Empresa" initialItems={suppliers} />
      )}
    </div>
  );
}

export default Providers;
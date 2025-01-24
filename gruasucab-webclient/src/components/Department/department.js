import React, { useEffect, useState } from "react";
import { getAllDepartments } from '../../api/apiDepartment';
import { setAuthToken } from '../../api/apiAuth';
import ShowListDeparment from "./showListDepartment";

function Department() {
  const [department, setDepartment] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem('authToken');
        setAuthToken(token);
        const response = await getAllDepartments();
        console.log('Response:', response.departments);
        setDepartment(response.departments); 
      } catch (error) {
        setError(error.message || 'Error al obtener los vehiculos, intenta de nuevo'); 
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchDepartments();
  }, []);
  

  return (
    <div>
      {isLoading ? (
        <p>Cargando...</p> 
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ShowListDeparment title="Departamentos" role="Departamento" initialItems={department} />
      )}
    </div>
  );
}

export default Department;
import React, {useEffect, useState} from "react";
import ShowListCustomer from "./showListCustomer";
import {getAllClients} from '../../api/apiClient';
import { setAuthToken } from '../../api/apiAuth';





function Customer() {
    const [clients, setClients] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllClients = async () => {
            try {
                await setAuthToken(localStorage.getItem('authToken'));
                const response = await getAllClients();

                setClients(response);
                
            } catch (error) {
                setError(error.message || 'Error al obtener los clientes, intenta de nuevo'); 
            }
        }
        fetchAllClients();
        
    }, []);
    return (
        <div>
            <ShowListCustomer title = "Clientes" role="Cliente" initialItems={clients}/>
        </div>
    );
}

export default Customer;
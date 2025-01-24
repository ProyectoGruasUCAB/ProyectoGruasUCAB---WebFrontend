import { apiClient } from "./api"

export const getAllClients = async () => {
    try {
      const response = await apiClient.get('/Client/GetAllClients');
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Error al obtener los cliente:', error);
      throw error;
    }
  }

export const getClientById = async (clientId) => {
    try {
      const response = await apiClient.get(`/Client/GetClientById/${clientId}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Error al obtener el cliente:', error);
      throw error;
    }
  }
  
export const updateClient = async (clientData) => {
    try {
      const response = await apiClient.put('/Client/UpdateClient', clientData);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      throw error;
    }
  }

export const createClient = async (client) => {
    try {
      const response = await apiClient.post('/Client/CreateClient', client);
      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      console.error('Error al crear el cliente:', error);
      throw error;
    }
  }
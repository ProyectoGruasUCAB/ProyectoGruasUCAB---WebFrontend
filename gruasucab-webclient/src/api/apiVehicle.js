import { apiClient } from './api';

export const getAllVehicle = async () => {
  try {
    const response = await apiClient.get('/Vehicle/GetAllVehicles');
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al obtener los vehículos:', error);
    throw error;
  }
} 

export const getVehicleById = async (vehicleId) => {
  try {
    const response = await apiClient.get(`/Vehicle/GetVehicleById/${vehicleId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al obtener el vehículo:', error);
    throw error;
  }
}

export const updateVehicle = async (vehicleData) => {
  try {
    console.log("Vehiculo actualizado: ",vehicleData);
    const response = await apiClient.put('/Vehicle/UpdateVehicle', vehicleData);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al actualizar el vehículo:', error);
    throw error;
  }
}

export const createVehicle = async () => {
  try {
    const response = await apiClient.post('/Vehicle/CreateVehicle');
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al crear el vehículo:', error);
    throw error;
  }
}
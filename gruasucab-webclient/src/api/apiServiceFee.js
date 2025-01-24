import { apiClient } from './api';

export const getAllServiceFees = async () => {
  try {
    const response = await apiClient.get('/ServiceFee/GetAllServiceFees');
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al obtener los cargos de servicio:', error);
    throw error;
  }
}

export const getServiceFeeById = async (serviceFeeId) => {
  try {
    const response = await apiClient.get(`/ServiceFee/GetServiceFeeById/${serviceFeeId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al obtener el cargo de servicio:', error);
    throw error;
  }
}

export const createServiceFee = async (serviceFeeData) => {
  try {
    const response = await apiClient.post('/ServiceFee/CreateServiceFee', serviceFeeData);
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al crear el cargo de servicio:', error);
    throw error;
  }
}
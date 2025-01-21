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
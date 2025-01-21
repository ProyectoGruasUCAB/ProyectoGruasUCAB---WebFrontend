import { apiClient } from './api';

export const getAllPolicies = async () => {
  try {
    const response = await apiClient.get('/Policy/GetAllPolicies');
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al obtener las pólizas:', error);
    throw error;
  }
}
import { apiClient } from './api';

export const getAllDepartments = async () => {
  try {
    const response = await apiClient.get('/Department/GetAllDepartments');
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al obtener los departamentos:', error);
    throw error;
  }
}
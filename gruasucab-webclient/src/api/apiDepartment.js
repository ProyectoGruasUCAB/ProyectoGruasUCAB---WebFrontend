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

export const getDepartmentById = async (departmentId) => {
  try {
    const response = await apiClient.get(`/Department/GetDepartmentById/${departmentId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al obtener el departamento:', error);
    throw error;
  }
}

export const createDepartment = async (department) => {
  try {
    const response = await apiClient.post('/Department/CreateDepartment', department);
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al crear el departamento:', error);
    throw error;
  }
}

export const updateDepartment = async (department) => {
  try {
    const response = await apiClient.put('/Department/UpdateDepartment', department);
    if (response.status === 204) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al actualizar el departamento:', error);
    throw error;
  }
}
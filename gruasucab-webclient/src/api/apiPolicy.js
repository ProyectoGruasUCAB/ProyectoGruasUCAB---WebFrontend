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

export const getPolicyById = async (policyId) => {
  try {
    const response = await apiClient.get(`/Policy/GetPolicyById/${policyId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al obtener la póliza:', error);
    throw error;
  }
}

export const createPolicy = async (policy) => {
  try {
    const response = await apiClient.post('/Policy/CreatePolicy', policy);
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al crear la póliza:', error);
    throw error;
  }
}
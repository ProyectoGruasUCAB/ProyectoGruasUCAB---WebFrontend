import { apiClient } from './api';

export const updateUserData = async (userData) => {
  try {
    const response = await apiClient.put('/User/UpdateUserData', userData);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al actualizar los datos del usuario:', error);
    throw error;
  }
};

export const getAllDrivers = async () => {
  try {
    const response = await apiClient.get('/User/GetAllDrivers');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los conductores:', error);
    throw error;
  }
};

export const getDriverById = async (userId) => {
  try {
    const response = await apiClient.get(`/User/GetDriverById/${userId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
      throw error; 
  }
};

export const getWorkerById = async (userId) => {
  try {
    console.log(userId);
    const response = await apiClient.get(`/User/GetWorkerById/${userId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
      throw error; 
  }
};


export const getProviderById = async (userId) => {
  try {
    console.log(userId);
    const response = await apiClient.get(`/User/GetProviderById/${userId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
      throw error; 
  }
};

export const recordUserData = async (user) => {
  try {
    const response = await apiClient.post('/User/RecordUserData', user);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
      throw error; 
  }
}


export const getAllWorkers = async () => {
  try {
    const response = await apiClient.get('/User/GetAllWorkers');
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.error('Error al obtener los trabajadores:', error);
    throw error;
  }
};

export const getAllProviders = async () => {
  try {
    const response = await apiClient.get('/User/GetAllProviders');
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al obtener los trabajadores:', error);
    throw error;
  }
};


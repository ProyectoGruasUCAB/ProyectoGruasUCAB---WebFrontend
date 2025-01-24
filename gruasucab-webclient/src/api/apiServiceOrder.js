import { apiClient } from './api';

export const createServiceOrder = async (orderData) => {
  try {
    const response = await apiClient.post('/ServiceOrder/CreateServiceOrder', orderData);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al crear la orden de servicio:', error);
    throw error;
  }
}

export const getServiceOrderById = async (serviceOrderId) => {
  try {
    const response = await apiClient.get(`/ServiceOrder/GetServiceOrderById/${serviceOrderId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al obtener la orden de servicio:', error);
    throw error;
  }
}

export const getAllOrders = async () => {
  try {
    const response = await apiClient.get("/ServiceOrder/GetAllServiceOrders");
    if (response.status === 200) {
      return response.data; 
    }
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    throw error;
  }
};

export const updateServiceOrder = async (serviceOrder) => {
  console.log(serviceOrder);
  try {
    const response = await apiClient.put('/ServiceOrder/UpdateServiceOrder', serviceOrder);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al actualizar la orden de servicio:', error);
    throw error;
  }
}

export const getServiceOrderByDriverId = async (driverId) => {
  try {
    const response = await apiClient.get(`/ServiceOrder/GetOrdersByDriverId/${driverId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al obtener la orden de servicio:', error);
    throw error;
  }
}

export const getServiceOrderByOperatorId = async (operatorId) => {
  try {
    const response = await apiClient.get(`/ServiceOrder/GetOrdersByOperatorId/${operatorId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al obtener la orden de servicio:', error);
    throw error;
  }
}

export const getServiceOrderBySupplierId =async (supplierId) => {
  try {
    const response = await apiClient.get(`/ServiceOrder/GetOrdersBySupplierId/${supplierId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al obtener la orden de servicio:', error);
    throw error;
  }
}

export const getOrdersByVehicleId = async (vehicleId) => {
  try {
    const response = await apiClient.get(`/ServiceOrder/GetOrdersByVehicleId/${vehicleId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al obtener la orden de servicio:', error);
    throw error;
  }
}

export const getOrdersByClientId = async (clientId) => {
  try {
    const response = await apiClient.get(`/ServiceOrder/GetOrdersByClientId/${clientId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error al obtener la orden de servicio:', error);
    throw error;
  }
}
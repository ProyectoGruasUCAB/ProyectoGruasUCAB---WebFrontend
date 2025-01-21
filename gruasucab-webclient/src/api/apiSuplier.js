import { apiClient } from "./api";

export const createSupplier = async (supplierData) => {
    try {
        const response = await apiClient.post('/Supplier/CreateSupplier', supplierData);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error al crear proveedor:', error);
        throw error;
    }
};

export const getSupplierById = async (id) => {
    try {
        const response = await apiClient.get(`/Supplier/GetSupplierById/${id}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error al obtener datos del proveedor:', error);
        throw error;
    }
}

export const getAllSuppliers = async () => {
    try {
        const response = await apiClient.get('/Supplier/GetAllSuppliers');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los proveedores:', error);
        throw error;
    }
}
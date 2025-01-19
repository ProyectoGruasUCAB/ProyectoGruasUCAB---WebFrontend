import axios from 'axios';

const API_BASE_URL = 'http://localhost:5144';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Función para establecer el token de autorización
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// Función para refrescar el token
export const refreshToken = async () => {
  try {
    
    const refreshToken = localStorage.getItem('refreshToken');
    console.log(refreshToken);
    const userEmail = localStorage.getItem('userEmail');
    console.log(userEmail);

    const response = await apiClient.post('/Auth/RefreshToken', { userEmail: userEmail, refreshToken: refreshToken});

    if (response.status === 200) {
      const { accessToken, refreshToken: newRefreshToken } = response.data;
      localStorage.setItem('authToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);
      setAuthToken(accessToken);
      console.log('Token actualizado con éxito.');
    } else {
      console.error('Error al actualizar el token:', response.status);
    }
  } catch (error) {
    console.error('Error al actualizar el token:', error);
  }
};

// Llamar a la función de refresco cada 5 minutos
setInterval(refreshToken, 300000);


export const login = async (userEmail, password) => {
  try {
    const response = await apiClient.post('/Auth/Login', {
      userEmail,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Login failed: Invalid credentials');
        throw new Error('Invalid email or password');
      } else if (error.response.data === "Unauthorized access: Account is not fully set up") {
        throw new Error('Account is not fully set up');
      } else {
        console.error('Error during login:', error.response.data);
        throw new Error('An error occurred during login');
      }
    } else {
      console.error('Error during login:', error);
      throw new Error('An error occurred during login');
    }
  }
};


export const createUser = async (user) => {
  try {
    const response = await apiClient.post('/Auth/CreateUser', user);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('CreateUser failed: Unauthorized');
        throw new Error('You are not authorized to create a user');
      } else {
        console.error('Error creating user:', error.response.data);
        throw new Error('An error occurred while creating the user');
      }
    } else {
      console.error('Error creating user:', error);
      throw new Error('An error occurred while creating the user');
    }
  }
};

export const changePassword = async (userEmail, newPassword) => {

  try {
    const response = await apiClient.put(`/Auth/ChangePassword`, { userEmail: userEmail, newPassword: newPassword });
    
    if (response.status === 200) {
      console.log('Contraseña cambiada con éxito.');
    } else {
      console.error('Error al cambiar la contraseña:', response.status);
    }
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
  }
};

export const forgotPassword = async (userEmail) => {
  try {
    const response = await apiClient.post('/Auth/RecoverPassword', {
      userEmail: userEmail
    });

    if (response.status === 200) {
      console.log('Correo enviado con éxito.');
    } else {
      console.error('Error al enviar el correo:', response.status);
    }
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

export const logout = async (userEmail, refreshToken) => {
  try {
    const response = await apiClient.post('/Auth/Logout', {
      userEmail: userEmail,
      refreshToken: refreshToken
    });

    if (response.status === 200) {
      console.log('Sesión cerrada con éxito.');
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('user');
    } else {
      console.error('Error al cerrar la sesión:', response.status);
    }
  } catch (error) {
    console.error('Error al cerrar la sesión:', error);
  }
}

export const handleIncompleteAccount = async (userEmail, password, newPassword) => {
  try {
    const response = await apiClient.post('/Auth/HandleIncompleteAccount', {
      userEmail: userEmail,
      password: password,
      newPassword: newPassword
    });

    if (response.status === 200) {
      console.log('Cuenta incompleta reestablecida con éxito.');
      return response.data;
    } else {
      console.error('Error al reestablecer la cuenta incompleta:', response.status);
      throw new Error('Error al actualizar la contraseña.');
    }
  } catch (error) {
    console.error('Error al reestablecer la cuenta incompleta:', error);
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
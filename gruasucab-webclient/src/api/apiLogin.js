import axios from 'axios';

const API_BASE_URL = 'http://localhost:5144'; // Replace with your YARP URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const login = async (userEmail, password) => {
  try {
    const response = await apiClient.post('/Auth/Login', {
        userEmail,
        password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Handle specific error codes (e.g., 401 Unauthorized)
      if (error.response.status === 401) {
        console.error('Login failed: Invalid credentials');
        throw new Error('Invalid email or password'); // Provide user-friendly error
      } else {
        console.error('Error during login:', error.response.data);
        throw new Error('An error occurred during login'); // Generic error
      }
    } else {
      console.error('Error during login:', error);
      throw new Error('An error occurred during login'); // Generic error
    }
  }
};
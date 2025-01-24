import axios from 'axios';

const API_BASE_URL = 'http://localhost:5144';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

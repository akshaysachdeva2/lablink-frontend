import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://lablink-backend-cp9v.onrender.com/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('lablink_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function getApiError(error: unknown, fallback = 'Something went wrong. Please try again.') {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || (error.code === 'ERR_NETWORK'
      ? 'Cannot reach the LabLink API. Make sure the backend is running on port 5001.'
      : fallback);
  }
  return fallback;
}

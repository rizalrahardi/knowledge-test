import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const register = async (name, email, gender, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, { name, email, gender, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';
const token = localStorage.getItem('token');
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}
export const fetchProfile = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/profile`, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/profile`, profileData, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

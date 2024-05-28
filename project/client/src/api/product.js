import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';
const token = localStorage.getItem('token');
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/product`, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/product/${productId}`, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/product`, productData, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteProduct = async (productId) => {
  try {
    await axios.delete(`${BASE_URL}/product/${productId}`, config);
  } catch (error) {
    throw error.response.data;
  }
};

export const updateProduct = async (productId, updatedProductData) => {
  try {
    await axios.patch(`${BASE_URL}/product/${productId}`, updatedProductData, config);
  } catch (error) {
    throw error.response.data;
  }
};

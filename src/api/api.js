import axios from 'axios';

const API_URL = 'https://mern-task-backend-6w3i.onrender.com'; 

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, userData);
    return response.data;
  } catch (error) {
    console.error('Login Error:', error.response.data.message);
    throw error;
  }
};

export const addEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, employeeData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Add Employee Error:', error.response.data.message);
    throw error;
  }
};

export const fetchEmployees = async (sortBy = 'f_Id', order = 'asc') => {
  try {
    const response = await axios.get(`${API_URL}/employees`, {
      params: { sortBy, order },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error.response?.data?.message || error.message);
    throw error;
  }
};


export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting employee:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const updateEmployee = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/employees/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating employee:', error.response?.data?.message || error.message);
    throw error;
  }
};

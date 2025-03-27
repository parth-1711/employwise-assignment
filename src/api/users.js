import axios from "axios";

const BASE_URL = "https://reqres.in/api";

export const fetchUsers = async (page = 1) => {
  const response = await axios.get(`${BASE_URL}/users?page=${page}`);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await axios.put(`${BASE_URL}/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${BASE_URL}/users/${id}`);
};

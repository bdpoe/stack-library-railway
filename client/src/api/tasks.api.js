import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getTaskRequest = () => axios.get(`${API}/tasks`);

export const createTaskRequest = (task) =>
  axios.post(`${API}/tasks`, task);

export const deleteTaskRequest = (id) =>
  axios.delete(`${API}/tasks/${id}`);

export const getTasksRequest = (id) =>
  axios.get(`${API}/tasks/${id}`);

export const updateTaskRequest = (id, newFields) =>
  axios.put(`${API}/tasks/${id}`, newFields);

export const toggleTaskDoneRequest = (id, done) =>
  axios.put(`${API}/tasks/${id}`, { done });

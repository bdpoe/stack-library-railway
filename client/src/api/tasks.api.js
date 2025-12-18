import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// Obtener todos los libros
export const getTasksRequest = () =>
  axios.get(`${API}/tasks`);

// 👉 NECESARIA PARA LoanForm.jsx
export const getAvailableTasksRequest = () =>
  axios.get(`${API}/tasks?available=true`);

// Obtener libro por ID
export const getTaskRequest = (id) =>
  axios.get(`${API}/tasks/${id}`);

// Crear libro (FormData)
export const createTaskRequest = (formData) =>
  axios.post(`${API}/tasks`, formData);

// Actualizar libro (FormData)
export const updateTaskRequest = (id, formData) =>
  axios.put(`${API}/tasks/${id}`, formData);

// Eliminar libro
export const deleteTaskRequest = (id) =>
  axios.delete(`${API}/tasks/${id}`);

// Cambiar estado (prestado / disponible)
export const toggleTaskRequest = (id) =>
  axios.put(`${API}/tasks/${id}/toggle`);

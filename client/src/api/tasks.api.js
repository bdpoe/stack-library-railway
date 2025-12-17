// src/api/tasks.api.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// Obtener todos los libros
export const getTasksRequest = () =>
  axios.get(`${API}/tasks`);

// Obtener solo libros disponibles
export const getAvailableTasksRequest = () =>
  axios.get(`${API}/tasks?available=true`);

// Crear libro
export const createTaskRequest = (task) =>
  axios.post(`${API}/tasks`, task);

// Obtener libro por ID
export const getTaskRequest = (id) =>
  axios.get(`${API}/tasks/${id}`);

// Actualizar libro
export const updateTaskRequest = (id, task) =>
  axios.put(`${API}/tasks/${id}`, task);

// Eliminar libro
export const deleteTaskRequest = (id) =>
  axios.delete(`${API}/tasks/${id}`);

// 🔁 CAMBIAR ESTADO (PRESTADO / DISPONIBLE)
export const toggleTaskRequest = (id) =>
  axios.put(`${API}/tasks/${id}/toggle`);

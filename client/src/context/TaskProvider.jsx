// src/context/TaskProvider.jsx
import { createContext, useContext, useState } from "react";
import {
  getTasksRequest,
  getTaskRequest,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
  toggleTaskRequest, // ✅ NOMBRE CORRECTO
} from "../api/tasks.api";

// =====================
// CONTEXTO
// =====================
const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks debe usarse dentro de un TaskContextProvider");
  }
  return context;
};

// =====================
// PROVIDER
// =====================
export function TaskContextProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // 🔹 Obtener TODOS los libros
  const loadTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (err) {
      console.error("❌ Error cargando libros:", err);
    }
  };

  // 🔹 Obtener UN libro por ID
  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (err) {
      console.error("❌ Error obteniendo libro:", err);
      return null;
    }
  };

  // 🔹 Crear libro
  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      setTasks([...tasks, res.data]);
      return res.data;
    } catch (err) {
      console.error("❌ Error creando libro:", err);
    }
  };

  // 🔹 Actualizar libro
  const updateTask = async (id, newData) => {
    try {
      const res = await updateTaskRequest(id, newData);
      setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
      return res.data;
    } catch (err) {
      console.error("❌ Error actualizando libro:", err);
    }
  };

  // 🔹 Eliminar libro
  const deleteTask = async (id) => {
    try {
      await deleteTaskRequest(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error("❌ Error eliminando libro:", err);
    }
  };

  // 🔹 Cambiar estado Prestado / Disponible
  const toggleTaskDone = async (id) => {
    try {
      const res = await toggleTaskRequest(id); // ✅ CORRECTO
      setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
      return res.data;
    } catch (err) {
      console.error("❌ Error cambiando estado del libro:", err);
    }
  };

  // =====================
  // CONTEXTO EXPORTADO
  // =====================
  return (
    <TaskContext.Provider
      value={{
        tasks,
        loadTasks,
        getTask,
        createTask,
        updateTask,
        deleteTask,
        toggleTaskDone,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

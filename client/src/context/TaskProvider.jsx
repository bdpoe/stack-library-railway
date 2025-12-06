import { createContext, useContext, useState } from "react";
import {
  getTaskRequest,
  deleteTaskRequest,
  createTaskRequest,
  getTasksRequest,
  updateTaskRequest,
  toggleTaskDoneRequest,
} from "../api/tasks.api.js";
import { TaskContext } from "./TaskContext";

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context === undefined) {
    throw new Error("useTasks must be used withim a TaskContextProvider");
  }
  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  async function loadTasks() {
    const response = await getTaskRequest();
    setTasks(response.data);
  }

  const deleteTask = async (id) => {
    try {
      const response = await deleteTaskRequest(id);
      // mantener todas las tareas cuyo id sea diferente al id pasado
      setTasks(tasks.filter((task) => task.id !== id)); //para que se automotice para que fluya al eliminar
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task) => {
    try {
      const response = await createTaskRequest(task);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getTasks = async (id) => {
    try {
      const response = await getTasksRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, newfields) => {
    try {
      const response = await updateTaskRequest(id, newfields);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTaskDone = async (id) => {
    //actualizacion
    try {
      const taskFound = tasks.find((task) => task.id === id);
      await toggleTaskDoneRequest(id, taskFound.done === 0 ? true : false);
      if (!Array.isArray(tasks)) return;

      setTasks(
        tasks.map((task) =>
          task.id === id ? (task.done = task.done === 0 ? 1 : 0) : task.done
        )
      );
      setTasks([...tasks]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loadTasks,
        deleteTask,
        createTask,
        getTasks,
        updateTask,
        toggleTaskDone,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

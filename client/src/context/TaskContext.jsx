import { createContext, useContext } from "react";

export const TaskContext = createContext();

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks debe usarse dentro de TaskContextProvider");
  return context;
}












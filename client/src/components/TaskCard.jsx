import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskProvider";
import { useAuth } from "../context/AuthContext";
import { useUI } from "../context/UIContext";
import BookDetailModal from "./BookDetailModal";

function TaskCard({ task }) {
  const { deleteTask, toggleTaskDone } = useTasks();
  const { user } = useAuth();
  const { showSuccess, showError } = useUI();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const isLibrarian = user?.role === "librarian";
  const isPrestado = task.done === 1;

  const statusClasses = isPrestado
    ? "bg-red-100 text-red-700"
    : "bg-emerald-100 text-emerald-700";

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      showSuccess("Libro eliminado correctamente");
    } catch {
      showError("Error al eliminar el libro");
    }
  };

  const handleToggle = async () => {
    try {
      await toggleTaskDone(task.id);
      showSuccess(
        isPrestado
          ? "Libro marcado como disponible"
          : "Libro marcado como prestado"
      );
    } catch {
      showError("Error al cambiar el estado");
    }
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          bg-white dark:bg-slate-900
          rounded-2xl
          border border-slate-200 dark:border-slate-700
          shadow-sm hover:shadow-lg
          transition
          overflow-hidden
          flex flex-col
          cursor-pointer
        "
        onClick={() => !isLibrarian && setOpen(true)}
      >
        {/* PORTADA */}
        {task.image ? (
          <img
            src={task.image}
            alt={task.title}
            className="w-full aspect-[3/4] object-contain bg-slate-100 dark:bg-slate-800 p-2"
          />
        ) : (
          <div className="aspect-[3/4] flex items-center justify-center text-slate-400">
            Sin portada
          </div>
        )}

        {/* CONTENIDO */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-semibold line-clamp-2">
              {task.title}
            </h3>

            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusClasses}`}
            >
              {isPrestado ? "Prestado" : "Disponible"}
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3">
            {task.description}
          </p>

          {/* BOTONES BIBLIOTECARIO */}
          {isLibrarian && (
            <div className="mt-3 flex gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                className="flex-1 bg-rose-500 text-white text-[10px] py-1 rounded"
              >
                Eliminar
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/books/edit/${task.id}`);
                }}
                className="flex-1 bg-amber-600 text-white text-[10px] py-1 rounded"
              >
                Editar
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggle();
                }}
                className="flex-1 bg-emerald-600 text-white text-[10px] py-1 rounded"
              >
                {isPrestado ? "Disponible" : "Prestar"}
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* MODAL SOLO ALUMNO */}
      {!isLibrarian && open && (
        <BookDetailModal task={task} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

export default TaskCard;

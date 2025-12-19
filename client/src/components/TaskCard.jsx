import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTasks } from "../context/TaskProvider";
import { useAuth } from "../context/AuthContext";
import { useUI } from "../context/UIContext";

function TaskCard({ task, onSelect }) {
  const { deleteTask, toggleTaskDone } = useTasks();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError } = useUI();

  const isLibrarian = user?.role === "librarian";
  const isStudent = user?.role === "student";

  const isPrestado = task.done === 1;
  const statusText = isPrestado ? "Prestado" : "Disponible";
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
      showError("Error al cambiar el estado del libro");
    }
  };

  const handleStudentClick = () => {
    if (isStudent && onSelect) {
      onSelect(task);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      onClick={handleStudentClick}
      className={`
        bg-white dark:bg-slate-900
        rounded-2xl
        border border-slate-200 dark:border-slate-700
        shadow-sm hover:shadow-lg
        transition-all duration-200
        overflow-hidden
        flex flex-col
        ${isStudent ? "cursor-pointer hover:ring-2 hover:ring-amber-400" : ""}
      `}
    >
      {/* 🖼️ PORTADA */}
      {task.image ? (
        <div className="w-full aspect-[3/4] bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-1">
          <img
            src={task.image}
            alt={task.title}
            className="w-full h-full object-contain rounded-lg"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="w-full aspect-[3/4] flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 text-sm">
          Sin portada
        </div>
      )}

      {/* CONTENIDO */}
      <div className="p-4 flex flex-col flex-grow">
        {/* TÍTULO + ESTADO */}
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">
            {task.title}
          </h2>

          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${statusClasses}`}
          >
            {statusText}
          </span>
        </div>

        {/* DESCRIPCIÓN */}
        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 mb-2">
          {task.description}
        </p>

        {/* FOOTER */}
        <div className="mt-auto">
          <span className="block text-[10px] text-slate-400 dark:text-slate-500 mb-2">
            Registrado: {task.createdAt}
          </span>

          {/* 🔐 BOTONES SOLO BIBLIOTECARIO */}
          {isLibrarian && (
            <div className="flex gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white text-[10px] py-1 rounded-md"
              >
                Eliminar
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/books/edit/${task.id}`);
                }}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-[10px] py-1 rounded-md"
              >
                Editar
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggle();
                }}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] py-1 rounded-md"
              >
                {isPrestado ? "Disponible" : "Prestar"}
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default TaskCard;

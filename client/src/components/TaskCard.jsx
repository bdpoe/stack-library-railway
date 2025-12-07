import { useTasks } from "../context/TaskProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function TaskCard({ task }) {
  const { deleteTask, toggleTaskDone } = useTasks();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isLibrarian = user?.role === "librarian";

  return (
    <div className="bg-white rounded-2xl border border-sky-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-transform duration-200 p-4">
      
      {/* Header */}
      <header className="flex justify-between items-start mb-2">
        <h2 className="text-base md:text-lg font-semibold text-sky-700">
          {task.title}
        </h2>

        {/* Estado del libro */}
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            task.done === 1
              ? "bg-rose-100 text-rose-700"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {task.done === 1 ? "Prestado" : "Disponible"}
        </span>
      </header>

      {/* Descripción */}
      <p className="text-sm text-slate-600 mb-1">{task.description}</p>
      <span className="block text-[11px] text-slate-400 mb-3">
        {task.createdAt}
      </span>

      <div className="flex gap-2">

        {/* SOLO PARA BIBLIOTECARIO */}
        {isLibrarian && (
          <>
            {/* Eliminar */}
            <button
              className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-medium py-1.5 rounded-full text-xs md:text-sm transition-colors"
              onClick={() => deleteTask(task.id)}
            >
              Eliminar
            </button>

            {/* Editar */}
            <button
              className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-medium py-1.5 rounded-full text-xs md:text-sm transition-colors"
              onClick={() => navigate(`/edit/${task.id}`)}
            >
              Editar
            </button>

            {/* Cambiar estado */}
            <button
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-1.5 rounded-full text-xs md:text-sm transition-colors"
              onClick={() => toggleTaskDone(task.id)}
            >
              {task.done === 1 ? "Marcar disponible" : "Marcar prestado"}
            </button>
          </>
        )}

        {/* LO QUE VE EL ALUMNO */}
        {!isLibrarian && (
          <p className="text-xs text-slate-500 italic">
            {task.done === 1
              ? "Actualmente prestado"
              : "Disponible para préstamo"}
          </p>
        )}
      </div>
    </div>
  );
}

export default TaskCard;

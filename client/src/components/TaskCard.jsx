import { useTasks } from "../context/TaskProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function TaskCard({ task }) {
  const { deleteTask, toggleTaskDone } = useTasks();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isLibrarian = user?.role === "librarian";
  const isPrestado = Number(task.done) === 1;

  return (
    <div className="bg-white rounded-2xl border border-amber-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-transform duration-200 p-4">
      {/* Header */}
      <header className="flex justify-between items-start mb-2">
        <h2 className="text-base md:text-lg font-semibold text-amber-900">
          {task.title}
        </h2>

        {/* Estado del libro */}
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            isPrestado
              ? "bg-rose-100 text-rose-700"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {isPrestado ? "Prestado" : "Disponible"}
        </span>
      </header>

      {/* Descripción */}
      <p className="text-sm text-stone-700 mb-1">{task.description}</p>
      <span className="block text-[11px] text-stone-400 mb-3">
        {task.createdAt}
      </span>

      <div className="flex gap-2 items-center">
        {/* SOLO BIBLIOTECARIO: CRUD COMPLETO */}
        {isLibrarian && (
          <>
            <button
              className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-medium py-1.5 rounded-full text-xs md:text-sm transition-colors"
              onClick={() => deleteTask(task.id)}
            >
              Eliminar
            </button>

            <button
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-1.5 rounded-full text-xs md:text-sm transition-colors"
              onClick={() => navigate(`/tasks/edit/${task.id}`)}
            >
              Editar
            </button>

            <button
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-1.5 rounded-full text-xs md:text-sm transition-colors"
              onClick={() => toggleTaskDone(task.id)}
            >
              {isPrestado ? "Marcar disponible" : "Marcar prestado"}
            </button>
          </>
        )}

        {/* ALUMNO: solo texto informativo */}
        {!isLibrarian && (
          <p className="text-xs text-stone-500 italic">
            {isPrestado
              ? "Este libro está prestado."
              : "Este libro está disponible."}
          </p>
        )}
      </div>
    </div>
  );
}

export default TaskCard;

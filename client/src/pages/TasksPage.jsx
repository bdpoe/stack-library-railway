import { useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/TaskProvider";
import { useAuth } from "../context/AuthContext";

function TasksPage() {
  const { tasks, loadTasks } = useTasks();
  const { user } = useAuth();

  useEffect(() => {
    loadTasks();
  }, []);

  if (!Array.isArray(tasks)) {
    return (
      <p className="text-center text-stone-600">
        No hay libros cargados en este momento.
      </p>
    );
  }

  const total = tasks.length;
  const prestados = tasks.filter((t) => Number(t.done) === 1).length;
  const disponibles = total - prestados;
  const isLibrarian = user?.role === "librarian";

  return (
    <div className="space-y-6">
      {/* Título */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-amber-800 text-center tracking-wide">
        {isLibrarian ? "Gestión de libros" : "Libros de la biblioteca"}
      </h1>

      {/* Dashboard solo para bibliotecario */}
      {isLibrarian && (
        <section className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-stone-500 uppercase tracking-wide">
              Libros totales
            </p>
            <p className="text-2xl font-bold text-amber-800">{total}</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-stone-500 uppercase tracking-wide">
              Disponibles
            </p>
            <p className="text-2xl font-bold text-emerald-700">
              {disponibles}
            </p>
          </div>
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-stone-500 uppercase tracking-wide">
              Prestados
            </p>
            <p className="text-2xl font-bold text-rose-600">{prestados}</p>
          </div>
        </section>
      )}

      {/* Mensaje cuando no hay libros */}
      {tasks.length === 0 ? (
        <p className="text-center text-stone-600 mt-6">
          Aún no hay libros registrados en la biblioteca.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TasksPage;

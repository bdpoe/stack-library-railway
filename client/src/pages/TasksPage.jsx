import { useEffect } from "react";
import Taskcard from "../components/TaskCard";
import { useTasks } from "../context/TaskProvider";

function TasksPage() {  
  const {tasks, loadTasks} = useTasks();

  useEffect(() => {
    loadTasks();
  }, []);

  function renderMain() {
    if (tasks.length === 0)
      return (
        <h1 className="text-center text-slate-500 text-lg font-medium mt-10">
          Aún no hay libros en la biblioteca 📚
        </h1>
      );
if (!Array.isArray(tasks)) return <p>No hay tareas disponibles.</p>;

return tasks.map((task) => <Taskcard task={task} key={task.id} />);
  }

  return (
    <div>
      <h1 className="text-4xl md:text-5xl text-sky-700 font-extrabold text-center mb-8 tracking-wide drop-shadow-sm">
        BIBLIOTECA
      </h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {renderMain()}
      </div>
    </div>
  );
}

export default TasksPage;

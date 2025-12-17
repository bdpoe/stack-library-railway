import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../context/TaskProvider";

function TaskForm() {
  const { createTask, updateTask, getTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const [imageFile, setImageFile] = useState(null);

  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const data = await getTask(params.id);
        setTask({
          title: data.title || "",
          description: data.description || "",
        });
      }
    }
    loadTask();
  }, [params.id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", task.title);
    formData.append("description", task.description);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (params.id) {
        await updateTask(params.id, formData);
      } else {
        await createTask(formData);
      }

      // 🔁 SIEMPRE volver a libros
      navigate("/books");
    } catch (err) {
      console.error("Error guardando libro:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border dark:border-slate-700">
        <h2 className="text-2xl font-bold mb-4 text-amber-700 dark:text-amber-400">
          {params.id ? "Editar Libro" : "Nuevo Libro"}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* TÍTULO */}
          <label className="block text-sm font-medium mb-1 dark:text-slate-200">
            Título
          </label>
          <input
            type="text"
            name="title"
            placeholder="Título del libro"
            value={task.title}
            onChange={handleChange}
            required
            className="
              w-full px-3 py-2 mb-4 rounded
              border border-slate-300
              bg-white text-slate-900
              dark:bg-slate-900 dark:text-slate-100 dark:border-slate-600
              focus:ring-2 focus:ring-amber-500
            "
          />

          <label className="block text-sm font-medium mb-1 dark:text-slate-200">
            Imagen del libro
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="mb-4 text-sm"
          />

          {/* DESCRIPCIÓN */}
          <label className="block text-sm font-medium mb-1 dark:text-slate-200">
            Descripción
          </label>
          <textarea
            name="description"
            placeholder="Descripción del libro"
            value={task.description}
            onChange={handleChange}
            rows="4"
            className="
              w-full px-3 py-2 mb-6 rounded
              border border-slate-300
              bg-white text-slate-900
              dark:bg-slate-900 dark:text-slate-100 dark:border-slate-600
              focus:ring-2 focus:ring-amber-500
            "
          />

          {/* BOTONES */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="
                flex-1 bg-amber-600 hover:bg-amber-700
                text-white font-semibold py-2 rounded-lg
                transition
              "
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/books")}
              className="
                flex-1 bg-slate-300 hover:bg-slate-400
                dark:bg-slate-600 dark:hover:bg-slate-500
                text-slate-900 dark:text-white
                py-2 rounded-lg transition
              "
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;

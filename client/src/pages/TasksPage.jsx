import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskProvider";
import TaskCard from "../components/TaskCard";
import SearchBar from "../components/SearchBar";
import BookDetailModal from "../components/BookDetailModal";

function TasksPage() {
  const { tasks, loadTasks } = useTasks();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  const isLibrarian = user?.role === "librarian";
  const isStudent = user?.role === "student";

  useEffect(() => {
    loadTasks();
  }, []);

  // 🔎 FILTRO SEGURO
  const filtered = tasks.filter((t) => {
    const title = t?.title || "";
    return title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* HEADER + BOTÓN */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-amber-900 dark:text-amber-400">
          Libros
        </h1>

        {/* SOLO BIBLIOTECARIO */}
        {isLibrarian && (
          <button
            onClick={() => navigate("/books/new")}
            className="
              bg-amber-600 hover:bg-amber-700
              text-white font-semibold
              px-4 py-2 rounded-lg
              transition
            "
          >
            + Agregar libro
          </button>
        )}
      </div>

      {/* BUSCADOR */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* LISTADO */}
      {filtered.length === 0 ? (
        <p className="text-slate-500 mt-6">No se encontraron libros.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
          {filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onSelect={isStudent ? setSelectedBook : null}
            />
          ))}
        </div>
      )}

      {/* 📘 MODAL SOLO PARA ESTUDIANTE */}
      {isStudent && selectedBook && (
        <BookDetailModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}

export default TasksPage;

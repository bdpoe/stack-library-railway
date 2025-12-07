import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-sky-600 shadow-md backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white font-extrabold text-xl tracking-wide"
        >
          🕮 <span>Biblioteca Escolar</span>
        </Link>

        {/* Sin usuario → nada más */}
        {!user && <div></div>}

        {user && (
          <ul className="flex gap-3 items-center">
            {/* Inicio */}
            <li>
              <Link
                to="/"
                className="bg-white text-sky-700 font-semibold px-3 py-1.5 rounded-full shadow-sm hover:bg-sky-100 transition-colors duration-200"
              >
                Inicio
              </Link>
            </li>

            {/* 🔵 SOLO BIBLIOTECARIO */}
            {user.role === "librarian" && (
              <>
                {/* Ver préstamos */}
                <li>
                  <Link
                    to="/loans"
                    className="bg-indigo-500 text-white font-semibold px-3 py-1.5 rounded-full shadow-sm hover:bg-indigo-600 transition-colors duration-200"
                  >
                    Préstamos
                  </Link>
                </li>

                {/* Agregar préstamo */}
                <li>
                  <Link
                    to="/loans/new"
                    className="bg-emerald-500 text-white font-semibold px-3 py-1.5 rounded-full shadow-sm hover:bg-emerald-600 transition-colors duration-200"
                  >
                    + Nuevo Préstamo
                  </Link>
                </li>

                {/* (Opcional) gestionar tareas */}
                <li>
                  <Link
                    to="/tasks"
                    className="bg-sky-500 text-white font-semibold px-3 py-1.5 rounded-full shadow-sm hover:bg-sky-600 transition-colors duration-200"
                  >
                    Tareas
                  </Link>
                </li>
              </>
            )}

            {/* 🟢 SOLO ESTUDIANTE */}
            {user.role === "student" && (
              <li>
                <Link
                  to="/tasks"
                  className="bg-sky-500 text-white font-semibold px-3 py-1.5 rounded-full shadow-sm hover:bg-sky-600 transition-colors duration-200"
                >
                  Mis Tareas
                </Link>
              </li>
            )}

            {/* Logout */}
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-400 text-white font-semibold px-3 py-1.5 rounded-full shadow-sm hover:bg-red-500 transition-colors duration-200"
              >
                Cerrar Sesión
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

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
    <nav className="bg-amber-700 shadow-md backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-amber-50 font-extrabold text-xl tracking-wide"
        >
          📚 <span>Biblioteca Escolar</span>
        </Link>

        {!user && <div></div>}

        {user && (
          <ul className="flex gap-3 items-center">
            {/* Inicio */}
            <li>
              <Link
                to="/"
                className="bg-amber-50 text-amber-800 font-semibold px-3 py-1.5 rounded-full shadow-sm hover:bg-amber-100 transition-colors duration-200"
              >
                Inicio
              </Link>
            </li>

            {/* 🔶 Opciones del BIBLIOTECARIO */}
            {user.role === "librarian" && (
              <>
                {/* Vista libros */}
                <li>
                  <Link
                    to="/tasks"
                    className="bg-amber-600 text-amber-50 font-semibold px-3 py-1.5 rounded-full shadow-sm hover:bg-amber-500 transition-colors duration-200"
                  >
                    Libros
                  </Link>
                </li>

                {/* Nuevo libro */}
                <li>
                  <Link
                    to="/tasks/new"
                    className="bg-emerald-600 text-white font-semibold px-3 py-1.5 rounded-full shadow-sm hover:bg-emerald-500 transition-colors duration-200"
                  >
                    + Nuevo libro
                  </Link>
                </li>

                {/* Préstamos */}
                <li>
                  <Link
                    to="/loans"
                    className="bg-stone-700 text-stone-50 font-semibold px-3 py-1.5 rounded-full shadow-sm hover:bg-stone-600 transition-colors duration-200"
                  >
                    Préstamos
                  </Link>
                </li>
              </>
            )}

            {/* 🔸 Opciones del ALUMNO */}
            {user.role === "student" && (
              <li>
                <Link
                  to="/tasks"
                  className="bg-amber-600 text-amber-50 font-semibold px-3 py-1.5 rounded-full shadow-sm hover:bg-amber-500 transition-colors duration-200"
                >
                  Libros
                </Link>
              </li>
            )}

            {/* Logout */}
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white font-semibold px-3 py-1.5 rounded-full shadow-sm hover:bg-red-600 transition-colors duration-200"
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

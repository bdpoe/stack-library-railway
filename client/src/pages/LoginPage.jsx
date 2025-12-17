import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  // ✅ FALTABA ESTO
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await login(form);

      // 🔁 Redirección según rol
      if (user.role === "librarian") {
        navigate("/dashboard");
      } else {
        navigate("/books");
      }
    } catch {
      // error ya manejado en AuthContext
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4e8d1] dark:bg-slate-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-700 rounded-2xl shadow-xl p-8">
        {/* Título */}
        <h1 className="text-3xl font-bold text-center mb-2 text-amber-800 dark:text-amber-400">
          Biblioteca Escolar
        </h1>

        <p className="text-center text-slate-500 dark:text-slate-300 mb-6">
          Inicia sesión para continuar
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Usuario */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Usuario"
            inputMode="text"
            autoComplete="username"
            className="
              w-full px-4 py-2 rounded-lg border
              bg-white dark:bg-slate-800
              text-slate-900 dark:text-white
              placeholder-slate-400 dark:placeholder-slate-400
              border-slate-300 dark:border-slate-600
              focus:outline-none focus:ring-2 focus:ring-amber-500
            "
          />

          {/* Contraseña */}
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Contraseña"
            autoComplete="current-password"
            className="
              w-full px-4 py-2 rounded-lg border
              bg-white dark:bg-slate-800
              text-slate-900 dark:text-white
              placeholder-slate-400 dark:placeholder-slate-400
              border-slate-300 dark:border-slate-600
              focus:outline-none focus:ring-2 focus:ring-amber-500
            "
          />

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">
              Usuario o contraseña incorrectos
            </p>
          )}

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-2 rounded-lg font-semibold text-white
              bg-amber-700 hover:bg-amber-800
              disabled:opacity-50 disabled:cursor-not-allowed
              transition
            "
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-xs text-center text-slate-400">
          © 2025 Biblioteca Escolar
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

import { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};

// ⏱️ 5 minutos de inactividad
const IDLE_TIME = 5 * 60 * 1000;

// 🌐 API
const API = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // 🔄 Recuperar sesión al recargar
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const idleTimer = useRef(null);

  /* ===========================
     LOGIN
  =========================== */
  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${API}/login`, credentials);

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      resetIdleTimer();
      return res.data;

    } catch (err) {
      console.error("❌ Error en login frontend:", err);
      setError(err.response?.data?.message || "Error al iniciar sesión");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /* ===========================
     LOGOUT
  =========================== */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    clearTimeout(idleTimer.current);
  };

  /* ===========================
     CONTROL DE INACTIVIDAD
  =========================== */
  const resetIdleTimer = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);

    idleTimer.current = setTimeout(() => {
      console.warn("⏳ Sesión cerrada por inactividad");
      logout();
    }, IDLE_TIME);
  };

  /* ===========================
     ESCUCHAR ACTIVIDAD
  =========================== */
  useEffect(() => {
    if (!user) return;

    const events = ["mousemove", "keydown", "click", "scroll"];

    events.forEach((event) =>
      window.addEventListener(event, resetIdleTimer)
    );

    resetIdleTimer();

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, resetIdleTimer)
      );
      clearTimeout(idleTimer.current);
    };
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

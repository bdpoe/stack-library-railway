import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const API = import.meta.env.VITE_API_URL;

  const login = async (name, password) => {
    const res = await axios.post(`${API}/login`, {
      name,     // 👈 CORRECTO: ahora coinciden frontend + backend + MySQL
      password,
    });
    setUser(res.data);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

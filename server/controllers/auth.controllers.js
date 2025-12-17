import  pool  from "../db.js";

export const login = async (req, res) => {
  const { name, password } = req.body;  // "name" viene del frontend

  try {
    const [rows] = await pool.query(
      "SELECT id, name, role FROM users WHERE name = ? AND password = ?",
      [name, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

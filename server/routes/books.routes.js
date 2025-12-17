import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/books", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, title FROM tasks ORDER BY title ASC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error obteniendo libros:", err);
    res.status(500).json({ message: "Error al obtener libros" });
  }
});

export default router;

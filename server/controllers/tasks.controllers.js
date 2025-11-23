import { pool } from "../db.js";

// GET ALL TASKS
export const getTasks = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tasks ORDER BY created_at ASC");
    res.json(rows);
  } catch (error) {
    console.error("Error getTasks:", error);
    res.status(500).json({ message: "Error al obtener tareas" });
  }
};

// GET ONE TASK
export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);

    if (rows.length === 0)
      return res.status(404).json({ message: "Tarea no encontrada" });

    res.json(rows[0]);
  } catch (error) {
    console.error("Error getTask:", error);
    res.status(500).json({ message: "Error al obtener tarea" });
  }
};

// CREATE TASK
export const createTasks = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title?.trim() || !description?.trim()) {
      return res.status(400).json({ message: "Título y descripción requeridos" });
    }

    const cleanTitle = title.trim();
    const cleanDescription = description.trim();

    const [result] = await pool.query(
      "INSERT INTO tasks (title, description) VALUES (?, ?)",
      [cleanTitle, cleanDescription]
    );

    res.json({
      id: result.insertId,
      title: cleanTitle,
      description: cleanDescription,
    });
  } catch (error) {
    console.error("Error createTasks:", error);
    res.status(500).json({ message: "Error al crear tarea" });
  }
};

// UPDATE TASK
export const updateTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("UPDATE tasks SET ? WHERE id = ?", [
      req.body,
      id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Tarea no encontrada" });

    res.json({ message: "Actualizada correctamente" });
  } catch (error) {
    console.error("Error updateTasks:", error);
    res.status(500).json({ message: "Error al actualizar tarea" });
  }
};

// DELETE TASK
export const deleteTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Tarea no encontrada" });

    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleteTasks:", error);
    res.status(500).json({ message: "Error al eliminar tarea" });
  }
};

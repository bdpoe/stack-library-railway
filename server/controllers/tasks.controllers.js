import pool from "../db.js";
import cloudinary from "../cloudinary.js";

/* ===========================
   OBTENER TODOS LOS LIBROS
=========================== */
export const getTasks = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM tasks ORDER BY id DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener libros" });
  }
};

/* ===========================
   OBTENER UN LIBRO
=========================== */
export const getTask = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM tasks WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener libro" });
  }
};

/* ===========================
   CREAR LIBRO (ID MANUAL)
=========================== */
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    let imageUrl = null;

    // 🔢 Generar ID manual
    const [rows] = await pool.query(
      "SELECT MAX(id) AS maxId FROM tasks"
    );
    const nextId = (rows[0].maxId || 0) + 1;

    // ☁️ Subir imagen SOLO si existe y Cloudinary está configurado
    if (
      req.file &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_CLOUD_NAME
    ) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        { folder: "biblioteca" }
      );
      imageUrl = result.secure_url;
    }

    await pool.query(
      "INSERT INTO tasks (id, title, description, image, done) VALUES (?, ?, ?, ?, ?)",
      [nextId, title, description, imageUrl, 0]
    );

    res.json({
      id: nextId,
      title,
      description,
      image: imageUrl,
      done: 0,
    });
  } catch (error) {
    console.error("❌ Error creando libro:", error);
    res.status(500).json({ message: "Error al crear libro" });
  }
};

/* ===========================
   ACTUALIZAR LIBRO
=========================== */
export const updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    let imageUrl = null;

    if (
      req.file &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_CLOUD_NAME
    ) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        { folder: "biblioteca" }
      );
      imageUrl = result.secure_url;
    }

    const fields = { title, description };
    if (imageUrl) fields.image = imageUrl;

    await pool.query(
      "UPDATE tasks SET ? WHERE id = ?",
      [fields, req.params.id]
    );

    const [rows] = await pool.query(
      "SELECT * FROM tasks WHERE id = ?",
      [req.params.id]
    );

    res.json(rows[0]);
  } catch (error) {
    console.error("❌ Error actualizando libro:", error);
    res.status(500).json({ message: "Error al actualizar libro" });
  }
};

/* ===========================
   ELIMINAR LIBRO
=========================== */
export const deleteTask = async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM tasks WHERE id = ?",
      [req.params.id]
    );
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar libro" });
  }
};

/* ===========================
   TOGGLE PRESTADO / DISPONIBLE
=========================== */
export const toggleTask = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT done FROM tasks WHERE id = ?",
      [req.params.id]
    );

    const newValue = rows[0].done === 1 ? 0 : 1;

    await pool.query(
      "UPDATE tasks SET done = ? WHERE id = ?",
      [newValue, req.params.id]
    );

    const [updated] = await pool.query(
      "SELECT * FROM tasks WHERE id = ?",
      [req.params.id]
    );

    res.json(updated[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al cambiar estado" });
  }
};

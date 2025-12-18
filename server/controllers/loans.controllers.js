import pool from "../db.js";

// ============================
// OBTENER TODOS LOS PRÉSTAMOS
// ============================
export const getLoans = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM loans ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener préstamos" });
  }
};

// ============================
// OBTENER UN PRÉSTAMO
// ============================
export const getLoan = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM loans WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Préstamo no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener préstamo" });
  }
};

// ============================
// CREAR PRÉSTAMO (ID MANUAL)
// ============================
export const createLoan = async (req, res) => {
  try {
    const { bookTitle, studentName, startDate, endDate } = req.body;

    // 🔢 Generar ID manual
    const [rows] = await pool.query(
      "SELECT MAX(id) AS maxId FROM loans"
    );
    const nextId = (rows[0].maxId || 0) + 1;

    await pool.query(
      `INSERT INTO loans 
        (id, bookTitle, studentName, startDate, endDate, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        nextId,
        bookTitle,
        studentName,
        startDate,
        endDate,
        "activo",
      ]
    );

    res.json({
      id: nextId,
      bookTitle,
      studentName,
      startDate,
      endDate,
      status: "activo",
    });

  } catch (error) {
    console.error("❌ Error creando préstamo:", error);
    res.status(500).json({ message: "Error al crear préstamo" });
  }
};

// ============================
// MARCAR COMO DEVUELTO
// ============================
export const returnLoan = async (req, res) => {
  try {
    await pool.query(
      "UPDATE loans SET status = 'devuelto' WHERE id = ?",
      [req.params.id]
    );

    const [rows] = await pool.query(
      "SELECT * FROM loans WHERE id = ?",
      [req.params.id]
    );

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al devolver préstamo" });
  }
};

// ============================
// ACTUALIZAR PRÉSTAMO
// ============================
export const updateLoan = async (req, res) => {
  try {
    await pool.query(
      "UPDATE loans SET ? WHERE id = ?",
      [req.body, req.params.id]
    );

    const [rows] = await pool.query(
      "SELECT * FROM loans WHERE id = ?",
      [req.params.id]
    );

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar préstamo" });
  }
};

// ============================
// ELIMINAR PRÉSTAMO
// ============================
export const deleteLoan = async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM loans WHERE id = ?",
      [req.params.id]
    );
    res.json({ message: "Préstamo eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar préstamo" });
  }
};

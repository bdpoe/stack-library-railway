import { pool } from "../db.js";

// GET ALL LOANS
export const getLoans = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM loans ORDER BY created_at DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener préstamos" });
  }
};

// GET ONE LOAN
export const getLoan = async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query("SELECT * FROM loans WHERE id = ?", [id]);
  if (rows.length === 0)
    return res.status(404).json({ message: "Préstamo no encontrado" });

  res.json(rows[0]);
};

// CREATE LOAN
export const createLoan = async (req, res) => {
  const { bookTitle, studentName, startDate, endDate } = req.body;

  const [result] = await pool.query(
    "INSERT INTO loans (bookTitle, studentName, startDate, endDate, status) VALUES (?, ?, ?, ?, ?)",
    [bookTitle, studentName, startDate, endDate, "activo"]
  );

  res.json({
    id: result.insertId,
    bookTitle,
    studentName,
    startDate,
    endDate,
    status: "activo",
  });
};

// UPDATE LOAN
export const updateLoan = async (req, res) => {
  const { id } = req.params;

  await pool.query("UPDATE loans SET ? WHERE id = ?", [req.body, id]);

  const [rows] = await pool.query("SELECT * FROM loans WHERE id = ?", [id]);
  res.json(rows[0]);
};

// MARK RETURNED
export const returnLoan = async (req, res) => {
  const { id } = req.params;

  await pool.query("UPDATE loans SET status = 'devuelto' WHERE id = ?", [id]);

  const [rows] = await pool.query("SELECT * FROM loans WHERE id = ?", [id]);
  res.json(rows[0]);
};

// DELETE LOAN
export const deleteLoan = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM loans WHERE id = ?", [id]);
  res.json({ message: "Préstamo eliminado" });
};

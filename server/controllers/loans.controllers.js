import { pool } from "../db.js";

// GET ALL LOANS
export const getLoans = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM loans ORDER BY created_at DESC");
    res.json(rows);
  } catch (error) {
    console.error("Error getLoans:", error);
    res.status(500).json({ message: "Error al obtener préstamos" });
  }
};

// GET ONE LOAN
export const getLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM loans WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Préstamo no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error getLoan:", error);
    res.status(500).json({ message: "Error al obtener préstamo" });
  }
};

// CREATE LOAN
export const createLoan = async (req, res) => {
  try {
    const { student, book, date_loan, date_return } = req.body;

    if (!student || !book || !date_loan) {
      return res.status(400).json({
        message: "student, book y date_loan son obligatorios",
      });
    }

    const [result] = await pool.query(
      "INSERT INTO loans (student, book, date_loan, date_return) VALUES (?, ?, ?, ?)",
      [student, book, date_loan, date_return]
    );

    res.json({
      id: result.insertId,
      student,
      book,
      date_loan,
      date_return,
      returned: false,
    });
  } catch (error) {
    console.error("Error createLoan:", error);
    res.status(500).json({ message: "Error al crear préstamo" });
  }
};

// UPDATE LOAN
export const updateLoan = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("UPDATE loans SET ? WHERE id = ?", [
      req.body,
      id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Préstamo no encontrado" });

    const [rows] = await pool.query("SELECT * FROM loans WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (error) {
    console.error("Error updateLoan:", error);
    res.status(500).json({ message: "Error al actualizar préstamo" });
  }
};

// MARK AS RETURNED
export const returnLoan = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "UPDATE loans SET returned = TRUE WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Préstamo no encontrado" });

    const [rows] = await pool.query("SELECT * FROM loans WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (error) {
    console.error("Error returnLoan:", error);
    res.status(500).json({ message: "Error al marcar como devuelto" });
  }
};

// DELETE LOAN
export const deleteLoan = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM loans WHERE id = ?", [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Préstamo no encontrado" });

    res.json({ message: "Préstamo eliminado" });
  } catch (error) {
    console.error("Error deleteLoan:", error);
    res.status(500).json({ message: "Error al eliminar préstamo" });
  }
};

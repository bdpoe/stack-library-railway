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
// CREAR PRÉSTAMO
// + MARCAR LIBRO COMO PRESTADO
// ============================
export const createLoan = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const { bookTitle, studentName, startDate, endDate } = req.body;

    // 🔐 Transacción
    await connection.beginTransaction();

    // 🔢 Generar ID manual
    const [rows] = await connection.query(
      "SELECT MAX(id) AS maxId FROM loans"
    );
    const nextId = (rows[0].maxId || 0) + 1;

    // 1️⃣ Insertar préstamo
    await connection.query(
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

    // 2️⃣ Marcar libro como PRESTADO
    await connection.query(
      "UPDATE tasks SET done = 1 WHERE title = ?",
      [bookTitle]
    );

    // ✅ Confirmar
    await connection.commit();

    res.json({
      id: nextId,
      bookTitle,
      studentName,
      startDate,
      endDate,
      status: "activo",
    });

  } catch (error) {
    await connection.rollback();
    console.error("❌ Error creando préstamo:", error);
    res.status(500).json({ message: "Error al crear préstamo" });
  } finally {
    connection.release();
  }
};

// ============================
// MARCAR PRÉSTAMO COMO DEVUELTO
// + MARCAR LIBRO DISPONIBLE
// ============================
export const returnLoan = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // 1️⃣ Obtener préstamo
    const [rows] = await connection.query(
      "SELECT * FROM loans WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: "Préstamo no encontrado" });
    }

    const loan = rows[0];

    // 2️⃣ Marcar préstamo como devuelto
    await connection.query(
      "UPDATE loans SET status = 'devuelto' WHERE id = ?",
      [req.params.id]
    );

    // 3️⃣ Marcar libro como DISPONIBLE
    await connection.query(
      "UPDATE tasks SET done = 0 WHERE title = ?",
      [loan.bookTitle]
    );

    await connection.commit();

    const [updated] = await connection.query(
      "SELECT * FROM loans WHERE id = ?",
      [req.params.id]
    );

    res.json(updated[0]);

  } catch (error) {
    await connection.rollback();
    console.error("❌ Error devolviendo préstamo:", error);
    res.status(500).json({ message: "Error al devolver préstamo" });
  } finally {
    connection.release();
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

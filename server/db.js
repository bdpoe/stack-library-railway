import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Detecta si estamos en Railway (producción)
const isRailway = !!process.env.RAILWAY_ENVIRONMENT;

// Creamos el pool de conexiones
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  port: Number(process.env.MYSQLPORT),
  database: process.env.MYSQLDATABASE,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  // SSL solo en Railway
  ssl: isRailway
    ? { rejectUnauthorized: false }
    : false,
});

// Test de conexión (no bloqueante)
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log(
      `🔗 MySQL conectado correctamente (${isRailway ? "Railway" : "Local"})`
    );
    connection.release();
  } catch (error) {
    console.error("❌ Error al conectar a MySQL:", error.message);
  }
})();

export default pool;

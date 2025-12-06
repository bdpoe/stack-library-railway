import mysql from "mysql2/promise";
import { config } from "dotenv";
config();

let pool;

try {
  pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    port: process.env.MYSQLPORT,
    database: process.env.MYSQLDATABASE,
    ssl: { rejectUnauthorized: false }
  });

  console.log("🔗 Conectado a MySQL en Railway");
} catch (err) {
  console.error("❌ Error al conectar a MySQL", err);
}

export { pool };

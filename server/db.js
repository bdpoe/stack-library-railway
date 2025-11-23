import mysql from "mysql2/promise";
import { config } from "dotenv";
config();

let pool;

// --- Si Railway proporciona DATABASE_URL (producción) ---
if (process.env.DATABASE_URL) {
  pool = mysql.createPool({
    uri: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // Railway requiere esto
    },
  });
  console.log("🔗 Conectado a MySQL en Railway (SSL activado)");
}

// --- Caso contrario, usar variables locales ---
else {
  pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "railway",
    port: process.env.DB_PORT || 3306,
  });

  console.log("🖥 Conectado a MySQL local");
}

export { pool };

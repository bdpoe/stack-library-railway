import mysql from "mysql2/promise";
import { config } from "dotenv";
config();

let pool;

// --- Producción: Railway ---
if (process.env.DB_HOST) {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 3306, // Railway siempre usa 3306 internamente
  });

  console.log("🔗 Conectado a MySQL en Railway");
}

// --- Desarrollo local ---
else {
  pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "railway",
    port: 3306,
  });

  console.log("🖥 Conectado a MySQL local");
}

export { pool };

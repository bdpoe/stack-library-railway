import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

import indexRoutes from "./routes/index.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import loansRoutes from "./routes/loans.routes.js";
import authRoutes from "./routes/auth.routes.js";
import booksRoutes from "./routes/books.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas
app.use("/api", indexRoutes);
app.use("/api", taskRoutes);
app.use("/api", loansRoutes);
app.use("/api", authRoutes);
app.use("/api", booksRoutes);

// ⛔ NO iniciar servidor en test
let server = null;

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 8080;
  server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

export default app;
export { server };

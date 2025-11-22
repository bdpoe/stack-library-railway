import express from "express";
import cors from "cors";
import { PORT } from "./config.js"; // ❌ SI ESTO ROMPE EN RAILWAY, MEJOR:

// ✅ más seguro para Railway:
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// tus rutas:
import indexRoutes from "./routes/index.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import authRoutes from "./routes/auth.routes.js";
import loansRoutes from "./routes/loans.routes.js";

app.use(loansRoutes);
app.use(indexRoutes);
app.use(taskRoutes);
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

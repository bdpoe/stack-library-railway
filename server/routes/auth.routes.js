import { Router } from "express";
import { login } from "../controllers/auth.controllers.js";

const router = Router();

// POST /api/login
router.post("/login", login);

export default router;

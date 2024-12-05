import { Router } from "express";
import { forgotPassword, login, signup } from "../controllers/authController";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/forgotPassword", forgotPassword);

export default router;

import { Router } from "express";
import {
  forgotPassword,
  login,
  resetPassword,
  signup,
} from "../controllers/authController";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

export default router;

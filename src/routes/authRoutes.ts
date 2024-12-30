import { Router } from "express";
import {
  forgotPassword,
  login,
  logout,
  refresh,
  resetPassword,
  signup,
} from "../controllers/authController";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.post("/signup", signup);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

export default router;

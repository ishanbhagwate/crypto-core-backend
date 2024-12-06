import { Router } from "express";
import { getLatestNews, getNewsById } from "../controllers/newsController";

const router = Router();

router.get("/", getLatestNews);

router.get("/:id", getNewsById);

export default router;

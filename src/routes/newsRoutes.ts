import { Router } from "express";
import { getLatestNews, getNewsById } from "../controllers/newsController";

const router = Router();

router.get("/news", getLatestNews);

router.get("/news:id", getNewsById);

export default router;

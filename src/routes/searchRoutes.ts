import { Router } from "express";
import { searchCoins } from "../controllers/searchController";

const router = Router();

router.get("/", searchCoins);

export default router;

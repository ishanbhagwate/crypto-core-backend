import { Router } from "express";
import {
  getAllCoins,
  getCoinDetails,
  getOverview,
} from "../controllers/marketController";

const router = Router();

router.get("/coins", getAllCoins);

router.get("/coins/:id", getCoinDetails);

router.get("/overview", getOverview);

export default router;

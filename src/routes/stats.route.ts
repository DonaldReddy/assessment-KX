import { Router } from "express";
import { getDeviation, getStats } from "../controllers/stats.controller";

const router = Router();

router.get("/stats", getStats);

router.get("/deviation", getDeviation);

export default router;

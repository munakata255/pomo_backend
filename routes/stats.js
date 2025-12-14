import express from "express";
import { getStats,getTaskSummary,getTodayStats } from "../controllers/statsController.js";

const router = express.Router();

router.get("/", getStats);

router.get("/task-summary", getTaskSummary);

router.get("/today", getTodayStats);
export default router;

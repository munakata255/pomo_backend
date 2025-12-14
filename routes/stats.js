import express from "express";
import { getStats,getTaskSummary,getTodayStats,getStatsByDate } from "../controllers/statsController.js";

const router = express.Router();

router.get("/", getStats);

router.get("/task-summary", getTaskSummary);

router.get("/today", getTodayStats);

router.get("/byDate", getStatsByDate);

export default router;

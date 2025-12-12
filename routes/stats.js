import express from "express";
import { getStats,getTaskSummary } from "../controllers/statsController.js";

const router = express.Router();

router.get("/", getStats);

router.get("/task-summary", getTaskSummary);

export default router;

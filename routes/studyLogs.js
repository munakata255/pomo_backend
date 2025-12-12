import express from "express";
import { createStudyLog, getStudyLogs } from "../controllers/studyLogsController.js";

const router = express.Router();

router.post("/", createStudyLog);
router.get("/", getStudyLogs);

export default router;

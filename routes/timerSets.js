import express from "express";
import { getTimerSets, createTimerSet, deleteTimerSet } from "../controllers/timerSetsController.js";

const router = express.Router();

router.get("/", getTimerSets);
router.post("/", createTimerSet);
router.delete("/:id", deleteTimerSet);

export default router;

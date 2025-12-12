// routes/tasks.js
import express from "express";
import { getTasks, createTask, deleteTask,updateTask } from "../controllers/tasksController.js";

const router = express.Router();

// GET /tasks → タスク一覧取得
router.get("/", getTasks);

// POST /tasks → タスク作成
router.post("/", createTask);

// DELETE /tasks/:id → タスク削除
router.delete("/:id", deleteTask);

router.put("/:id", updateTask);


export default router;

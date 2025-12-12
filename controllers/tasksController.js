// controllers/tasksController.js
import Task from "../models/Task.js";

// タスク一覧取得
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.query.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// タスク作成
export const createTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// タスク削除
export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    res.json({ deletedId: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
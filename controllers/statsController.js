import StudyLog from "../models/StudyLog.js";
import Task from "../models/Task.js";

export const getStats = async (req, res) => {
  try {
    const { userId, period } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    let dateFilter = {};

    // 今日の集計（次に week/month を追加できる）
    if (period === "today") {
      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      dateFilter = { startedAt: { $gte: start, $lte: end } };
    }

    // ログ取得
    const logs = await StudyLog.find({
      userId,
      ...dateFilter
    });

    // 合計時間
    const totalSeconds = logs.reduce((sum, log) => sum + log.durationSeconds, 0);

    // タスク別集計
    const taskMap = {};

    logs.forEach(log => {
      if (!taskMap[log.taskId]) {
        taskMap[log.taskId] = 0;
      }
      taskMap[log.taskId] += log.durationSeconds;
    });

    const taskSummary = Object.keys(taskMap).map(taskId => ({
      taskId,
      seconds: taskMap[taskId]
    }));

    res.json({
      totalSeconds,
      logCount: logs.length,
      taskSummary
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ★ タスク別統計（全期間）
export const getTaskSummary = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    // 全 StudyLog を取得
    const logs = await StudyLog.find({ userId });

    // taskId ごとに集計
    const taskMap = {};

    logs.forEach(log => {
      if (!taskMap[log.taskId]) taskMap[log.taskId] = 0;
      taskMap[log.taskId] += log.durationSeconds;
    });

    // フロントが使いやすい形に変換
    const summary = Object.entries(taskMap).map(([taskId, seconds]) => ({
      taskId,
      seconds,
    }));

    res.json(summary);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getTodayStats = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: "userId is required" });

    // 今日の範囲
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    // 今日のログだけ取得
    const logs = await StudyLog.find({
      userId,
      startedAt: { $gte: start, $lte: end }
    });

    // 合計秒数
    const totalSeconds = logs.reduce((sum, log) => sum + log.durationSeconds, 0);

    // タスク別の集計
    const taskMap = {};

    logs.forEach((log) => {
      if (!taskMap[log.taskId]) {
        taskMap[log.taskId] = 0;
      }
      taskMap[log.taskId] += log.durationSeconds;
    });

    // taskId を taskName に変換
    const taskSummary = [];

    for (const taskId of Object.keys(taskMap)) {
      const task = await Task.findById(taskId);
      taskSummary.push({
        taskId,
        taskName: task ? task.name : "不明なタスク",
        seconds: taskMap[taskId],
      });
    }

    res.json({
      totalSeconds,
      taskSummary,
      logCount: logs.length,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// /stats/byDate?userId=xxx&date=2025-07-17
export const getStatsByDate = async (req, res) => {
  try {
    const { userId, date } = req.query;

    if (!userId || !date) {
      return res.status(400).json({ error: "userId と date が必要です" });
    }

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const logs = await StudyLog.find({
      userId,
      startedAt: { $gte: start, $lte: end }
    });

    const totalSeconds = logs.reduce((sum, log) => sum + log.durationSeconds, 0);

    const taskMap = {};
    logs.forEach(log => {
      taskMap[log.taskId] = (taskMap[log.taskId] || 0) + log.durationSeconds;
    });

    res.json({
      totalSeconds,
      taskSummary: Object.entries(taskMap).map(([taskId, seconds]) => ({
        taskId,
        seconds
      }))
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

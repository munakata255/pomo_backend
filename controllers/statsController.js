import StudyLog from "../models/StudyLog.js";

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

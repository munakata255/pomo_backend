import StudyLog from "../models/StudyLog.js";

export const createStudyLog = async (req, res) => {
  try {
    const newLog = await StudyLog.create(req.body);
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudyLogs = async (req, res) => {
  try {
    const logs = await StudyLog.find({ userId: req.query.userId });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

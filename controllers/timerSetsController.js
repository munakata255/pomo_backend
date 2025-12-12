import TimerSet from "../models/TimerSet.js";

export const getTimerSets = async (req, res) => {
  try {
    const sets = await TimerSet.find({ userId: req.query.userId });
    res.json(sets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTimerSet = async (req, res) => {
  try {
    const newSet = await TimerSet.create(req.body);
    res.status(201).json(newSet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTimerSet = async (req, res) => {
  try {
    await TimerSet.findByIdAndDelete(req.params.id);
    res.json({ deletedId: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

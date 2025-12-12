import mongoose from "mongoose";

const timerSetSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  workDuration: { type: Number, required: true },    // 分 or 秒
  breakDuration: { type: Number, required: true },
  longBreakDuration: { type: Number },
  cycles: { type: Number, default: 1 },
});

export default mongoose.model("TimerSet", timerSetSchema);

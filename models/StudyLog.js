import mongoose from "mongoose";

const studyLogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  taskId: { type: String, required: true },
  timerSetId: { type: String },
  startedAt: { type: Date, required: true },
  finishedAt: { type: Date, required: true },
  durationSeconds: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["completed", "interrupted"], 
    default: "completed" 
  },
});

export default mongoose.model("StudyLog", studyLogSchema);

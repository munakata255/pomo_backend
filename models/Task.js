import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  color: { type: String },
  isActive: { type: Boolean, default: true },
});

export default mongoose.model("Task", taskSchema);

// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/tasks.js";
import timerSetRoutes from "./routes/timerSets.js";
import studyLogRoutes from "./routes/studyLogs.js";
import statsRoutes from "./routes/stats.js";
dotenv.config();        // .env を読み込む
connectDB();            // MongoDB 接続

const app = express();

console.log("process.env.PORT =", process.env.PORT);

// ミドルウェア
app.use(cors());
app.use(express.json());
app.use("/tasks", taskRoutes);
app.use("/timerSets", timerSetRoutes);
app.use("/studyLogs", studyLogRoutes);
app.use("/stats", statsRoutes);

// テスト用ルート（まずはこれだけでOK）
app.get("/", (req, res) => {
  res.send("Backend API is running!");
});

// ポートで起動
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


---

# 📘 pomo_backend（バックエンド用 README）

```md
# 🍅 Pomo Backend

ポモドーロ・タイマーWebアプリのバックエンドAPIです。  
タスク管理・タイマー設定・学習ログ・統計データを提供します。

## 🔗 API URL
https://pomo-backend-j07c.onrender.com

## 🛠 技術スタック
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Firebase Admin SDK
- Render

## ✨ 主な機能
- タスク管理API
- タイマーセット管理API
- 学習ログ記録API
- 学習統計API
- Firebase Authentication によるユーザー識別

## 📂 API エンドポイント例

| メソッド | パス | 内容 |
|---|---|---|
| GET | /tasks | タスク一覧取得 |
| POST | /tasks | タスク作成 |
| GET | /timerSets | タイマーセット取得 |
| GET | /studyLogs | 学習ログ取得 |
| GET | /stats | 学習統計取得 |

## 🧑‍💻 ローカル起動方法

```bash
git clone https://github.com/munakata255/pomo_backend.git
cd pomo_backend
npm install
npm run dev

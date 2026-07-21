const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const boardRoutes = require("./routes/boardRoutes");

const authRoutes = require("./routes/authRoutes");

const commentRoutes = require("./routes/commentRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");

const notificationRoutes=require("./routes/notificationRoutes");

const profileRoutes = require("./routes/profileRoutes");

const attachmentRoutes=require("./routes/attachmentRoutes");

const activityRoutes=require("./routes/activityRoutes");

const teamRoutes=require("./routes/teamRoutes");

const settingsRoutes = require("./routes/settingsRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes)
app.use("/api/profile", profileRoutes);
app.use("/api/attachments", attachmentRoutes);
app.use("/uploads",express.static("uploads"));
app.use("/api/activities", activityRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/settings", settingsRoutes);

app.get("/", (req, res) => {
    res.send("TaskFlow API Running");
});

module.exports = app;
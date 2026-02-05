const express = require("express")

const app = express();

app.use(express.json())

const authRoutes = require("../routes/auth.routes");
app.use("/api/auth",authRoutes);
const taskRoutes = require("../routes/task.routes")
app.use("/api",taskRoutes);

module.exports = app;
const express = require("express")
const morganMiddleware = require("../middleware/morgan.middleware");

const app = express();

app.use(express.json())

app.use(morganMiddleware);

const authRoutes = require("../routes/auth.routes");
app.use("/api/auth",authRoutes);
const taskRoutes = require("../routes/task.routes")
app.use("/api",taskRoutes);

module.exports = app;
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morganMiddleware = require("../middleware/morgan.middleware");
const { swaggerUi, specs } = require("../utils/swagger");

const app = express();

app.use(helmet());

app.use(express.json());

app.use(morganMiddleware);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Try again after 15 minutes.",
  },
});

const authRoutes = require("../routes/auth.routes");
app.use("/api/auth", authLimiter, authRoutes);

const taskRoutes = require("../routes/task.routes");
app.use("/api", taskRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;

// routes/taskRoutes.js
const express = require("express");
const router = express.Router();

const { getTasks } = require("../controllers/task.controller");
const auth = require("../middleware/auth.middleware");

router.get("/tasks", auth, getTasks);

module.exports = router;

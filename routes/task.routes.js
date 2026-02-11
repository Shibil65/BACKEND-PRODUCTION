const express = require("express");
const router = express.Router();
const { getTasks,createTask } = require("../controllers/task.controller");
const auth = require("../middleware/auth.middleware");

router.use(auth);

router.get("/tasks", auth,getTasks);
router.post("/tasks", auth,createTask);

module.exports = router;

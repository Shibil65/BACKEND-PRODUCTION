const express = require("express")
const protect = require("../middleware/auth.middleware")
const { getTasks } =  require("../controllers/task.Controller");

const router = express.Router();

router.get("/tasks", getTasks);

module.exports = router;
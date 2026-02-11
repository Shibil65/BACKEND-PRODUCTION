
const express = require("express");
const router = express.Router();
const { getTasks,createTask } = require("../controllers/task.controller");
const auth = require("../middleware/auth.middleware");

router.use(auth);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks (Protected)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 *       401:
 *         description: Unauthorized
 */



router.get("/tasks", auth,getTasks);
router.post("/tasks", auth,createTask);

module.exports = router;

const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getDashboardData, getUserDashboardData, getTasks, getTasksById, createTask, updateTask, deleteTask, updateTaskStatus, updateTaskChecklist } = require("../controllers/taskControllers");

const router = express.Router();

// Task Management Routes
router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);

router.get("/",protect, getTasks); // Get all tasks (Admin: All , Users: Assigned)
router.get("/:id",protect, getTasksById); // Get Task By Id

router.post("/",protect, adminOnly, createTask); // Create a Task (Admin Only)
router.put("/:id",protect, updateTask); // update task details
router.delete("/:id",protect,adminOnly,deleteTask); // Delete a Task (Admin Only)

router.put("/:id/status",protect, updateTaskStatus); // Update Task Status
router.put("/:id/todo",protect, updateTaskChecklist); // Update Task Checklist

module.exports = router;
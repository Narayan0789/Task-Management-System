const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  createTask,
  getTasks,
  getMyTasks,
  updateTask,
  deleteTask,
  getAdminStats
} = require("../controllers/taskController");

// ================= ADMIN STATS =================
router.get("/admin/stats", protect, authorize("admin"), getAdminStats);

// ================= CREATE TASK =================
router.post("/", protect, authorize("admin"), createTask);

// ================= GET ALL TASKS (Admin) =================
router.get("/", protect, authorize("admin"), getTasks);

// ================= GET MY TASKS (Employee) =================
router.get("/my", protect, authorize("employee"), getMyTasks);

// ================= UPDATE TASK =================
router.put("/:id", protect, updateTask);

// ================= DELETE TASK =================
router.delete("/:id", protect, authorize("admin"), deleteTask);

module.exports = router;
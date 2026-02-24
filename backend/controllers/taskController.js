const Task = require("../models/Task");

/* ===============================
   CREATE TASK (Admin Only)
================================= */
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      deadline: req.body.deadline,
      assignedTo: req.body.assignedTo,
      createdBy: req.user.id
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

/* ===============================
   GET ALL TASKS (Admin)
================================= */
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

/* ===============================
   GET MY TASKS (Employee)
================================= */
const mongoose = require("mongoose");

exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: new mongoose.Types.ObjectId(req.user.id)
    }).populate("assignedTo", "name email");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching your tasks" });
  }
};

/* ===============================
   UPDATE TASK
================================= */
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Employees can only update status
    if (req.user.role === "employee") {
      task.status = req.body.status || task.status;
    } else {
      // Admin can update everything
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.priority = req.body.priority || task.priority;
      task.deadline = req.body.deadline || task.deadline;
      task.assignedTo = req.body.assignedTo || task.assignedTo;
      task.status = req.body.status || task.status;
    }

    const updatedTask = await task.save();
    res.json(updatedTask);

  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

/* ===============================
   DELETE TASK (Admin Only)
================================= */
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};

/* ===============================
   ADMIN DASHBOARD STATS
================================= */
exports.getAdminStats = async (req, res) => {
  try {
    const Task = require("../models/Task");
    const User = require("../models/User");

    const totalTasks = await Task.countDocuments();
    const completed = await Task.countDocuments({ status: "Completed" });
    const pending = await Task.countDocuments({ status: "Pending" });
    const totalUsers = await User.countDocuments({ role: "employee" });

    res.json({
      totalTasks,
      completed,
      pending,
      totalUsers
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
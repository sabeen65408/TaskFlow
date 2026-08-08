const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createTask,
    getAllTasks,
    getTasksByProject,
    getTask,
    updateTask,
    deleteTask,
    moveTask,
} = require("../controllers/taskController");

// =====================================
// All Tasks
// =====================================

router.route("/")
    .get(protect, getAllTasks)
    .post(protect, createTask);

// =====================================
// Tasks by Project (THIS WAS MISSING)
// =====================================

router.get(
    "/project/:projectId",
    protect,
    getTasksByProject
);

// =====================================
// Single Task
// =====================================

router.route("/:id")
    .get(protect, getTask)
    .put(protect, updateTask)
    .delete(protect, deleteTask);

// =====================================
// Move Task
// =====================================

router.put(
    "/:id/move",
    protect,
    moveTask
);

module.exports = router;
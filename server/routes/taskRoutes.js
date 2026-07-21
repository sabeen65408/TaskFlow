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
    moveTask
} = require("../controllers/taskController");

router.route("/")
.get(protect, getAllTasks)
.post(protect, createTask);

router.route("/project/:projectId")
.get(protect,getTasksByProject);

router.route("/:id")
.get(protect,getTask)
.put(protect,updateTask)
.delete(protect,deleteTask);

router.put("/:id/move", protect, moveTask);

module.exports = router;
const Task = require("../models/Task");
const Notification = require("../models/Notification");
const Activity = require("../models/Activity");

// ==============================
// Create Task
// ==============================

const createTask = async (req, res) => {

    try {

        const task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            project: req.body.project,
            assignedTo: req.body.assignedTo,
            column: req.body.column || "Todo",
            priority: req.body.priority || "Medium",
            dueDate: req.body.dueDate
        });

        // Notification
        // Notification
if (task.assignedTo) {

    await Notification.create({

        user: task.assignedTo,

        sender: req.user._id,

        task: task._id,

        project: task.project,

        type: "task_assigned",

        message: `You have been assigned a new task: "${task.title}"`

    });

}

        // Activity
await Activity.create({

    project: task.project,

    task: task._id,

    user: req.user._id,

    action: `created task "${task.title}"`

});

// Populate assigned user before sending response
await task.populate("assignedTo", "name email");

res.status(201).json(task);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ==============================
// Get Tasks by Project
// ==============================

const getTasksByProject = async (req, res) => {

    try {

        const tasks = await Task.find({

            project: req.params.projectId

        }).populate("assignedTo", "name email");

        res.json(tasks);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ==============================
// Get Single Task
// ==============================

const getTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id)
    .populate("assignedTo", "name email")
    .populate("project", "title");

        if (!task) {

            return res.status(404).json({

                message: "Task not found"

            });

        }

        res.json(task);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};
// ==============================
// Get All Tasks
// ==============================

const getAllTasks = async (req, res) => {

    try {

        const tasks = await Task.find()

            .populate("assignedTo", "name")

            .populate("project", "title");

        res.json(tasks);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ==============================
// Update Task
// ==============================

const updateTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {

            return res.status(404).json({

                message: "Task not found"

            });

        }

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.column = req.body.column || task.column;
        task.priority = req.body.priority || task.priority;
        task.dueDate = req.body.dueDate || task.dueDate;
        task.assignedTo = req.body.assignedTo || task.assignedTo;

        const updatedTask = await task.save();
        // Notify assigned employee

if (updatedTask.assignedTo) {

    await Notification.create({

        user: updatedTask.assignedTo,

        sender: req.user._id,

        task: updatedTask._id,

        project: updatedTask.project,

        type: "task_updated",

        message: `Task "${updatedTask.title}" has been updated.`

    });

}

        await updatedTask.populate("assignedTo", "name email");

        await Activity.create({

            project: updatedTask.project,

            task: updatedTask._id,

            user: req.user._id,

            action: `updated task "${updatedTask.title}"`

        });

        res.json(updatedTask);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ==============================
// Delete Task
// ==============================

const deleteTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {

            return res.status(404).json({

                message: "Task not found"

            });

        }

        await Activity.create({

            project: task.project,

            task: task._id,

            user: req.user._id,

            action: `deleted task "${task.title}"`

        });

        if (task.assignedTo) {

    await Notification.create({

        user: task.assignedTo,

        sender: req.user._id,

        task: task._id,

        project: task.project,

        type: "general",

        message: `Task "${task.title}" has been deleted.`

    });

}
        await task.deleteOne();

        res.json({

            message: "Task Deleted Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ==============================
// Move Task
// ==============================

const moveTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {

            return res.status(404).json({

                message: "Task not found"

            });

        }

        task.column = req.body.column;

        await task.save();
        // Notify assigned employee

if (task.assignedTo) {

    await Notification.create({

        user: task.assignedTo,

        sender: req.user._id,

        task: task._id,

        project: task.project,

        type: "task_moved",

        message: `"${task.title}" moved to ${task.column}.`

    });

}

        await Activity.create({

            project: task.project,

            task: task._id,

            user: req.user._id,

            action: `moved "${task.title}" to ${task.column}`

        });

        res.json({

            message: "Task moved successfully",

            task

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    createTask,

    getAllTasks,

    getTasksByProject,

    getTask,

    updateTask,

    deleteTask,

    moveTask,

};
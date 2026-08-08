const Task = require("../models/Task");
const Activity = require("../models/Activity");
const Notification = require("../models/Notification");

// =====================================
// Get Logged-in Employee Tasks
// =====================================

const getMyTasks = async (req, res) => {

    try {

        const tasks = await Task.find({
            assignedTo: req.user._id
        })
        .populate("project", "name")
        .populate("assignedTo", "name email")
        .sort({
            createdAt: -1
        });

        res.json(tasks);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// =====================================
// Update Employee Task Column
// =====================================

const updateMyTask = async (req, res) => {

    try {

        const task = await Task.findOne({

            _id: req.params.id,

            assignedTo: req.user._id,

        });

        if (!task) {

            return res.status(404).json({

                message: "Task not found",

            });

        }

        task.column = req.body.column;

        await task.save();
        await Activity.create({

    project: task.project,

    task: task._id,

    user: req.user._id,

    action: `moved task to ${task.column}`,

});

const populatedTask = await task.populate(
    "project",
    "owner"
);

if (
    populatedTask.project &&
    populatedTask.project.owner
) {

    await Notification.create({

        user: populatedTask.project.owner,

        sender: req.user._id,

        task: task._id,

        project: task.project,

        type: task.column === "Done"
            ? "completed"
            : "task_moved",

        message:
            task.column === "Done"

                ? `${req.user.name} completed "${task.title}".`

                : `${req.user.name} moved "${task.title}" to ${task.column}.`

    });

}

        const updatedTask = await Task.findById(task._id)
            .populate("project", "name")
            .populate("assignedTo", "name email");

        res.json(updatedTask);

    }

    catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// =====================================
// Get Logged-in Employee Activities
// =====================================

const getMyActivities = async (req, res) => {

    try {

        const activities = await Activity.find({

            user: req.user._id

        })

        .populate("task", "title")

        .sort({

            createdAt: -1

        })

        .limit(20);

        res.json(activities);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// =====================================
// Get Logged-in Employee Calendar Tasks
// =====================================

const getMyCalendarTasks = async (req, res) => {

    try {

        const tasks = await Task.find({
            assignedTo: req.user._id
        })

        .populate("project", "title")

        .populate("assignedTo", "name email")

        .sort({
            dueDate: 1
        });

        res.json(tasks);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getMyTasks,
    updateMyTask,
    getMyActivities,
    getMyCalendarTasks,
};
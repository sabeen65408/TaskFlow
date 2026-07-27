const Activity = require("../models/Activity");
const Project = require("../models/Project");

// ===============================
// Dashboard
// ===============================

const getActivities = async (req, res) => {

    try {

        const projects = await Project.find({
            owner: req.user._id
        }).select("_id");

        const projectIds = projects.map(project => project._id);

        const activities = await Activity.find({

            project: {
                $in: projectIds
            }

        })

        .populate("user", "name")

        .populate("project", "title")

        .populate("task", "title")

        .sort({
            createdAt: -1
        })

        .limit(50);

        res.json(activities);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ===============================
// Project Page
// ===============================

const getProjectActivities = async (req, res) => {

    try {

        const activities = await Activity.find({

            project: req.params.projectId

        })

        .populate("user", "name")

        .populate("project", "title")

        .populate("task", "title")

        .sort({

            createdAt: -1

        });

        res.json(activities);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    getActivities,

    getProjectActivities

};
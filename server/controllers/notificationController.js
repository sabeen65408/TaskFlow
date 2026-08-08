const Notification = require("../models/Notification");

// =====================================
// Get Logged-in User Notifications
// =====================================

const getNotifications = async (req, res) => {

    try {

        const notifications = await Notification.find({

            user: req.user.id

        })

        .populate("sender", "name")

        .populate("task", "title")

        .populate("project", "title")

        .sort({

            createdAt: -1

        });

        res.json(notifications);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// =====================================
// Mark Single Notification as Read
// =====================================

const markAsRead = async (req, res) => {

    try {

        const notification = await Notification.findById(
            req.params.id
        );

        if (!notification) {

            return res.status(404).json({

                message: "Notification not found"

            });

        }

        if (
            notification.user.toString() !==
            req.user.id
        ) {

            return res.status(403).json({

                message: "Unauthorized"

            });

        }

        notification.read = true;

        await notification.save();

        res.json(notification);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// =====================================
// Mark All Notifications as Read
// =====================================

const markAllAsRead = async (req, res) => {

    try {

        await Notification.updateMany(

            {

                user: req.user.id,

                read: false,

            },

            {

                read: true,

            }

        );

        res.json({

            message: "All notifications marked as read"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    getNotifications,

    markAsRead,

    markAllAsRead,

};
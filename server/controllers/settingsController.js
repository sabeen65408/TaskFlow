const bcrypt = require("bcryptjs");
const User = require("../models/User");


// =========================
// Get Profile
// =========================

exports.getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
            .select("-password");

        res.json(user);

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }

};


// =========================
// Update Profile
// =========================

exports.updateProfile = async (req, res) => {

    try {

        const { name, email } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found",
            });

        }

        user.name = name;
        user.email = email;

        await user.save();

        res.json({
            message: "Profile Updated",
            user,
        });

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }

};


// =========================
// Change Password
// =========================

exports.changePassword = async (req, res) => {

    try {

        const {

            currentPassword,
            newPassword

        } = req.body;

        const user = await User.findById(req.user.id);

        const isMatch = await bcrypt.compare(

            currentPassword,
            user.password

        );

        if (!isMatch) {

            return res.status(400).json({

                message: "Current password incorrect"

            });

        }

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(

            newPassword,
            salt

        );

        await user.save();

        res.json({

            message: "Password Changed"

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};


// =========================
// Preferences
// =========================

exports.updatePreferences = async (req, res) => {

    try {

        const {

            theme,
            emailNotifications,
            taskNotifications

        } = req.body;

        const user = await User.findById(req.user.id);

        user.theme = theme;
        user.emailNotifications = emailNotifications;
        user.taskNotifications = taskNotifications;

        await user.save();

        res.json({

            message: "Preferences Updated",
            user,

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message,

        });

    }

};
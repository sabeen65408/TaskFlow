const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        // =================================
        // Basic User Information
        // =================================

        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            unique: true,
            sparse: true,
            trim: true,
            default: "",
        },

        password: {
            type: String,
            required: true,
        },

        // =================================
        // User Role
        // =================================

        role: {
            type: String,
            enum: ["admin", "employee"],
            default: "employee",
        },

        // =================================
        // User Settings
        // =================================

        theme: {
            type: String,
            enum: ["light", "dark"],
            default: "light",
        },

        emailNotifications: {
            type: Boolean,
            default: true,
        },

        taskNotifications: {
            type: Boolean,
            default: true,
        },

        // =================================
        // Password Reset OTP
        // =================================

        resetPasswordOtp: {
            type: String,
        },

        resetPasswordOtpExpire: {
            type: Date,
        },

        resetPasswordOtpVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
    {
        // =================================
        // Department Information
        // =================================

        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
            trim: true,
        },

        // =================================
        // Department Settings
        // =================================

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Department", departmentSchema);

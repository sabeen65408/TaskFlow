const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    status: {
        type: String,
        default: "Active"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Project", projectSchema);
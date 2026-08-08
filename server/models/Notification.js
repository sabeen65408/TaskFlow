const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    // User who receives the notification
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // User who performed the action
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Related task (optional)
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },

    // Related project (optional)
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },

    // Notification message
    message: {
      type: String,
      required: true,
      trim: true,
    },

    // Notification type
    type: {
      type: String,
      enum: [
        "task_assigned",
        "task_updated",
        "task_completed",
        "task_moved",
        "comment",
        "attachment",
        "due_today",
        "general",
      ],
      default: "general",
    },

    // Read status
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Notification",
  notificationSchema
);
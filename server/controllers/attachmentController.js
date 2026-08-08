const Attachment=require("../models/Attachment");
const Task = require("../models/Task");
const Activity = require("../models/Activity");
const fs = require("fs");
const path = require("path");
const Notification = require("../models/Notification");

const uploadAttachment = async (req, res) => {

    try {

        console.log("========== UPLOAD REQUEST ==========");
        console.log("req.user:", req.user);
        console.log("req.body:", req.body);
        console.log("req.file:", req.file);

        if (!req.file) {
            return res.status(400).json({
                message: "No file received"
            });
        }

        const attachment = await Attachment.create({

    task: req.body.task,

    uploadedBy: req.user.id,

    fileName: req.file.originalname,

    fileUrl: req.file.filename

});

const task = await Task.findById(req.body.task);

await Activity.create({

    project: task.project,

    task: task._id,

    user: req.user.id,

    action: `uploaded ${req.file.originalname}`,

});

// Notify project owner/admin

const populatedTask = await task.populate(
    "project",
    "owner"
);

if (
    populatedTask.project &&
    populatedTask.project.owner &&
    populatedTask.project.owner.toString() !== req.user.id
) {

    await Notification.create({

        user: populatedTask.project.owner,

        sender: req.user.id,

        task: task._id,

        project: task.project,

        type: "attachment",

        message: `${req.user.name} uploaded "${req.file.originalname}" to "${task.title}".`

    });

}

res.status(201).json(attachment);

    } catch (err) {

        console.log("UPLOAD ERROR:");
        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

};

const getAttachments=async(req,res)=>{

const files=await Attachment.find({

task:req.params.taskId

});

res.json(files);

};


const deleteAttachment = async (req, res) => {

    try {

        const attachment = await Attachment.findById(req.params.id);

        if (!attachment) {
            return res.status(404).json({
                message: "Attachment not found"
            });
        }

        const filePath = path.join(
            __dirname,
            "..",
            "uploads",
            attachment.fileUrl
        );

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await attachment.deleteOne();

        res.json({
            message: "Attachment deleted"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {
    uploadAttachment,
    getAttachments,
    deleteAttachment
};
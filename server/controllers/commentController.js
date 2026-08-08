const Comment = require("../models/Comment");
const Task = require("../models/Task");
const Activity = require("../models/Activity");
const Notification = require("../models/Notification");

const addComment = async (req,res)=>{

try{

const comment=await Comment.create({

task:req.body.task,

user:req.user.id,

text:req.body.text

});

await comment.populate("user","name");

const task = await Task.findById(req.body.task);

await Activity.create({

    project: task.project,

    task: task._id,

    user: req.user.id,

    action: "added a comment",

});

// Notify project owner/admin

const project = await task.populate(
    "project",
    "owner"
);

if (
    project.project &&
    project.project.owner &&
    project.project.owner.toString() !== req.user.id
) {

    await Notification.create({

        user: project.project.owner,

        sender: req.user.id,

        task: task._id,

        project: task.project,

        type: "comment",

        message: `${comment.user.name} commented on "${task.title}".`

    });

}

res.status(201).json(comment);

}

catch(err){

res.status(500).json({

message:err.message

});

}

};

const getComments=async(req,res)=>{

const comments=await Comment.find({

task:req.params.taskId

})

.populate("user","name")

.sort({

createdAt:1

});

res.json(comments);

};

module.exports={
addComment,
getComments
};
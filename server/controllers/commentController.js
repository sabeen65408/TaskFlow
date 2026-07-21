const Comment = require("../models/Comment");

const addComment = async (req,res)=>{

try{

const comment=await Comment.create({

task:req.body.task,

user:req.user.id,

text:req.body.text

});

await comment.populate("user","name");

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
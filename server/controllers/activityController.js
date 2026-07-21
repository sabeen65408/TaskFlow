const Activity = require("../models/Activity");

const getActivities = async(req,res)=>{

    const activities = await Activity.find({

        project:req.params.projectId

    })

    .populate("user","name")

    .sort({createdAt:-1});

    res.json(activities);

};

module.exports={

    getActivities

};
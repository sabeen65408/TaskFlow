const Team = require("../models/Team");
const User = require("../models/User");

// Get Members
const getMembers = async(req,res)=>{

    const members = await Team.find({

        project:req.params.projectId

    }).populate("user","name email");

    res.json(members);

};

// Add Member
const addMember = async(req,res)=>{

    const user = await User.findOne({

        email:req.body.email

    });

    if(!user){

        return res.status(404).json({

            message:"User not found"

        });

    }

    const exists = await Team.findOne({

        project:req.params.projectId,

        user:user._id

    });

    if(exists){

        return res.status(400).json({

            message:"Already added"

        });

    }

    const member = await Team.create({

        project:req.params.projectId,

        user:user._id,

        role:"Member"

    });

    res.json(member);

};

// Remove Member
const removeMember = async(req,res)=>{

    await Team.findByIdAndDelete(

        req.params.id

    );

    res.json({

        message:"Removed"

    });

};

module.exports={

    getMembers,

    addMember,

    removeMember

};
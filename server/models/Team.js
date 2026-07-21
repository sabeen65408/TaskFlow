const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({

    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    role:{
        type:String,
        enum:["Admin","Member"],
        default:"Member"
    }

},{
    timestamps:true
});

module.exports = mongoose.model(
    "Team",
    teamSchema
);
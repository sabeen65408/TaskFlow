const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    theme:{
        type:String,
        enum:["light","dark"],
        default:"light"
    },

    emailNotifications:{
        type:Boolean,
        default:true
    },

    taskNotifications:{
        type:Boolean,
        default:true
    }

},
{
timestamps:true
});

module.exports = mongoose.model("User", userSchema);
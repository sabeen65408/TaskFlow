const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
{
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true,
        unique:true
    },

    columns:[
        {
            title:{
                type:String,
                required:true
            },

            order:{
                type:Number,
                required:true
            }
        }
    ]
},
{
    timestamps:true
});

module.exports = mongoose.model("Board",boardSchema);
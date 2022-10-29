const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required:[true,'Post is required'],
    },
    user:{
        type:Object,
        required:[true,'User  is required'],
    },
    description:{
        type:String,
        required:[true,"Comment description is required"],
    },
},{timestamps:true})


const Comment = mongoose.model("Comments", commentSchema);
module.exports = Comment;
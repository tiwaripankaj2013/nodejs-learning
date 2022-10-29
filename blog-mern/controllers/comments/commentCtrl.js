const expressAsyncHandler = require('express-async-handler');
const Comment = require('../../model/comment/Comment');
const validateMongodbId = require('../../utils/validateMongodbID');

const createCommentCtrl = expressAsyncHandler(async(req,res)=>{
    const user = req.user;
    const {postid} = req.body;
    try {
        const comment = await Comment.create({
            post:postid,
            user:user,
            description:description,
        });
        res.json(comment);
    } catch (error) {
        res.json(error);
        
    }
});

//fetch all comments 

const fetchAllComments = expressAsyncHandler(async(req,res)=>{
    try {
        const comments = await Comment.find({}).sort('-created');
        res.json(comments);
    } catch (error) {
        res.json(error);
    }

});

//comment details 
const fetchCommentCtrl =  expressAsyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongodbId(id);
    try{
        const comment = await Comment.findById(id)
        res.json(comment);
    }catch(error){
        res.json(error)
    }
    res.json('comment details');
});
//Update comment

const updateCommentCtrl = expressAsyncHandler(async (req,res)=>{
    const {id} = req.params;
    validateMongodbId(id);
    try {
        const update = await Comment.findByIdAndUpdate(id,{
            post:req.body.postid,
            user:req?.user,
            description:req?.body?.description,
        },{
            new:true,
            runValidators:true,
        });
        res.json(update);
    } catch (error) {
        res.json(error);
    }
});
const delteCommentCtrl = expressAsyncHandler(async(req,res)=>{
    res.json('delte comment')
    const {id} = req.params;
    validateMongodbId(id);
    try {
    const comment = await Comment.findByIdAndDelete(id);
    res.json(comment);        
    } catch (error) {
        res.json(error);
        
    }
})
module.exports = {createCommentCtrl,fetchAllComments,fetchCommentCtrl,updateCommentCtrl,delteCommentCtrl};
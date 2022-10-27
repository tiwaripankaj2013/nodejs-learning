const expressAsyncHandler = require('express-async-handler');
const Post = require('../../model/post/Post');
const validateMongodbId = require('../../utils/validateMongodbID');
const Filter = require('bad-words');
const createPostCtrl = expressAsyncHandler(async(req,res)=>{
    const {_id} = req.user;
    validateMongodbId(req.body.user);
    filter = new Filter();
    const isProfane = filter.isProfane('good');
try{
    const post  = await Post.create(req.body);
    res.json(post);
}catch(error){
    res.json(error);
}
});

module.exports = {createPostCtrl};
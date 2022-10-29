const expressAsyncHandler = require("express-async-handler");
const Filter = require("bad-words");
const fs = require("fs");
const Post = require("../../model/post/Post");
const validateMongodbId = require("../../utils/validateMongodbID");
const cloudinaryUploadImg = require("../../utils/cloudinary");

const createPostCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(req.body.user);
  const filter = new Filter();
  const isProfane = filter.isProfane(req.body.title, req.body.description);
  if (isProfane) {
    const user = await User.findByIdAndUpdate(_id, {
      isBlocked: true,
    });
    throw new Error(
      "Creating failed because it contains profane words and you have been blocked"
    );
  }
  const localPath = `public/images/posts/${req.file.filename}`;
  const imgUploaded = await cloudinaryUploadImg(localPath);

  // const user = await User.findByIdAndUpdate(_id,{
  //     isBlocked:true,
  // });
  try {
    const post = await Post.create({
      ...req.body,
     // image: imgUploaded?.url,
      user: _id,
    });
    res.json(post);
    //Removed uploaded img
    fs.unlinkSync(localPath);
  } catch (error) {
    res.json(error);
  }
});

const fetchPostsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const post = await Post.find({}).populate("user");
    res.json("fetch post");
  } catch (error) {}
});

const fetchPostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findById(id)
      .populate("user")
      .populate("disLikes")
      .populate("likes");
    // update numbers of view
    await Post.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      {
        new: true,
      }
    );
    res.json("post details");
  } catch (error) {
    res.json(error);
  }
});

//Update post

const updatePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

//Delete post

const deletePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  res.json("delete");
  try {
    const post = await Post.findOneAndDelete(id);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

// Likes

const toggleAddLikeToPostCtrl = expressAsyncHandler(async (req, res) => {
  // find post to like
  const { postId } = req.body;
  const post = await Post.findById(postId);
  //2. Find the login user
  const loginUserId = req?.user?._id;
  //3. Find the user has liked post

  const isLiked = post?.isLiked;
  const allreadyDisliked = post?.disLikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  //5. remove the user from dislikes array if exists
  if (allreadyDisliked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(post);
  }
  //Remove the user if he has likes the post
  if (isLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      {
        new: true,
      }
    );
    res.json(post);
  } else {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(post);
  }
});

const toggleAddDislikeToPostCtrl = expressAsyncHandler(async (req, res) => {
  const { postId } = req.body;
  const post = await Post.findById(postId);
  //2. Find the login user id

  const loginUserId = req?.user?._id;
  //check if the user has already disLikes
  const isDisLiked = post?.isDisLiked;
  // check if allready like this post
  const allreadyLiked = post?.likes?.find(
    (userId) => userId.toString() === loginUserId?.toString()
  );
  //remove this user from likes array if it exists
  if (allreadyLiked) {
    const post = await Post.findOneAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  }
  //toggling
  //removed this user from dislikes if allready disliked
  if (isDisLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { disLikes: loginUserId },
        isDisLiked: true,
      },
      {
        new: true,
      }
    );
  }
});
module.exports = {
  toggleAddLikeToPostCtrl,
  toggleAddDislikeToPostCtrl,
  deletePostCtrl,
  updatePostCtrl,
  createPostCtrl,
  fetchPostsCtrl,
  fetchPostCtrl,
};

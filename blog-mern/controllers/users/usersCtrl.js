const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../config/token/generateToken");
const User = require("../../model/users/User");
const validateMongodbId = require("../../utils/validateMongodbID");

const userRegisterCtrl = async (req, res) => {
  const userExists = await User.findOne({ email: req?.body?.email });
  if (userExists) throw new Error("User allready exists");
  try {
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });

    res.json(user);
  } catch (error) {
    res.json(error);
  }
};

const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });

  //check if password is match
  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json({
      _id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
    });
  } else {
    res.status(401);
    throw new Error(`Invalid login Credentials`);
  }
});

const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

const deleteUserCtrl = expressAsyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongodbId(id);
    try{
        const deletedUser = await User.findByIdAndDelete(id);
        res.json(deletedUser);
    } catch(error){
        res.json(error);
    }

});

const fetchUserDetailsCtrl = expressAsyncHandler(async(req,res)=>{
    const {id} = req.params;
    //check if user id is valid

    validateMongodbId(id);
    try{
        const user = await User.findById(id);
        res.json(user);

    }catch(error){
        res.json(error);
    }

});

//User profile 
const userProfileCtrl = expressAsyncHandler(async(req,res) =>{
    const {id} = req.params;
    validateMongodbId(id);
    try {
        const myProfile = await User.findById(id);
    } catch (error) {
        res.json(error)
    }
})
const updateUserCtrl = expressAsyncHandler(async (req,res)=>{
  res.json('profile');
});

// update password
const updateUserPasswordCtrl = expressAsyncHandler(async (req,res)=>{
  //destructure the login user
  const {_id} = req.user;
  const {password} = req.body
  validateMongodbId(_id);
  // Find the user by _id
  const user = await User.findById(_id);
  if(password){
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  }
});

const followingUserCtrl = expressAsyncHandler(async (req,res)=>{
  //1.find the user who want to follow
  //2.Update the login user following fields
  const {followId} = req.body;
  const {loginUserId} = req.user.id;

  const targetUser = await User.findById(followId);

  const allreadyFollowing = targetUser?.followers?.find(user =>user?.toString()=== loginUserId.toString());
  if(allreadyFollowing) throw new Error("You have allready folloed this user"); 
  await User.findByIdAndUpdate(followId,{
    $push : {followers:loginUserId},
    isFollowing:true,
  },{
    new :true,
  });
  await User.findByIdAndUpdate(loginUserId,{
    $push :{following:followId},
  },{
    new :true,
  });
  res.json('following API');
});

//unfollowing 
const unfollowUserCtrl = expressAsyncHandler(async (req,res)=>{
  const {unFollowId} = req.body;
  const loginUserId = req.user.id;

  await User.findByIdAndUpdate(unFollowId,{
    $pull:{followers:loginUserId},
    isFollowing:false,
  },{new:true})
  await User.findByIdAndUpdate(loginUserId,{
    $pull:{following:unFollowId},
  },{new:true});
  res.json('you have sucessfully unfollow');
});

// block user
const blockUserCtrl = expressAsyncHandler(async (req,res)=>{
  const {id} = req.params;
  validateMongodbId(id);

  const user = await User.findByIdAndUpdate(id,{
    isBlocked:true,
  },{new:true})
})
// block user
const unBlockUserCtrl = expressAsyncHandler(async (req,res)=>{
  const {id} = req.params;
  validateMongodbId(id);

  const user = await User.findByIdAndUpdate(id,{
    isBlocked:false,
  },{new:true})
})
module.exports = {
  userRegisterCtrl,
  loginUserCtrl,
  fetchUsersCtrl,
  deleteUserCtrl,
  fetchUserDetailsCtrl,
  userProfileCtrl,
  updateUserCtrl,
  updateUserPasswordCtrl,
  followingUserCtrl,
  unfollowUserCtrl,
  blockUserCtrl,
  unBlockUserCtrl,
};

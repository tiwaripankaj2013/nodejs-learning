const express = require("express");
const {
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
  generateVerificationTokenCtrl,
  accountVerificationCtrl,
  forgetPasswordToken,
  passwordResetCtrl,
  profilePhotoUploadCtrl,
} = require("../../controllers/users/usersCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const { photoUpload,profilePhotoResize } = require("../../middlewares/uploads/photoUpload");

const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.put('/profilephoto-upload',authMiddleware,photoUpload.single('image'), 
profilePhotoResize,
profilePhotoUploadCtrl);    
userRoutes.get("/",authMiddleware, fetchUsersCtrl);
userRoutes.post('/forget-password-token',forgetPasswordToken);
userRoutes.post('reset-password',passwordResetCtrl);
userRoutes.put('/password',authMiddleware,updateUserPasswordCtrl);
userRoutes.put('/follow',authMiddleware,followingUserCtrl);
userRoutes.post('/gerate-verify-email-token',authMiddleware,generateVerificationTokenCtrl);
userRoutes.put('/gerate-verify-email-token',authMiddleware,generateVerificationTokenCtrl);
userRoutes.put('/verify-account',authMiddleware,accountVerificationCtrl);
userRoutes.put('/send-mail', generateVerificationTokenCtrl);
userRoutes.put('/unfollow',authMiddleware,unfollowUserCtrl);
userRoutes.put('/block-user/:id',authMiddleware,blockUserCtrl);
userRoutes.put('/un-block-user/:id',authMiddleware,unBlockUserCtrl);
userRoutes.get('/profile/:id',authMiddleware,userProfileCtrl); 
userRoutes.put('/:id',updateUserCtrl);
userRoutes.delete("/:id", deleteUserCtrl);
userRoutes.get("/:id", fetchUserDetailsCtrl);

module.exports = userRoutes;

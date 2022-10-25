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
} = require("../../controllers/users/usersCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/",authMiddleware, fetchUsersCtrl);
userRoutes.put('/password',authMiddleware,updateUserPasswordCtrl);
userRoutes.put('/follow',authMiddleware,followingUserCtrl);
userRoutes.put('/unfollow',authMiddleware,unfollowUserCtrl);
userRoutes.put('/block-user/:id',authMiddleware,blockUserCtrl);
userRoutes.put('/un-block-user/:id',authMiddleware,unBlockUserCtrl);
userRoutes.get('/profile/:id',authMiddleware,userProfileCtrl); 
userRoutes.put('/:id',updateUserCtrl);
userRoutes.delete("/:id", deleteUserCtrl);
userRoutes.get("/:id", fetchUserDetailsCtrl);

module.exports = userRoutes;

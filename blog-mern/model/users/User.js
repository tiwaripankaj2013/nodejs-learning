const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: [true, "First name is require"],
  },
  lastName: {
    type: String,
    required: [true, "First name is require"],
  },
  profile: {
    type: String,
    default:
      "https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/",
  },
  email: {
    type: String,
    required: [true, "Email is require"],
  },
  bio: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Password is require"],
  },
  postCount: {
    type: Number,
    default: 0,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["Admin", "Guest", "Blogger"],
  },
  isFollowing: {
    type: Boolean,
    default: false,
  },
  isUnFollowing: {
    type: Boolean,
    default: false,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
  accountVerificationToken:String,
  accountVerificationTokenExpires:Date,
  viewedBy:{
    type:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
  },
  followers:{
    type:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
  },
  following:{
    type:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
  },

  passwordChangeAt:Date,
  passwordResetToken:String,
  passwordResetExpires:Date,
  active:{
    type:Boolean,
    default:false,
  },
},{
   toJSON:{
    virtuals:true,
   },
   toObject:{
    virtuals:true,
   },
   timestamps:true, 
}
);

// hash password
userSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    next();
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt);
  next();
});

//match password
userSchema.methods.isPasswordMatched = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password)
}
//Compile schema into model
const User = mongoose.model("User",userSchema);
module.exports = User; 
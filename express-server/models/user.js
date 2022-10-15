const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: { type: String, required: true },
    dob: { type: String, required: true },
    age: { type: Number, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("userList", userSchema);
module.exports = User;

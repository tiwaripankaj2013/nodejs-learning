const mongoose = require("mongoose");

const dbConnect = async (DATABASE_URL) => {

  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Connected data base  Successfully...");
  } catch (err) {
    console.log(err);
  }
};

module.exports=dbConnect;

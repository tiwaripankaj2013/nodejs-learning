const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE_LOCAL;
// console.log(app.get('env'));
const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/my-db-test")
    .then(() => console.log("database connected"))
    .catch(() => {
      console.log("server is not started something wrong");
    });
};
// const port = process.env.PORT || 5000;
// app.listen(port,()=>{
//     console.log(`App is running on port ${port}`)
// });
module.exports = connectDB
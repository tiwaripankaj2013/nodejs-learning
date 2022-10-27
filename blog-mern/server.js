const express  = require("express");
// const dotenv = require("dotenv").config();
const  dbConnect = require("./db/connectDB");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
const userRoutes = require("./route/user/usersRoute");
const postRoute = require("./route/posts/postRoute");
const app = express();
const PORT = process.env.PORT || 5000;
const DATABASE_URL= process.env.PORT || "mongodb://0.0.0.0:27017/mern-blogs";

// data base connection
dbConnect(DATABASE_URL);
//Middleware
app.use(express.json());



//users route
app.use('/api/users', userRoutes);

//post route
app.use('/api/posts',postRoute);
// //login
// app.post("/api/users/",(req,res)=>{
//   res.json({user:"User Login"});
// });

// //fetch all user
// app.get("/api/users/login",(req,res)=>{
//   res.json({user:"Fetch users"});
// });
// app.use(notFound);
// app.use(errorHandler);
app.listen(PORT, () => {
  console.log(PORT, "server is running");
});

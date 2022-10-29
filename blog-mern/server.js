const express  = require("express");
// const dotenv = require("dotenv").config();
const  dbConnect = require("./db/connectDB");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
const userRoutes = require("./route/user/usersRoute");
const postRoute = require("./route/posts/postRoute");
const commentRoutes = require("./route/comments/commentRoute");
const categoryRoute = require("./route/category/categoryRoute");
const emailMsgRoute = require("./route/emailMsg/emailMsgRoute");

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

app.use('/api/comments',commentRoutes);

//email msg
app.use('/api/email',emailMsgRoute);

//category route
app.use('/api/category',categoryRoute);
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(PORT, "server is running");
});

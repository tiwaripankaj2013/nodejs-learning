const dotenv = require("dotenv");
const app = require("./app");
// const  mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

// const DB = process.env.DATABASE_LOCAL;
// mongoose.connect(DB,{
//         useNewUrlParser:true,
//         useCreateIndex:true,
//         useFindAndModify:false,
//     })
//     .then(() => console.log("database connected"))
//     .catch(() => {
//       console.log("server is not started something wrong");
//     });

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`App is running on port ${port}`)
});
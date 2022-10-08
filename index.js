/* Blocking synchronous call */

const http = require("http");
const url = require('url');
const server = http.createServer((req,res)=>{
    const pathName = req.url;
    if(pathName=='/'){
        res.end('We are on Home page');
    }
    else if(pathName=='/users'){
        res.end('We are on users list page');
    }
    else if(req.method=='POST'){
        res.end(' reading the data POST method');
        // console.log(req.body);
   }
    else{
        res.end('path does not exist');
    }
    console.log(req.url);
    // if(req.method=='GET'){
    //      res.end(' server created');
    //     //  console.log(req.body);
    // }
    
    
});

server.listen(5000,()=>{
    console.log('server running on:' + 5000)
})
/* Blocking synchronous call */

const fs = require('fs');
const textIn = fs.readFileSync('./text/input.txt','utf-8');
console.log(textIn);
const textOut = `what we can learn in ${textIn}. \n Deep dive and grow more. \n Learning start today on ${Date.now()}`;
fs.writeFileSync('./text/output.text',textOut);
console.log('File writen');

/* None-blocking Asynchronous call */
fs.readFile('./text/inputText2.txt','utf-8',(err,data1)=>{
    if (err) return console.log('Error'); 
    fs.readFile(`./text/${data1}.txt`,'utf-8',(err,data2)=>{
        console.log(data2);
        fs.readFile(`./text/${data2}.txt`,'utf-8',(err,data3)=>{
            console.log(data3);
        fs.writeFile('./text/ouputText2.txt',`${data2}\n${data3}`,'utf-8', err =>{
            console.log('Node Async file has been written');
        })
        });
    });
});
console.log('read file');
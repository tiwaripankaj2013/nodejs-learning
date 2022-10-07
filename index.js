const fs = require('fs');
const textIn = fs.readFileSync('./text/input.txt','utf-8');
console.log(textIn);
const textOut = `what we can learn in ${textIn}. \n Deep dive and grow more. \n Learning start today on ${Date.now()}`;
fs.writeFileSync('./text/output.text',textOut);
console.log('File writen');

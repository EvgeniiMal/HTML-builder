const fs = require('fs');
const path = require('path');




const myPath = path.join(__dirname, './text.txt');
const readableStream = fs.createReadStream(myPath, 'utf8');

readableStream.on('data', function(chunk){
  console.log(chunk);
});
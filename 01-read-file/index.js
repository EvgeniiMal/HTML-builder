const fs = require ('fs');
const path = require ('path');

let readableStream = fs.createReadStream("./01-read-file/text.txt", 'utf-8');
 
readableStream.on("data", function(chunk){ 
    console.log(chunk);
});
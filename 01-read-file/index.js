const fs = require('fs');
const reader = fs.createReadStream('./01-read-file/text.txt');
reader.on('data', part => {
    console.log(part.toString());
});
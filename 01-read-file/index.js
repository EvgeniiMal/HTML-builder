const fs =  require('fs');
const path = require('path');
const { stdout } = require('process');

const filePath = path.join(__dirname, 'text.txt');

const readableStream = fs.createReadStream(filePath);
readableStream.on('data', data => stdout.write(data));

const fs = require('fs');
const { resolve } = require('path');

const filePath = resolve(__dirname, 'text.txt');
const stream = fs.createReadStream(filePath, { encoding: 'utf-8' });

let data = '';
stream.on('data', function(chunk) {
  data += chunk;
});
stream.on('end', function() {
  console.log(data);
});
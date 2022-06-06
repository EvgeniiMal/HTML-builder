const fs = require('fs');
const path = require('path');
const sourcepath = path.join(__dirname, 'text.txt');
const readfile = fs.createReadStream(sourcepath, 'utf-8');
let data =  '';
readfile.on('data', chunk => data += chunk);
console.log(data);
readfile.on('end', () => console.log('End', data));
readfile.on('error', error => console.log('Error', error.message));

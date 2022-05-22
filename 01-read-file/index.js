const fs = require('fs');
const path = require('path');

const currentPath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(currentPath, 'utf-8');
let view = '';

readStream.on('data', chunk => view += chunk);
readStream.on('end', () => console.log(view));
readStream.on('error', error => console.log('Error', error.message));

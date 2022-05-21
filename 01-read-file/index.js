const path = require('node:path');
const { stdout } = process;

const fs = require('fs')
const filePath=path.join(__dirname, 'text.txt')
let readableStream = fs.createReadStream(
  filePath,
  'utf8'
)

readableStream.on('data', chunk => stdout.write(chunk));
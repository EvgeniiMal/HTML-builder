// import path from 'path';
// import fs from 'fs';
// import { stdout } from 'process';

const path = require('path');
const { createReadStream } = require('fs');

// const { stdout } = require('process');
const rStream = createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
// rStream.pipe(stdout);
// rStream.on('error', (err) => {
//   console.log(err.message);
// });

// reader = fs.createReadStream('text.txt');
rStream.on('data',function (chunk){
  console.log(chunk.toString());
})
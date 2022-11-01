const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(filePath);

function streamToString(stream) {
  const chunks = [];

  stream.on('data', (chunk) => {
    chunks.push(chunk.toString());
  });

  stream.on('error', () => {
    throw new Error('Incorrect file path or file name!')
  })

  stream.on('end', () => {
    const result = chunks.join('');
    console.log(result);

    return result;
  });
};

streamToString(readStream);

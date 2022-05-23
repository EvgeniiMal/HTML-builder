const { resolve } = require('path');
const fs = require('fs');

const writeStream = fs.createWriteStream(resolve(__dirname, 'text.txt'));
const { stdout, stdin } = process;


stdout.write('Write a message...\n');
stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    process.exit();
  }
  writeStream.write(data);
});

process.on('SIGINT', () => {
  process.exit();
});
process.on('exit', () => {
  stdout.write('\n' + 'Bye!');
});
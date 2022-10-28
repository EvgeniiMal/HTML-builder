const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin } = require('process');
const FILENAME = 'written.txt';
const output = fs.createWriteStream(path.join(__dirname, FILENAME));

console.log('Здравствуйте! Введите ваш текст:');

const rl = readline.createInterface(stdin);
rl.on('line', line =>
  line.toLowerCase() === 'exit'
    ? finishProgram()
    : output.write(line + '\n')
);

function finishProgram() {
  console.log(`До свидания! Вы можете найти введенную информацию в файле ${FILENAME}`);
  process.exit();
}
process.on('SIGINT', finishProgram);



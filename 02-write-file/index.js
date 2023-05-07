const fs = require('fs');
const path = require('node:path');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const pathToFile = path.join(__dirname, 'text.txt');

const question = `What do you think about? Press "enter" and input what do you think'.
After end of the string press Enter. To finish type 'exit' and press "enter"`;
const goodBye = 'Thank you very much';

let writeStream = fs.createWriteStream(pathToFile, 'utf8');

rl.question(question, (answer) => {
  rl.on('line', (answer) => (answer == 'exit') ? process.exit() : writeStream.write(answer + '\n'));
});

process.on('exit', () => console.log(goodBye));
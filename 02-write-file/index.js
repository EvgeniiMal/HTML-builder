const readline = require('readline');
const rl = readline.createInterface({input: process.stdin, output: process.stdout});
const fs = require('fs');
const writeStream = fs.createWriteStream('02-write-file/text2.txt');
function fuckStream(s) {
  writeStream.write(s);
}

rl.question('hi',
  (userInput)=>{
    console.log(userInput);
    fuckStream(userInput);
    const readStream = fs.createReadStream('02-write-file/text2.txt');

    readStream.on('data', (chunk) => {
      chunk.toString().split(' ').includes('exit') ? exitPro() : fuckStream(userInput);
    });
  });



rl.on('SIGINT', () => {
  exitPro();
});

function exitPro() {
  console.log('\n bye for now sweetie');
  process.exit();
}

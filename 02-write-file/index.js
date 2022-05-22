const fs = require('fs');
const path = require('path');
const myPath = path.join(__dirname, './text.txt');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const writableStream = fs.createWriteStream(myPath, 'utf8');
const byeMessage = 'DONE! File text.txt created with you message!';


console.log('Write some text!');
readline.on('line', (data) => {

  if (data === 'exit') {
    readline.close();
    console.log(byeMessage);
  } else {
    writableStream.write(data + '\n');
  }
});

readline.on('SIGINT', () => {
  readline.close();
  console.log(byeMessage);
});




const fs = require('fs');
const path = require('path');
const myPath = path.join(__dirname, './text.txt');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
readline.question('jjj', (name) => {
  console.log(name);

  fs.appendFileSync(myPath, name);







  readline.close();
});
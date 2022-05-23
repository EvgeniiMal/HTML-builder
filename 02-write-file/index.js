const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

fs.writeFile(path.join(__dirname,'text.txt'), '', function(error){
  if(error) throw error;});
console.log('Enter file');


rl.on('line', (input) => {
  const string = input;
  if (string == '**exit**')
  {
    rl.close();
  }
  else{
    fs.appendFile(path.join(__dirname,'text.txt'), string + '\n', function(error){
      if(error) throw error;});
  }
});

process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});
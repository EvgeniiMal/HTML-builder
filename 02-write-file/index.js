// const fs = require('fs');
// const path = require('path');
// const { stdin, stdout, exit } = process;

// const output = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');

// stdout.write('Hi! Enter any text please...\n');

// stdin.on('data', data => {
//   if (data.toString().trim() === 'exit') exit();
//   output.write(data);
// });

// process.on('exit', () => stdout.write('Have a nice day, bye!\n'));
// process.on('SIGINT', exit);

// function fileHandler(){

//   fs.open('testFile.txt', 'w', (err) => {
//       if(err) throw err;
//       console.log('File created');
//   });
  
// }

const fs = require('fs')
const path = require('path')
const process = require('process')
const stream = fs.createWriteStream(path.join(__dirname, './text.txt'))
let b = 'пока';
stream.addListener('error', (err) => console.error(err))

process.stdout.write('Напишите что-нибудь!\n')

process.stdin.addListener('data', data => 
data.toString().trim() === 'exit' ? process.exit(process.stdout.write(`${b}`)) : stream.write(data))

process.addListener('SIGINT', () => process.exit(process.stdout.write(`${b}`)))

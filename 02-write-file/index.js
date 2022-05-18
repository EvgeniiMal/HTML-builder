const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
process.stdout.write('Hi!\n');
process.stdin.on('data', data => {
  if (data.toString().trim() === 'exit') process.exit();
  output.write(data.toString());
});
// when write exit
process.on('exit', () => process.stdout.write('Goodbye!'));
// for ctrl-c
process.on('SIGINT', process.exit);
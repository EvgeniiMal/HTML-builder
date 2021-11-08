const readline = require('readline');
const fs = require('fs');
const { stdin } = require('process');


const readStream = stdin;
const writeStream = fs.createWriteStream( './02-write-file/out.txt', { encoding: 'utf8'} );


const rl = readline.createInterface({
  input: readStream,
  output: writeStream,
  terminal: false,
  historySize: 0
});


console.log('Hello!');

rl.on( 'line', function(line) {
  const words = line;
  writeStream.write( words );
});

rl.on('line', (input) => {
  if (input === 'exit'){
    console.log('Good Buy');
    rl.close();
  }
});
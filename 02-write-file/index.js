const fs = require('fs')
const readline = require('readline');
const myWriteStream = fs.createWriteStream(__dirname + '/text.txt')
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question(
    'Enter text for the file: ',
    (userInput) => {
      if (userInput=== 'exit'){
        console.log('Bye-Bye'),
      rl.close()
    } else 
        {
            myWriteStream.write(userInput + '\n') 
        }
        
    }
  );


rl.on('line', (userInput) => {
    if (userInput=== 'exit'){
        console.log('Bye-Bye'),
      rl.close()
    } else 
        {
            myWriteStream.write(userInput + '\n') 
        }
  });

rl.on('SIGINT', () => {
      console.log('Bye-Bye'),
      rl.close()
  });
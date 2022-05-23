const fs = require('fs');
const ws = fs.createWriteStream('./02-write-file/text.txt');
const readline = require('readline'); 

ws.on('data', chunk => ws.write(chunk));
ws.on('error', error => console.log('Error', error.message));

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter text:'
});

rl.prompt();
rl.on('line', (input) => {
  if(input == 'exit'){	
    rl.close();
  } else {
    fs.appendFile('./02-write-file/text.txt', `${input} `, function(error){if(error) throw error;});
  }
});  
rl.on("SIGINT", () =>  rl.close());

rl.on('close', () => {
    console.log("Bye-bye"); 
    rl.close();
});

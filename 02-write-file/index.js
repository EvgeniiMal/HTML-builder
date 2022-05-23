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
    console.log("Bye-bye");
  } else {
    fs.appendFile('./02-write-file/text.txt', `${input} `, function(error){if(error) throw error;});
    const rs = fs.ReadStream('./02-write-file/text.txt', 'utf8');
    let data = '';
    rs.on('data', chunk => data += chunk);
    rs.on('end', () => {
                        console.log(data); 
                        rl.prompt()});
  }
rl.on("SIGINT", () => {
    
    rl.setPrompt("Bye-bye");
    rl.prompt();
    rl.close();
    });
});

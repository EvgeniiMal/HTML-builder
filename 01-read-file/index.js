const fs = require('fs');
const path = require('path');
  
const readFile = () => {
  const filePath = path.join(__dirname, './text.txt'); 
  const fileStream = fs.createReadStream(filePath, { encoding: 'utf8' });

  logChunks(fileStream);
};

async function logChunks(readable) {
  for await (const chunk of readable) {
    console.log(chunk);
  }
}
  
readFile();
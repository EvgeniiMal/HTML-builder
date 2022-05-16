let fs = require('fs');
fs.readFile('text.txt', 'utf8', (error, fileContent)=>{
  if(error) throw error;
  console.log(fileContent); 
});
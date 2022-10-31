const fs = require('fs');
const output = fs.createWriteStream('./02-write-file/text.txt');
const { stdin, stdout } = process;
console.log("Hello! Start entering data:");
stdin.on('data', data => {
  let asd = data.toString();
  if(((asd[0] =='e')&&(asd[1] =='x')&&(asd[2]=='i')&&(asd[3]=='t'))){
    console.log("Thank you, everything is recorded");
    process.exit()};
  output.write(data);
});
process.on('SIGINT', () => {console.log("Thank you, everything is recorded");process.exit()});

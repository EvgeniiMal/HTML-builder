const fs = require('fs');
const path = require('path');

const writeFile = () => {
  const filePath = path.join(__dirname, './text.txt');

  const ctaPhrase = 'Hello!';
  console.log(ctaPhrase);

  const file = fs.createWriteStream(filePath, { flags: 'a' });

  process.stdin.on('data', (data) => { 
    if (data.toString().trim() === 'exit') {
      console.log('Bye...'); 
      process.exit();
    }
    file.write(data);
  });

  process.on('SIGINT', () => {
    console.log('\n');
    console.log('Bye...');
    process.exit(); 
  }); 
};

writeFile();
  
const fs = require('fs');

const folderPath = './03-files-in-folder/secret-folder';

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  console.log(`Files in directory ${folderPath}:`);
  files.forEach(file => console.log(file));
});

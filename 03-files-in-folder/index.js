const fs = require('fs');
const path = require('node:path');
let pathToFile = path.join(__dirname, 'secret-folder');

fs.readdir(pathToFile,
  (err, files) => {
  console.log("\nCurrent directory files:");
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      fs.stat(`${pathToFile}/${file}`, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }
        if (stats.isFile()) {
        console.log(`${path.basename(file, path.extname(file))} - ${path.extname(file).slice(1)} - ${stats.size} bytes`);
        }
      });
    });
  }
});
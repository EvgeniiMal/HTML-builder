const fs = require('fs');
const path = require('path');

const copyPath = path.join(__dirname, 'files-copy');
const copyFromPath = path.join(__dirname, 'files');

fs.mkdir(copyPath, { recursive: true }, (err) => {
  if (err) {
    console.error(err)
    return;
  }
})

fs.readdir(copyFromPath, (err, files) => {
  if (err) {
    console.error(err)
    return;
  }

files.forEach(el => {
    fs.copyFile(`${copyFromPath}/${el}`, `${copyPath}/${el}`, err => {
      if(err) throw err;
    });
  });
})
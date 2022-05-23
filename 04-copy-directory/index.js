const fs = require('fs');
const path = require('path');
const pathToFiles = path.join(__dirname, 'files');
const pathToCopyFiles = path.join(__dirname, 'files-copy/');


fs.mkdir(pathToCopyFiles, {recursive: true},err => {
  if (err) throw err;
});


fs.readdir(pathToFiles, (err, data) => {
  if (err) throw err;
  data.map(elem => {
    fs.copyFile(path.join(pathToFiles, elem), path.join(pathToCopyFiles, elem), err => {
      if (err) throw err;
    });
  });
});



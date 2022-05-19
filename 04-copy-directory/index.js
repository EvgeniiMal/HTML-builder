const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;
const pathFolder2 = path.join(__dirname, 'files');
const pathFolder = path.join(__dirname, 'files-copy');
fsPromises.mkdir(pathFolder, {recursive:true});
fs.readdir(pathFolder2, (err, files) => {
  if(err) throw err;
  files.forEach(file=>
    fs.copyFile(path.join(pathFolder2, file), path.join(pathFolder, file), err => {
      if(err) throw err; 
      console.log('Файл успешно скопирован');
    }));
});
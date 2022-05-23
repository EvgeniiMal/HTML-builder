const fs = require('fs');
const path = require('node:path');

const targetFolder = path.join(__dirname,'secret-folder');

fs.readdir(targetFolder, { withFileTypes: true },(err, files) => {
  console.log('Files in dir:');
  if (err) console.log(err);
  else {
    files.forEach(file => {
      if (file.isFile()) {
        fs.stat(path.join(targetFolder,file.name),(err, stats) => {
          const ext = path.extname(file.name);
          const name = path.basename(file.name , ext);
          console.log(name + ' - ' + ext.substring(1) + ' - ' + stats.size / 1024 + 'Kb');
        });
      // console.log(path.join(targetFolder,file.name));
      } });}});
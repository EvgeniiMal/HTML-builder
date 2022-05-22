const fs = require('fs');
const path = require('path');
const myPath = path.join(__dirname, 'secret-folder');

fs.readdir(myPath, (err, data) => {
  if (err) throw err;
  data.map(elem => {
    let pathToFile = path.join(myPath, elem);
    fs.stat(pathToFile, (err, stats) => {
      if (err) throw err;
      if (stats.isFile()) {
        console.log(path.parse(pathToFile).name,'-', path.parse(pathToFile).ext.slice(1),'-',stats.size);
      }
    });
  });
});
const fs = require('fs');
const path = require('path');
const pathToStyle = path.join(__dirname, 'styles');
const pathToDist = path.join(__dirname, 'project-dist');




fs.readdir(pathToStyle, (err, data) => {
  if (err) throw err;
  data.map(elem => {
    let pathToFile = path.join(pathToStyle, elem);
    fs.stat(pathToFile, (err, stats) => {
      if (err) throw err;
      if (stats.isFile() && path.parse(pathToFile).ext === '.css') {
        fs.readFile(pathToFile, 'utf8', (err, data) => {
          if (err) throw err;
          fs.readdir(pathToDist, err2 => {
            if (err2) throw err2;
            fs.appendFile(path.join(pathToDist, 'bundle.css'), data, err1 => {
              if (err1) throw err1;
            });
          });
        });
      }
    });
  });
});














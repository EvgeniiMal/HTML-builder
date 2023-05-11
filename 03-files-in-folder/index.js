const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, './secret-folder'), (err, files) => {

  console.log(1, err);
  fs.stat(path.join(__dirname, './secret-folder'), (err, result) => {
  });
  //   const result = path.extname(path.join(__dirname, './secret-folder.jps'));
  console.log(2, result);
});
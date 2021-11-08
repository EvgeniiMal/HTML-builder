let fs = require('fs');
let path = require('path');
const fileBytes = require('file-bytes');
let way = '03-files-in-folder/secret-folder';
let arr = [];
function getFiles(way) {
  let direc = __dirname;
  fs.readdir(way, (err, data) => {
    console.log(way);
    data.forEach(file => {
      let w  = way+'/'+file;
      fs.readFile(w, (err, data) => {
        if (typeof(data) === 'undefined') {
          console.log(getFiles(w));
        }
        else {
          arr.push(file);
          console.log(file, file.split('.')[1]);
          console.log(1, direc);
        }
      });
    });
  });
  //console.log(arr);
}
getFiles(way);

function fB(file) {
  fileBytes(file).then(size => {
    console.log(size);
  });
}

fB('03-files-in-folder/secret-folder/data.csv');

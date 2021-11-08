let fs = require('fs');
// fs.mkdir(`${__dirname}/files-copy`, err => {
//   if(err) throw err; 
//   console.log('Папка успешно создана');
// });

console.log(__dirname);
let way = __dirname+'\\'+'files';
fs.readdir(way, (err, data) => {
    console.log(way);
    data.forEach(file => {
      console.log(file);
    });
  });

  console.log(__dirname+'\\files-copy\\test-js.js');
const writeStream = fs.createWriteStream(__dirname+'\\files-copy\\test-js.js');

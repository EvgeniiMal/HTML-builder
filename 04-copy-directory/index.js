let fs = require('fs');

fs.stat(`${__dirname}/files-copy`, function(err) {
    if (!err) {
        console.log('Директория есть');
    }
    else if (err.code === 'ENOENT') {
        fs.mkdir(`${__dirname}/files-copy`, err => {
            if(err) throw err; 
            console.log('Папка успешно создана');
          });
    }
});
console.log(__dirname);
let way = __dirname+'\\'+'files';
fs.readdir(way, (err, data) => {
    console.log(way);
    data.forEach(file => {
      console.log(file);
      fs.createWriteStream(__dirname+'\\files-copy\\'+file);
      fs.copyFile('04-copy-directory\\files\\'+file, __dirname+'\\files-copy\\'+file, (err) => {
        if (err) throw err;
        console.log('source.txt was copied to destination.txt');
    });
    });
  });



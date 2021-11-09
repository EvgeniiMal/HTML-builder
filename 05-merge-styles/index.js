let fs = require('fs');

//let wS = fs.createWriteStream(`${__dirname}/project-dist/bundle.css`, { flags: 'a' });

fs.open(`${__dirname}/project-dist/bundle.css`, 'a', (err) => {
    if(err) throw err;
    console.log('File created');
});

console.log(__dirname);
let way = __dirname+'\\'+'styles';
fs.readdir(way, (err, data) => {
    console.log(way);
    data.forEach(file => {
        if (file.split('.')[1] == 'css') {
            console.log(file);
            fs.copyFile(__dirname+'\\'+'styles\\'+file, `${__dirname}/project-dist/bundle.css`, (err) => {
              if (err) throw err;
              console.log('was copied to destination');
          });
        // fs.appendFile(`${__dirname}/project-dist/bundle.css`, 'hi',function(err){
        //     if(err) throw err;
        //     console.log('IS WRITTEN');
        //     });
        }
    });
  });



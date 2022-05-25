let fs = require('fs');

fs.readdir('./04-copy-directory/', (err, files) => {
    if(err) throw err; // не прочитать содержимое папки 
    if(!files.includes("files copy")){
        createDirectory();
    } else {
        removeFiles();
    };
 });
 function removeFiles(){
    fs.readdir('./04-copy-directory/files copy/', (err,files) => {
        if(err) throw err;
        files.forEach(file => fs.unlink(`./04-copy-directory/files copy/${file}`, (err) => {if(err) throw err;}));
    }) 
    copyFiles(); 
 }
 function createDirectory(){
        fs.mkdir('./04-copy-directory/files copy/', err => {if(err) throw err; copyFiles();}); 
 }

 function copyFiles(){
    fs.readdir('./04-copy-directory/files/', (err, files) => {
        if(err) throw err; 
        files.forEach(item => copyFile(item));
     });
     function copyFile(item){
        fs.copyFile(`./04-copy-directory/files/${item}`, `./04-copy-directory/files copy/${item}`, (err) => {if (err) throw err;});
     }
 }



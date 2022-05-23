const fs = require('fs');
const path = require('node:path');

const sourceFolder = path.join(__dirname,'styles');
const targetFolder = path.join(__dirname,'project-dist');
const targetFile = path.join(targetFolder ,'bundle.css');


fs.writeFile(targetFile, '', function(error){
  if(error) throw error;});

fs.readdir(sourceFolder, { withFileTypes: true },(err, files) => {
  if (err) console.log(err);
  else {
    files.forEach(file => {
      if (file.isFile()) {
        const ext = path.extname(file.name);
        if (ext.toLowerCase() === '.css') {
          const stream = new fs.ReadStream(path.join(sourceFolder,file.name));
          stream.on('readable', function(){
            const data = stream.read(); 
            if(data != null) {
              fs.appendFile(targetFile, data.toString() + '\n', function(error){
                if(error) throw error;});
            }
          });
        }  
      } });}});
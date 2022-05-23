const fs = require('fs');
const path = require('node:path');

const sourceFolder = path.join(__dirname,'files');
const targetFolder = path.join(__dirname,'files-copy');


function copyDir ( oldDir, newDir )
{
  fs.mkdir(newDir, { recursive: true }, (err) => {
    if (err) throw err;
  });
  fs.readdir(oldDir, { withFileTypes: true },(err, files) => {
    if (err) console.log(err);
    else {
      files.forEach(file => {  
        if (file.isFile())
        {   
          fs.copyFile (path.join(oldDir,file.name),path.join(newDir,file.name),(err) =>
          {
            if (err) console.log(err);    
          });  
        }
        else if (file.isDirectory())
        {
          copyDir ( path.join(oldDir,file.name), path.join(newDir,file.name) );
        }
      });}}); 
}

copyDir ( sourceFolder, targetFolder );
const path = require('node:path');
const fs = require('fs');
const { mkdir } = require('node:fs');
const { stdin,stdout } = process;
let targetPath = path.join(__dirname,'files-copy');
let filePath = path.join(__dirname, 'files');


async function copyfiles(targetPath,filePath){
mkdir(targetPath, { recursive: true }, (err,dir) => { if (err) console.log('error')});
fs.readdir(filePath,{withFileTypes:true},(err,files)=>{
    if (err)
    console.log(err);
  else 
  {
    files.forEach(file => 
    {   
        if (file.isFile()){
        fs.copyFile(path.join(filePath, file.name), path.join(targetPath, file.name), err => 
        {
            if(err) throw err; // не удалось скопировать файл
            console.log('Файл успешно скопирован');
        });}
        else{
          return copyfiles(path.join(targetPath,file.name),path.join(filePath,file.name));

      }
  

    })
  }
});
}
copyfiles(targetPath,filePath);
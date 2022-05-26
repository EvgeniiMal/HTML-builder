const fs = require('fs');
const path = require('path');
const {stat}=require('fs');
const pathFolder = path.join(__dirname, 'secret-folder');
fs.readdir(pathFolder,{withFileTypes: true}, (err, files) => {
  files.forEach(file => {
    if(file.isDirectory()===false){
      let arr=Object.values(file);
      let arr2=arr.toString().split('.');
      const pathFolder2 = path.join(pathFolder, arr.toString());
      let name=arr2[0];
      let name2=arr2[1];
      // let size=(fs.statSync(pathFolder2).size)/1000;
      fs.stat(pathFolder2,(err,stat)=>console.log(`${name} - ${name2} - ${stat.size/1000}kb`));
      // console.log(`${name} - ${name2} - ${size}kb`);
    }});
});

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


// const fs = require('fs');
// const path = require('path');

// let folderPath = path.join(__dirname, 'secret-folder');

// (async () => {
//   try {
//     // withFileTypes: true -> the resulting array is filled with <fs.Dirent> objects, rather than strings or <Buffer>s.  
//     const files = await fs.promises.readdir(folderPath, {withFileTypes: true});   
//     for (const file of files) {
//       if(file.isFile()) {   // dirent.isFile()
//         const filePath = path.join(folderPath, file.name);  
//         const filePathObj = path.parse(filePath);
//         const fileExt = filePathObj.ext.slice(1);
//         const fileSizeKb = (await fs.promises.stat(filePath)).size / 1024;  // bytes->KB
//         const resStr = `${filePathObj.name} - ${fileExt} - ${fileSizeKb}kb`;
//         console.log(resStr);
//       }     
//     }
//   } catch (err) {
//     console.error(err);
//   }
// })();
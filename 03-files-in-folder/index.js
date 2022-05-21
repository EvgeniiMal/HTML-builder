const path = require('node:path');
const fs = require('fs')
const dirPath =path.join(__dirname, 'secret-folder');

fs.readdir(dirPath,{withFileTypes:true},(err,files)=>{

    if (err)
    console.log(err);
  else {
    console.log("\nCurrent directory filenames:");
    files.forEach(file => {
      fs.stat(path.join(__dirname, 'secret-folder',file.name),(err,stats)=>
        {
            let name=file.name;
            if (file.isFile()){
            console.log(name.replace(path.extname(file.name), ''),' - ',path.extname(file.name),' - ',stats.size/1024+'kb');}

        });
    })
  }
})

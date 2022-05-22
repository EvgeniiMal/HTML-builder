const path = require('node:path');
const fs = require('fs');
const { mkdir } = require('node:fs');
const { stdin,stdout } = process;
let targetPath = path.join(__dirname);
let filePath = path.join(__dirname, 'styles');
let info;

fs.readdir(filePath,{withFileTypes:true},(err,files)=>{
    if (err)
    console.log(err);
  else 
  {
    files.forEach(file => 
    { 
        if(path.extname(file.name)==='.css')
        {
            let readableStream = fs.createReadStream(
                path.join(filePath,file.name),
                'utf8'
            )
            
            
            
            readableStream.on('data', function (chunk) {
                info+=chunk.toString();
            })
            readableStream.on('end',function (){
                let writeableStream = fs.createWriteStream(path.join(__dirname,'project-dist','bundle.css'));
                
                    writeableStream.write(info);
                  
            })
        }
    })
  }
})
let writeableStream = fs.createWriteStream(path.join(__dirname,'project-dist','bundle.css'))

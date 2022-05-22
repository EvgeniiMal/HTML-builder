const path = require('node:path');
const fs = require('fs');
const { mkdir } = require('node:fs');
const { stdin,stdout } = process;
let targetPath = path.join(__dirname,'project-dist');
let stylePath = path.join(__dirname, 'styles');
let assetPath = path.join(__dirname,'assets');
let projectAssetPath=path.join(targetPath,'assets');
let htmlPath = path.join(__dirname,'template.html');
let componentPath = path.join(__dirname,'components');
let info;
let html='';
let components=[];
mkdir(targetPath, { recursive: true }, (err,dir) => { if (err) console.log('error')});
fs.readdir(stylePath,{withFileTypes:true},(err,files)=>{
    if (err)
    console.log(err);
  else 
  {
    files.forEach(file => 
    { 
        if(path.extname(file.name)==='.css')
        {
            let readableStream = fs.createReadStream(
                path.join(__dirname,'styles',file.name),
                'utf8'
            )
            
            
            
            readableStream.on('data', function (chunk) {
                info+=chunk.toString();
            })
            readableStream.on('end',function (){
                let writeableStream = fs.createWriteStream(path.join(__dirname,'project-dist','style.css'));
                
                    writeableStream.write(info);
                  
            })
        }
    })
  }
})

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
            });}
            else{
              return copyfiles(path.join(targetPath,file.name),path.join(filePath,file.name));
    
          }
      
    
        })
      }
    });
    }
copyfiles(projectAssetPath,assetPath);


let htmlStream = fs.createReadStream(
    htmlPath,
    'utf8'
  )
  
htmlStream.on('data', chunk => html+=chunk);
async function replacehtml(file){
    
                let replaceName=new RegExp('{{'+file.name.replace(path.extname(file.name), '')+'}}');
                
            if(path.extname(file.name)==='.html')
            {
                let content = await fs.readFile(
                    path.join(__dirname,'components',file.name),
                    'utf8',(err,data)=>{
                        
                        html=html.replace(replaceName,data);
                        let writeableStream = fs.createWriteStream(path.join(__dirname,'project-dist','index.html'));
                
                        writeableStream.write(html);
                      
                    }
                )
                
               

                        
                        
                   
            }
           
}
htmlStream.on('end',()=>{
    
    fs.readdir(componentPath,{withFileTypes:true},(err,files)=>{
        if (err)
        console.log(err);
      else 
    {for(let file of files) 
        {
        replacehtml(file);
        }
    }
    



})
});

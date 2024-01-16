const {stat} =require('fs');
const {readdir} = require('fs/promises')
const path=require('path');

const pathFile=path.resolve(__dirname,'secret-folder');

async function readFileFunc(){
    const readFile = await readdir(pathFile,{withFileTypes: true})
    for(const files of readFile ){
        if(files.isDirectory()){
            continue
        }else{
            let extname = path.extname(files.name);
            let fileName =files.name.slice(0,files.name.length - extname.length);

            const pathOfFile= path.join(pathFile, files.name)

            stat(pathOfFile,(err,stats)=>{
                let fileSize = stats.size
                console.log(`${fileName} -${extname.slice(1)}-${fileSize}b`)
            })
        }
    }
}
readFileFunc()
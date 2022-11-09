const fs = require("fs");
const { readdir, copyFile, constants } = require("fs/promises");
const path =require('path');
const fsPromises = fs.promises

const pathFile = path.resolve(__dirname,'files')

const desForCopy=path.resolve(__dirname,'files-copy')

fsPromises.mkdir(desForCopy,{recursive:true},(err)=>{
    if(err) throw err
});

async function readCopyFile(){
    const readOriginPath = await readdir(pathFile)
    for(const files of readOriginPath){
        console.log(files)
        let originPath = path.resolve(pathFile,files)
        let copyPath = path.resolve(desForCopy,files)
        await copyFile(originPath,copyPath,constants.COPYFILE_EXCL)
    }
    
}
readCopyFile()


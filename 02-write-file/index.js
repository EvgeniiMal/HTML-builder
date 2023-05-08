const {stdin,stdout}=process;
const fs=require('fs');
const path=require('path');

const pathWrite = path.join(__dirname,'text.txt');

const createWriteFs= fs.createWriteStream(pathWrite)

const endMessage=()=>{
stdout.write('File text.txt already created')
process.exit()}

stdout.write('Plese write text\n');

stdin.on('data',data=>{
    
    const dataString=data.toString().trim()

    if(dataString === 'exit'){
        endMessage()
    }else{
        createWriteFs.write(data)
    }
})

process.on('SIGINT',()=>process.exit())


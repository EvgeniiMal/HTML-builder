const path = require('node:path');
const fs = require('fs')
const { stdin } = process;
const filePath=path.join(__dirname, 'text.txt')
console.log('Введите текст, который хотите записать. exit или ctrl+c для выхода')
process.on('exit',() =>console.log('\nПока!'));
process.on('SIGINT', () => process.exit() );

stdin.on('data', data =>{
    let dataString=data.toString();
    if (dataString.includes('exit'))
        {
            process.exit()            
        }
    else
        {
            fs.appendFile(filePath,data.toString(), function (err) {
                if (err) throw err;
              });
        }


})

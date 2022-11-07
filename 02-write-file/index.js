const fs = require('fs');
const path = require('path');
const stream = fs.createWriteStream(path.resolve(__dirname,'text.txt'), 'utf-8');
const { stdin, stdout } = process;


stdout.write('Введите текст \n');

stdin.on('data', data => {
     
if( data.toString().trim() === 'exit' || data.toString().trim() === 'exit\n'){
    stdout.write('Удачи!');
    process.exit();
} 
    stream.write(data.toString()); 
    process.on('SIGINT', exitHandler.bind(null, {exit:true}));
});

process.stdin.resume();

function exitHandler(options, exitCode) {
    
    if (exitCode || exitCode === 0) console.log('Удачи!\n');
    if (options.exit) process.exit();
}

//process.on('exit', () => stdout.write('Удачи!'));
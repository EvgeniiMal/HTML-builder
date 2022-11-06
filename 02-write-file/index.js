const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;
const stream = require('stream');


const filePath = path.resolve(__dirname, 'text.txt');

const output = fs.createWriteStream(filePath);
stdout.write("Файл создан, можете вводить данные: \n");

stdin.on('data', function (data) {
	if (data.toString() == 'exit\r\n') process.exit();
	output.write(data);
});


process.on('SIGINT', () => { process.exit(); })
process.on('exit', () => { console.log("Удачи и ВСЁ ГО ХО РО ШЕ ГО") })
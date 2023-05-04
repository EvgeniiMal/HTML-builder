const fs = require('fs');
const path = require('path');
const {stdout} = require('process');
//const {stdout} = process;    // или такая запись
const input =fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
input.on('data', data => stdout.write(data));

//--------------------------------------------------------
//console.log(__dirname);  //абсолютный путь к директории
//console.log(__filename);  //абсолютный путь к файлу

//--------------------------------------------------------
/* Напишите программу, которая возвращает путь к папке, 
если запускается с флагом '-d', или путь к файлу, 
если запускается с флагом '-f'. */

/* const { stdout } = process;
const flag = process.argv[2];

if (flag === '-d') {
    stdout.write(__dirname);
} else if (flag === '-f') {
    stdout.write(__filename);
} else {
    stdout.write('Пожалуйста, запустите программу с флагом -d или -f');
} */

//-----------------------------------------------------------------------------

// для файла, расположенного по адресу C:\Users\Admin\Desktop\nodejs-basic\index.js
/* const path = require('path'); */
//console.log(path.basename(__filename)) // index.js - имя файла на Windows, полный путь к файлу на POSIX-системах
//console.log(path.dirname(__filename)) // C:\Users\Admin\Desktop\nodejs-basic - название папки
//console.log(path.extname(__filename)) // .js - расширение файла
//c//onsole.log(path.parse(__filename)); // возвращает объект в котором указывается корень диска, имя папки, имя файла, расширение файла, имя файла без расширения

//----------------------------------------------------------------------------------

//Конкатенация путей

// для файла, расположенного по адресу C:\Users\Admin\Desktop\nodejs-basic\index.js
//const path = require('path');

// вернет C:\Users\Admin\Desktop\nodejs-basic\test\second.html
//console.log(path.join(__dirname, 'test', 'second.html'));

//----------------------------------------------------------------------------------


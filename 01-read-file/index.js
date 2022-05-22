const fs = require('node:fs');
const path = require('node:path');

fs.readFile(path.join(__dirname,'text.txt'), 'utf8', function(error,data){
  if(error) throw error; // если возникла ошибка
  console.log(data);  // выводим считанные данные
});
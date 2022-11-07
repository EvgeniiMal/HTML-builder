const fs = require('fs')
const path = require('path')

fs.promises.readdir(path.join(__dirname, './secret-folder'), {withFileTypes: true})
// перебираем файлы
.then(files => files.forEach(element => {
    if (element.isFile()) {
      fs.stat(path.join(__dirname, './secret-folder', element.name), (err, stats) => {
        if(err) {
         return console.error(err) 
        }
//         выводим в консоль согласно  формата
        console.log(`${element.name.split('.')[0]} - ${element.name.split('.')[1]} - ${Number(stats.size / 1024).toFixed(3)}kb`)
      });
    }
}))
.catch((err) => console.error(err))

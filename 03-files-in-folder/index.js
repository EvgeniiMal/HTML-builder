const fs = require('fs')
const path = require('path')

let folder=path.join(__dirname , '/secret-folder')

fs.readdir(folder ,  (err, data) => {

    data.forEach( file => {
        fs.stat(folder + '/' + file, (err, stats) => {
            if (!stats.isDirectory()) {
                console.log(path.basename(file, path.extname(file)) + ' - ' + path.extname(file).slice(1) + ' - ' + (fs.statSync(path.join(folder, file)).size)/1000 + 'kb');
            }
        })
         
    });
})
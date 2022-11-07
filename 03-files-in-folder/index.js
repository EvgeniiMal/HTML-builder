const fs = require('fs')
const path = require('path')

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        if (file.isFile()) {
            fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
                const fileName = path.parse(path.join(__dirname, 'secret-folder', file.name)).name;
                const fileType = path.extname(path.join(__dirname, 'secret-folder', file.name)).slice(1);
                const fileSize = stats.size;
                console.log(`${fileName} - ${fileType} - ${fileSize}`);
            })
        }
    });
}); 
 
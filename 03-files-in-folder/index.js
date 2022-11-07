const fs = require('fs');
const path = require('path');

fs.readdir(
    path.join(__dirname, 'secret-folder'),
    { withFileTypes: true },
    (err, data) => {
        if (err) throw err;
        data.forEach((item) => {
            if (item.isFile()) {
                let name = getType(item.name, 'name');
                let type = getType(item.name, 'ext');
                fs.stat(
                    path.join(__dirname, 'secret-folder', item.name),
                    (err, stat) => {
                        if(err) throw err
                        console.log(`${name} - ${type} - ${stat.size} bytes`)
                    }
                )
            }
        })
    }
)
function getType(file, parament) {
    return path.parse(
        path.join(__dirname, 'secret-folder', file)
    )
    [parament].
        replace('.', "");
}
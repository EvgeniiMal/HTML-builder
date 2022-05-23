const fs = require('fs');
var path = require('path');

var dir = __dirname + '/upload';
if (!path.existsSync(dir)) {
    fs.mkdirSync(dir, 0744);
}

function fromDir(startPath, filter) {


    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter); //recurse
        } else if (filename.endsWith(filter)) {
            console.log('-- found: ', filename);
        };
    };
};

fromDir('*', '*');
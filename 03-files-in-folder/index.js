const fs = require ('fs');
const path = require ('path');

fs.readdir ('./03-files-in-folder/secret-folder', {withFileTypes: true}, (error, dirEntryList) => {
    if(!error) {
        dirEntryList.forEach((dirEntry) => {
            if (dirEntry.isFile()) {
                fs.stat(`./03-files-in-folder/secret-folder/${dirEntry.name}`,(error,stats) => {
                console.log(`${dirEntry.name}`,`-`, `${path.extname(dirEntry.name)}`,`-`, `${stats.size}`);})
            }
        });
    } else {
        console.error(error);
    };
});
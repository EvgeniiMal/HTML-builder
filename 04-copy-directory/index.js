const fs = require('fs')
const path = require('path')

function copyDir() {
let  folder = path.join(__dirname , '/files-copy')
let  folderSrc = path.join(__dirname , '/files')

fs.stat(folder, function(err) {
    if (err) {
        fs.mkdir(folder, (err) => {
		  if (err) throw err;
		})
    } 
});

fs.readdir(folderSrc ,  (err, data) => {

    data.forEach( file => {
					srcFile = path.join(folderSrc , file)
					resFile = path.join(folder , file)
					fs.copyFile(srcFile , resFile, (err) => {
						if (err) {
						console.log("Error Found:", err)
						}
					});
				});
		})
}

copyDir()
const fs = require('fs')
const path = require('path')

function copyDir() {
	

let  folder = path.join(__dirname , '/files-copy')
let  folderSrc = path.join(__dirname , '/files')

fs.mkdir(folder, (err) => {})

fs.stat(folder, function(err) {
    if (err) {
        fs.mkdir(folder, (err) => {
		  if (err) throw err;
		})
    } 
});

fs.readdir(folder ,  (err, data) => {

    data.forEach( file => {
					let fileDel = path.join(folder , file) 
					fs.unlink (fileDel,  err => {})
				});
		})
		
		


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
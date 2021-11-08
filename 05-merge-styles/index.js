const fs = require('fs')
const path = require('path')

let cssFolder=path.join(__dirname , 'styles')
let resFile=path.join(__dirname , 'project-dist', 'bundle.css')


fs.unlink (resFile,  err => {})
fs.writeFile (resFile, '\n', err => {})


fs.readdir(cssFolder ,  (err, files) => {

    files.forEach( file => {
        let pathFile=path.join(cssFolder , file)
        fs.stat(pathFile, (err, stats) => {
            if (!stats.isDirectory() && (path.extname(file).slice(1) === 'css') ) {
					fs.createReadStream(pathFile, 'utf8').on('data', (arr) =>{
						
						
						
						fs.appendFile (resFile, arr +  '\n', err => {
								
								})
						
						
					})
				
            }
        })
         
    });
})



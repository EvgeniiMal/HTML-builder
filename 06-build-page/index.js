const fs = require('fs')
const path = require('path')

const resultPath = path.resolve(__dirname, 'project-dist');
const assetsPathSRC = path.resolve(__dirname, 'assets');
let  folderAssRes = path.join(resultPath , 'assets')
let sourcePath = path.join(__dirname, "template.html")
let readStreamTemp = fs.createReadStream(sourcePath, "utf8");
let sourcePathComp = path.join(__dirname, "components");

function createStyles() {
    let cssFolder=path.join(__dirname , 'styles')
    let resFile=path.join(__dirname , 'project-dist', 'style.css')
    fs.unlink (resFile,  err => {})
    fs.writeFile (resFile, '\n', err => {})
    fs.readdir(cssFolder ,  (err, files) => {
        files.forEach( file => {
            let pathFile=path.join(cssFolder , file)
            fs.stat(pathFile, (err, stats) => {
                if (!stats.isDirectory() && (path.extname(file).slice(1) === 'css') ) 
				{
					fs.createReadStream(pathFile, 'utf8').on('data', (arr) =>{
						fs.appendFile (resFile, arr +  '\n', err => {})  
					})
                }
            })
        });
    })
}
    
function createFolder(path) {
    fs.mkdir(path, {
        recursive: true
    }, (err) => {});
}

function copyFiles(assetsPathSRC , folderAssRes) {
	fs.readdir(assetsPathSRC ,  (err, data) => {
    	data.forEach( file => {
			let srcFile = path.join(assetsPathSRC , file)
			let resFile = path.join(folderAssRes , file)
			fs.stat(srcFile, (err, stats) =>{					
				if (!stats.isDirectory()){
						fs.copyFile(srcFile , resFile, (err) => {});
				} else 
					{
						createFolder(resFile)
						copyFiles(srcFile, resFile)
					}
			});
		});
	})
}








function rebuildHtml() {

	readStreamTemp.on("data", function (data) {

		fs.readdir(sourcePathComp, {
				withFileTypes: true
			},
			(err, files) => {
				if (err)
					console.log(err);
				else {
					let tempString = data.toString();
					for (let i = 0; i < files.length; i++) {
						let filePath = path.join(__dirname, "components", files[i].name)
						var readStream = fs.createReadStream(filePath, 'utf8');

						readStream.on('data', function (dataFile) {
							let x = files[i].name.split(".")[0];
							let y = dataFile;
							readAndReplace(tempString, x, y)
						});

						function readAndReplace(text, x, y) {
							text = text.replace(`{{${x}}}`, y)
							tempString = text.slice()
							let writeableStreamIndex = fs.createWriteStream(path.join(__dirname, "project-dist", "index.html"));
							writeableStreamIndex.write(text);
							return text
						}
					}
				}
			})
	})
}



fs.mkdir(resultPath, (err) => {})
fs.mkdir(folderAssRes, (err) => {})
copyFiles(assetsPathSRC, folderAssRes)
createStyles()
rebuildHtml()
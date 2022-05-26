// const fs = require('fs');
// const path = require('path');
// const pathFolder = path.join(__dirname, 'project-dist');
// const pathFolder2 = path.join(pathFolder, 'bundle.css');
// const pathFolder3 = path.join(__dirname, 'styles');
// fs.readdir(pathFolder3, (err, files) => {
//   if(err) throw err;
//   files.map(file=>
//     fs.stat(path.join(pathFolder3, file), (err, stats) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       if(stats.isFile()===true &&  path.extname(file)==='.css'){
//           console.log(file);
//         fs.readFile(path.join(pathFolder3, file),'utf8', function(error, fileContent){ 
//           if(error) throw error; // ошибка чтения файла, если есть
//           let toWrite=fileContent;
//           console.log(toWrite);
//           fs.createWriteStream(pathFolder2).write(toWrite);
//         });
//       }
//     })
//   );
// });



const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');
const pathfolder2 = path.join(__dirname, 'project-dist');
const pathfolder1 = path.join(__dirname, 'styles');

async function addFile(pathfolder1, pathfolder2) {
  try {
    const pathfolder3 = fs.createWriteStream(path.join(pathfolder2, 'bundle.css'));
    const pathfolder1_1 = await readdir(pathfolder1, {withFileTypes: true});
    console.log(pathfolder1_1);
    for (let style of pathfolder1_1) {
      if (style.isFile() && style.name.includes('.css')) {
        const stylefile = fs.createReadStream(path.join(pathfolder1, style.name), 'utf-8');
        stylefile.pipe(pathfolder3);
      }
    }
  } catch (err) {
    console.log(err.message);
  }
}

addFile(pathfolder1, pathfolder2);



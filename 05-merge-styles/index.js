const { resolve } = require('path');
const fs = require('fs');
const path = require('node:path');
const startDir = path.join(__dirname, 'styles');
const destinationDir = path.join(__dirname, 'project-dist');

async function getFiles(dir) { // create filelist to copy
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
  // recursion if need
  const files = await Promise.all(dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files); // all path to massive
}

getFiles(startDir)
  .then(function(files){
    let writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist\\bundle.css'), 'utf8');
    files.forEach(element => {
      if (path.extname(element) === '.css') {
        let readableStream = fs.createReadStream(element, 'utf8');
        readableStream.on('data', (chunk) => writeStream.write(chunk));
      }
    });
    console.log('bundle is OK');
  })
  .catch(err => console.error(err));
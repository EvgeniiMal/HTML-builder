const { resolve } = require('path');
const fs = require('fs').promises;
const path = require('node:path');
const startDir = __dirname + '\\files';
const destinationDir = __dirname + '\\files-copy';
let fileList = [];

async function getFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  // recursion if need
  const files = await Promise.all(dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

fs.mkdir(destinationDir)
  .then(() => console.log('Directory created successfully'))
  .catch(() => console.log('directory exists'));

getFiles(startDir)
  .then(function(files){
    files.forEach(element => {
      fs.copyFile(element, destinationDir + '\\'+ path.basename(element));
    });
  })
  .catch(err => console.error(err));
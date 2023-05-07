const { resolve } = require('path');
const fs = require('fs').promises;
const path = require('node:path');
const startDir = path.join(__dirname, 'files');
const destinationDir = path.join(__dirname, 'files-copy');

async function getFiles(dir) { // create filelist to copy
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  // recursion if need
  const files = await Promise.all(dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files); // all path to massive
}

// create folder
fs.mkdir(destinationDir)
  .then(() => console.log('Directory created successfully'))
  .catch(() => console.log('directory exists'));

getFiles(startDir)
  .then(function(files){
    files.forEach(element => { // copy files to destination folder
      fs.copyFile(element, path.join(destinationDir, path.basename(element)));
    });
    console.log('files copied');
  })
  .catch(err => console.error(err));
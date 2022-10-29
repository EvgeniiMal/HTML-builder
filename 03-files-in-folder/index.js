const path = require('path');
const { readdir, stat } = require('fs/promises');
const folderName = 'secret-folder';
const directoryPath = path.join(__dirname, folderName);

async function showFileInfo(fileName) {
  try {
    const { name, ext } = path.parse(fileName);
    const { size } = await stat(path.join(__dirname, folderName, fileName));
    console.log(`${name} - ${ext.replace('.', '')} - ${size / 1024}kb`);
  } catch (err) {
    console.error('Произошла ошибка: ', err);
  }
}

async function readFilesInFolder() {
  try {
    const files = await readdir(directoryPath, { withFileTypes: true });
    for (const file of files) {
      file.isFile() && showFileInfo(file.name);
    }
  } catch (err) {
    console.error('Произошла ошибка: ', err);
  }
}
readFilesInFolder();

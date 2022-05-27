const fs = require('fs');
const path = require('path');

const copyFolderPath = path.join(__dirname, 'files-copy');
const folderPath = path.join(__dirname, 'files');

async function copyDir () {
  try {
    // create folder copy
    await fs.promises.mkdir(copyFolderPath, { recursive: true });
    
    // delete files from folder copy
    const copyFiles = await fs.promises.readdir(copyFolderPath, {withFileTypes: true});   
    for (const file of copyFiles) {
      const copyFilePath =  path.join(copyFolderPath, file.name);
      await fs.promises.rm(copyFilePath, {recursive: true});
    }

    // copy files
    const files = await fs.promises.readdir(folderPath, {withFileTypes: true});   
    for (const file of files) {
      const filePath = path.join(folderPath, file.name);
      const copyFilePath =  path.join(copyFolderPath, file.name);
      await fs.promises.copyFile(filePath, copyFilePath);
    }

    console.log('Files succesfully copied!');
  } catch (err) {
    console.error(err);
  }
}

copyDir();
const path = require('path');
const { mkdir, copyFile, readdir, unlink } = require('fs/promises');

const folderPath = path.join(__dirname, 'files');
const newFolderPath = path.join(__dirname, 'files-copy');

async function copyFilesFromFolder() {
  try {
    await mkdir(newFolderPath, { recursive: true });
    const filesInNewFolder = await readdir(newFolderPath);
    const filesToCopy = await readdir(folderPath);
    if (filesInNewFolder.length) {
      for (const file of filesInNewFolder) {
        await unlink(path.join(newFolderPath, file));
      }
    }
    for (const file of filesToCopy) {
      await copyFile(path.join(folderPath, file), path.join(newFolderPath, file));
    }
  } catch (err) {
    console.error('Произошла ошибка: ', err);
  }
}
copyFilesFromFolder();

const fs = require('fs');
const fsP = fs.promises;
const path = require('path');

const pathFromCopyFolder = path.join(__dirname, 'files');
const pathToCopyFolder = path.join(__dirname, 'files-copy');

fs.access(pathToCopyFolder, (error) => {
  if (error) {
    fsP.mkdir(pathToCopyFolder);
    console.log('Папка files-copy создана');
  } else {
    console.log('Папка files-copy уже существует');
  }
});

async function copyDir(fromPath, toPath) {
  await fsP.rm(toPath, { force: true, recursive: true });
  await fsP.mkdir(toPath, { recursive: true });

  const filesNameArr = await fsP.readdir(fromPath, { withFileTypes: true });

  for (let item of filesNameArr) {
    const currentItemPath = path.join(fromPath, item.name);
    const copyItemPath = path.join(toPath, item.name);

    if (item.isDirectory()) {
      await fsP.mkdir(copyItemPath, { recursive: true });
      await copyDir(currentItemPath, copyItemPath);
    } else if (item.isFile()) {
      await fsP.copyFile(currentItemPath, copyItemPath);
    }
  }
}

copyDir(pathFromCopyFolder, pathToCopyFolder);
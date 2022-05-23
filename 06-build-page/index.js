const fs = require('fs');
const fsP = fs.promises;
const path = require('path');

const pathCreateFolder = path.join(__dirname, 'project-dist');
const pathNewAssets = path.join(pathCreateFolder, 'assets');
const pathNewCss = path.join(pathCreateFolder, 'style.css');
const pathNewHtml = path.join(pathCreateFolder, 'index.html');


const pathComponents = path.join(__dirname, 'components');
const pathAssets = path.join(__dirname, 'assets');
const pathCss = path.join(__dirname, 'styles');
const pathTemplateHtml = path.join(__dirname, 'template.html');

async function createFolder(inputPath) {
  fs.access(pathCreateFolder, (error) => {
    if (error) {
      fsP.mkdir(inputPath);
    }
  });
}

async function createFile(inputPath, content) {
  return await fsP.writeFile(inputPath, content);
}

async function mergeFiles() {
  let arrOfStyles = [];
  const filesNameArr = await fsP.readdir(pathCss, { withFileTypes: true });

  for (let item of filesNameArr) {
    const pathToCurrentFile = path.join(pathCss, item.name);
    const fileType = path.extname(pathToCurrentFile);

    if (fileType === '.css') {
      const cssContent = await fsP.readFile(pathToCurrentFile, 'utf8');
      arrOfStyles.push(`${cssContent}\n\n`);
    }
  }

  createFile(pathNewCss, arrOfStyles);
}

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

async function pasteComponents() {
  let htmlBase = await fsP.readFile(pathTemplateHtml, 'utf-8');
  const filesNameArr = await fsP.readdir(pathComponents, { withFileTypes: true });

  for (let item of filesNameArr) {
    const componentContent = await fsP.readFile(path.join(pathComponents, `${item.name}`), 'utf-8');
    const regExp = new RegExp(`{{${(item.name).split('.')[0]}}}`, 'g');
    htmlBase = htmlBase.replace(regExp, componentContent);
  }

  createFile(pathNewHtml, htmlBase);
}

async function buildPage() {
  createFolder(pathCreateFolder);
  mergeFiles();
  copyDir(pathAssets, pathNewAssets);
  pasteComponents();
}

buildPage();
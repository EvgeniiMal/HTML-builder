const fs = require("node:fs");
const fsPr = require("fs/promises");
const path = require("node:path");
const CSS_EXT = ".css";
const HTML_EXT = ".html";

buildDistFolder(__dirname);

async function buildDistFolder(dirname) {
  const templatePath = path.resolve(dirname, "template.html");
  const componentsPath = path.resolve(dirname, "components");
  const distPath = path.resolve(dirname, "project-dist");
  const cssPath = path.resolve(distPath, "style.css");
  const stylesPath = path.resolve(dirname, "styles");
  const assetsInitPath = path.resolve(dirname, "assets");
  const assetsDistPath = path.resolve(distPath, "assets");

  await getFolder(distPath);
  buildHtml(templatePath, distPath, componentsPath);
  buildBundle(stylesPath, cssPath);
  copyFolderWithContent(assetsInitPath, assetsDistPath);
}

async function replaceTags(tempPath, indexHtml, componentsPath) {
  const transformedData = fs.createWriteStream(indexHtml);
  let templateContent =await fsPr.readFile(tempPath);
  
  for (const file of await fsPr.readdir(componentsPath, {  withFileTypes: true})) {
    if (file.isFile() && path.extname(file.name) === HTML_EXT) {
      const _path = path.resolve(componentsPath, file.name);
      let data = await fsPr.readFile(_path, "utf8");
      const tag = `{{${file.name.split(".")[0]}}}`;
      templateContent = templateContent.toString().replace(tag, data.toString());

    }
  }
  transformedData.write(templateContent);
}

function copyFile(filePath, outputPath) {
  const outputStream = fs.createWriteStream(outputPath);
  const streamToCopy = fs.createReadStream(filePath);
  streamToCopy.pipe(outputStream);
}

async function buildHtml(templatePath, distPath, componentsPath) {
  const htmlPath = path.resolve(distPath, "index.html");
  replaceTags(templatePath, htmlPath, componentsPath);
}

async function cleanFolder(folderPath) {
  for (const file of await fsPr.readdir(folderPath, { withFileTypes: true })) {
    const _deletedPath = path.resolve(folderPath, file.name);
    if (file.isFile()) {
      await fsPr.unlink(_deletedPath);
    } else {
      await cleanFolder(_deletedPath);
      await fsPr.rmdir(_deletedPath);
    }
  }
}

async function getFolder(folderPath) {
  await fsPr.access(folderPath).catch(async () => {
    await fsPr.mkdir(folderPath, { recursive: true });
  });
  await cleanFolder(folderPath);
}

async function copyFolderWithContent(initFolderPath, copiedFolderPath) {
  await getFolder(copiedFolderPath);
  const files = await fsPr.readdir(initFolderPath, { withFileTypes: true });
  files.forEach(async (file) => {
    const initFilePath = path.resolve(initFolderPath, file.name),
      copiedFilePath = path.resolve(copiedFolderPath, file.name);
    if (file.isFile()) {
      await copyFile(initFilePath, copiedFilePath);
    } else {
      await copyFolderWithContent(initFilePath, copiedFilePath);
    }
  });
}

async function getStylesArray(folderPath) {
  let stylesFiles = [];
  for (const file of await fsPr.readdir(folderPath, { withFileTypes: true })) {
    if (file.isFile() && path.extname(file.name) === CSS_EXT) {
      stylesFiles.push(path.resolve(folderPath, file.name));
    }
  }
  return stylesFiles;
}

async function buildBundle(stylesFolderPath, bundlePath) {
  const styleFilePathes = await getStylesArray(stylesFolderPath);
  if (styleFilePathes?.length !== 0) {
    const bundleStream = fs.createWriteStream(bundlePath);
    styleFilePathes.forEach(async (filePath) => {
      const streamToCopy = fs.createReadStream(filePath);
      streamToCopy.pipe(bundleStream);
    });
  }
}

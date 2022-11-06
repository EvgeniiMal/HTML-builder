const fs = require("node:fs");
const fsPr = require("fs/promises");
const path = require("node:path");
const CSS_EXT = ".css";
const stylesFolderPath = "05-merge-styles/styles";
const bundlePath = "05-merge-styles/project-dist/bundle.css";

async function getStylesArray(folderPath) {
  let stylesFiles = [];
  for (const file of await fsPr.readdir(folderPath, { withFileTypes: true })) {
    if (file.isFile() && path.extname(file.name) === CSS_EXT) {
      stylesFiles.push(path.resolve(folderPath, file.name));
    }
  }
  return stylesFiles;
}

async function buildBundle(initFolderPath) {
  const styleFilePathes = await getStylesArray(initFolderPath);
  if (styleFilePathes?.length !== 0) {
    const bundleStream = fs.createWriteStream(bundlePath);
    styleFilePathes.forEach(async (filePath) => {
      const streamToCopy = fs.createReadStream(filePath);
      streamToCopy.pipe(bundleStream);
    });
  }
}
buildBundle(stylesFolderPath);

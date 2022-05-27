const fs = require('fs');
const path = require('path');

// assets
const assetsFolderPath = path.join(__dirname, 'assets');
const distAssetsFolderPath = path.join(__dirname, 'project-dist', 'assets');
// styles
const stylesFolderPath = path.join(__dirname, 'styles');
const distStyleFilePath = path.join(__dirname, 'project-dist', 'style.css');
// HTML
const componentsFolderPath = path.join(__dirname, 'components');
const temlateHTMLFilePath = path.join(__dirname, 'template.html');
const distHTMLFilePath = path.join(__dirname, 'project-dist', 'index.html');

const createFolder = async (distPath) => {
  try {
    await fs.promises.mkdir(distPath, { recursive: true });
  } catch (err) {
    console.error(err);
  }
};

const clearDir = async (dirPathToClear) => {
  try {
    const dirEntities = await fs.promises.readdir(dirPathToClear, {
      withFileTypes: true,
    });
    for (const entity of dirEntities) {
      const entityPath = path.join(dirPathToClear, entity.name);
      await fs.promises.rm(entityPath, { recursive: true });
    }
  } catch (err) {
    console.error(err);
  }
};

const copyDir = async (fromPath, distPath) => {
  try {
    const files = await fs.promises.readdir(fromPath, { withFileTypes: true });
    for (const entity of files) {
      if (entity.isDirectory()) {
        const dirPath = path.join(fromPath, entity.name);
        const distDirPath = path.join(distPath, entity.name);
        await createFolder(distDirPath);
        await copyDir(dirPath, distDirPath);
      }
      if (entity.isFile()) {
        const filePath = path.join(fromPath, entity.name);
        const distFilePath = path.join(distPath, entity.name);
        await fs.promises.copyFile(filePath, distFilePath);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

const copyAssetsDir = async (assetsPath, distAssetsPath) => {
  try {
    // create assets folder
    await createFolder(distAssetsPath);
    // delete files/folders from assets folder
    await clearDir(distAssetsPath);
    // copy assets dir
    await copyDir(assetsPath, distAssetsPath);

    console.log('Assets folder succesfully copied!');
  } catch (err) {
    console.error(err);
  }
};

const createStylesBundle = async (stylesPath, distStylePath) => {
  try {
    await fs.promises.writeFile(distStylePath, ''); //clean result file
    const files = await fs.promises.readdir(stylesPath, {
      withFileTypes: true,
    });
    for (const file of files) {
      const filePath = path.join(stylesPath, file.name);
      const filePathObj = path.parse(filePath);
      if (file.isFile() && filePathObj.ext === '.css') {
        let data = '';
        const readableStream = fs.createReadStream(filePath, 'utf-8');
        readableStream.on('data', (chunk) => (data += chunk));
        readableStream.on('end', () =>
          fs.promises.appendFile(distStylePath, data + '\n')
        );
      }
    }
    console.log('style.css succesfully created!');
  } catch (err) {
    console.error(err);
  }
};

const createHTMLBundle = async (
  temlateHTMLPath,
  componentsPath,
  distHTMLPath
) => {
  try {
    // clean result file
    await fs.promises.writeFile(distHTMLPath, '');
    // read template to str
    let templateStr = await fs.promises.readFile(temlateHTMLPath, {
      encoding: 'utf-8',
    });

    // ? - lazy select, select tags to replace
    const tempTagsToReplace = templateStr
      .match(/{{(.+?)}}/g)
      .map((s) => s.replace(/[{}]/g, ''));

    const files = await fs.promises.readdir(componentsPath, {
      withFileTypes: true,
    });
    for (const file of files) {
      const filePath = path.join(componentsPath, file.name);
      const filePathObj = path.parse(filePath);
      if (
        file.isFile() &&
        filePathObj.ext === '.html' &&
        tempTagsToReplace.includes(filePathObj.name)
      ) {
        const componentsFileStr = await fs.promises.readFile(filePath, {
          encoding: 'utf-8',
        });
        templateStr = templateStr.replace(`{{${filePathObj.name}}}`, componentsFileStr);
      }
    }

    fs.promises.appendFile(distHTMLPath, templateStr);

    console.log('index.html succesfully created!');
  } catch (err) {
    console.error(err);
  }
};

// Assembling an HTML page from components and styles
(async () => {
  await copyAssetsDir(assetsFolderPath, distAssetsFolderPath);
  await createStylesBundle(stylesFolderPath, distStyleFilePath);
  await createHTMLBundle(
    temlateHTMLFilePath,
    componentsFolderPath,
    distHTMLFilePath
  );
})();
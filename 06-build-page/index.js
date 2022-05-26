// const fs = require('fs');
// const path = require('path');
// const {mkdir, copyFile, readdir, rm} = require('fs/promises');
// const pathProjectDist = path.join(__dirname, 'project-dist');
// const pathTemplate = path.join(__dirname, 'template.html');
// const pathComponents = path.join(__dirname, 'components');
// const pathAssets = path.join(__dirname, 'assets');
// const pathStyles = path.join(__dirname, 'styles');
// async function wrireHTML(pathTemplate, pathComponents) {
//   try {
//     const readTemplate = fs.createReadStream(pathTemplate, 'utf-8');
//     let templateData = '';
//     readTemplate.on('data', chunk => templateData += chunk);
//     readTemplate.on('end', async () => {
//       const components = await readdir(pathComponents, {withFileTypes: true});
//       for (let component of components) {
//         const readComponents= fs.createReadStream(path.join(pathComponents, component.name), 'utf-8');
//         const componentName = path.basename(path.join(pathComponents, component.name), '.html');
//         let componentsData = '';
//         readComponents.on('data', chunk => componentsData += chunk);
//         readComponents.on('end', () => {
//           templateData = templateData.replace(`    {{${componentName}}}`, componentsData);
//           const result = fs.createWriteStream(path.join(pathProjectDist, 'index.html'));
//           result.write(templateData);
//         });
//       }
//     });
//   } catch (err) {
//     console.log(err.message);
//   }
// }

// async function copyDirectory(oldFolder, newFolder) {
//   try {
//     await rm(newFolder, {recursive: true, force: true});
//     await mkdir(newFolder, {recursive: true});
//     const styles = await readdir(oldFolder, {withFileTypes: true});
//     for await (let style of styles) {
//       if (style.isDirectory()) {
//         copyDirectory(path.join(oldFolder, style.name), path.join(newFolder, style.name));
//       } else {
//         await copyFile(path.join(oldFolder, style.name), path.join(newFolder, style.name));
//       }
//     }
//   } catch (err) {
//     console.log(err.message);
//   }
// }

// async function addStyles(pathStyles, pathProject) {
//   try {
//     const result = fs.createWriteStream(path.join(pathProject, 'style.css'));
//     const styles = await readdir(pathStyles, {withFileTypes: true});
//     for (let style of styles) {
//       if (style.isFile() && style.name.includes('.css')) {
//         const stylefile = fs.createReadStream(path.join(pathStyles, style.name), 'utf-8');
//         stylefile.pipe(result);
//       }
//     }
//   } catch (err) {
//     console.log(err.message);
//   }
// }

// async function buildProject(pathProjectDist, pathTemplate, pathComponents, pathStyles, pathAssets) {
//   await rm(pathProjectDist, {recursive: true, force: true});
//   await mkdir(pathProjectDist, {recursive: true});
//   await mkdir(path.join(pathProjectDist, 'assets'), {recursive: true});
//   wrireHTML(pathTemplate, pathComponents);
//   addStyles(pathStyles, pathProjectDist);
//   copyDirectory(pathAssets, path.join(pathProjectDist, 'assets'));
// }

// buildProject(pathProjectDist, pathTemplate, pathComponents, pathStyles, pathAssets);

const fs = require('fs');
const path = require('path');
const {mkdir, copyFile, readdir, rm} = require('fs/promises');
/*folders*/
const pathProject = path.join(__dirname, 'project-dist');
const pathStyles = path.join(__dirname, 'styles');
const pathAssets = path.join(__dirname, 'assets');
const pathTemplate = path.join(__dirname, 'template.html');
const pathComponents = path.join(__dirname, 'components');

async function buildHTML(pathTemplate, pathComponents) {
  try {
    const readTemplate = fs.createReadStream(pathTemplate, 'utf-8');
    let templateData = '';
    readTemplate.on('data', chunk => templateData += chunk);
    readTemplate.on('end', async () => {
      const components = await readdir(pathComponents, {withFileTypes: true});
      for (let component of components) {
        const readComponents = fs.createReadStream(path.join(pathComponents, component.name), 'utf-8');
        const componentName = path.basename(path.join(pathComponents, component.name), '.html');
        let componentsData = '';
        readComponents.on('data', chunk => componentsData += chunk);
        readComponents.on('end', () => {
          templateData = templateData.replace(`    {{${componentName}}}`, componentsData);
          const result = fs.createWriteStream(path.join(pathProject, 'index.html'));
          result.write(templateData);
        });
      }
    });
  } catch (err) {
    console.log(err.message);
  }
}

async function copyDirectoryFile(oldFolder, newFolder) {
  try {
    await rm(newFolder, {recursive: true, force: true});
    await mkdir(newFolder, {recursive: true});
    const files = await readdir(oldFolder, {withFileTypes: true});
    for await (let file of files) {
      if (file.isDirectory()) {
        copyDirectoryFile(path.join(oldFolder, file.name), path.join(newFolder, file.name));
      } else {
        await copyFile(path.join(oldFolder, file.name), path.join(newFolder, file.name));
      }
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function addStyles(pathStyles, pathProject) {
  try {
    const stylesFolder = await readdir(pathStyles, {withFileTypes: true});
    const result = fs.createWriteStream(path.join(pathProject, 'style.css'));
    const data = [];
    for await (let style of stylesFolder) {
      if (style.isFile() && style.name.includes('.css')) {
        const readstyles = fs.createReadStream(path.join(pathStyles, style.name), 'utf-8');
        readstyles.on('data', chunk => data.push(chunk));
        readstyles.on('end', () => result.write(data.join('\n\n')));
      }
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function buildProject(pathProject, pathStyles, pathComponents, pathAssets, pathTemplate) {
  await rm(pathProject, {recursive: true, force: true});
  await mkdir(pathProject, {recursive: true});
  await mkdir(path.join(pathProject, 'assets'), {recursive: true});
  buildHTML(pathTemplate, pathComponents);
  addStyles(pathStyles, pathProject);
  copyDirectoryFile(pathAssets, path.join(pathProject, 'assets'));
}

buildProject(pathProject, pathStyles, pathComponents, pathAssets, pathTemplate);
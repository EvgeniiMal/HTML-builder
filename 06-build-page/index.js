const fs = require('fs');
const { readdir, rm, copyFile, mkdir, writeFile, appendFile } = require('fs/promises');
const { resolve, extname } = require('path');

const pathBundle = resolve(__dirname, 'project-dist');
const pathAssetsCopy = resolve(__dirname, 'project-dist', 'assets');
const assetsPath = resolve(__dirname, 'assets');
const templatePath = resolve(__dirname, 'template.html');
const stylesPath = resolve(__dirname, 'styles');
const bundleCCS = resolve(__dirname, 'project-dist', 'style.css');

let templateHtml = '';

(async() => {
  try {
    //**start create derectoris */
    await mkdir(pathBundle, { recursive: true });
    await mkdir(pathAssetsCopy, { recursive: true });
    await rm(pathAssetsCopy, { recursive: true });
    await writeFile(resolve(pathBundle, 'index.html'), '');
    await writeFile(resolve(pathBundle, 'style.css'), '');
    //**end create derectoris */

    //**start copy assets */
    const dirs = await readdir(assetsPath);
    for await (const dir of dirs) {
      await mkdir(resolve(pathAssetsCopy, dir), { recursive: true });

      const files = await readdir(resolve(assetsPath, dir));
      for await (const file of files) {
        await copyFile(resolve(assetsPath, dir, file), resolve(pathAssetsCopy, dir, file));
      }
    }
    //**end copy assets */

    // **start copy CSS */
    const files = await readdir(stylesPath);

    for (const item of files) {
      if (extname(item) === '.css') {
        const stream = fs.createReadStream(resolve(stylesPath, item));
        stream.on('data', function(data) {
          appendFile(bundleCCS, data);
        });
      }
    }
    //**end copy CSS */

    //**start create HTML */
    const stream = fs.createReadStream(templatePath, { encoding: 'utf-8' });
    stream.on('data', chunk => templateHtml += chunk);
    stream.on('end', async() => {
      const templateNames = templateHtml.match(/{{([A-Z])+}}/gi);
      for (const templateName of templateNames) {
        const name = templateName.replace(/{|}/g, '');

        const componentFile = resolve(resolve(__dirname, 'components'), `${name}.html`);

        const data = await getComponentsData(componentFile);

        templateHtml = templateHtml.replace(templateName, data);

        const projectHtmlPath = resolve(pathBundle, 'index.html');

        const stream = fs.createWriteStream(projectHtmlPath);
        stream.write(templateHtml);
      }
    });
    //**end create HTML */

    console.log('Constructor generated done!');
  } catch (error) {
    if (error) throw error;
  }
})();


async function getComponentsData(component) {
  return new Promise((resolve) => {
    const stream = fs.createReadStream(component, 'utf-8');
    let data = [];
    stream.on('data', chunk => data.push(chunk));
    stream.on('end', () => resolve(data.join('')));

  });
}
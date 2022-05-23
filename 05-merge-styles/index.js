const fs = require('fs');
const { readdir, appendFile, writeFile } = require('fs/promises');
const { resolve, } = require('path');
const { extname } = require('path');

const stylesPath = resolve(__dirname, 'styles');
const stylePathCopy = resolve(__dirname, 'project-dist');
const bundle = resolve(__dirname, 'project-dist', 'bundle.css');

(async() => {
  try {
    await writeFile(resolve(stylePathCopy, 'bundle.css'), '');
    const files = await readdir(stylesPath);

    for (const item of files) {
      if (extname(item) === '.css') {
        const stream = fs.createReadStream(resolve(stylesPath, item));
        stream.on('data', function(data) {
          appendFile(bundle, data);
        });
      }
    }
    console.log('Project bundle done!');
  } catch (error) {
    if (error) throw error;
  }
})();
const fs = require('fs');
const path = require('path');

const stylesFolderPath = path.join(__dirname, 'styles');
const resultFilePath = path.join(__dirname, 'project-dist', 'bundle.css');

async function createBundle() {
  try {
    await fs.promises.writeFile(resultFilePath, '');
    const files = await fs.promises.readdir(stylesFolderPath, {
      withFileTypes: true,
    });
    for (const file of files) {
      const filePath = path.join(stylesFolderPath, file.name);
      const filePathObj = path.parse(filePath);
      if (file.isFile() && filePathObj.ext === '.css') {
        let data = '';
        const readableStream = fs.createReadStream(filePath, 'utf-8');
        readableStream.on('data', (chunk) => (data += chunk));
        readableStream.on('end', () => {
          fs.promises.appendFile(resultFilePath, data + '\n');
        });
      }
    }

    console.log('bundle.css succesfully created!');
  } catch (err) {
    console.error(err);
  }
}

createBundle();
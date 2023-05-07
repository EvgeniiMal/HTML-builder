const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'project-dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

const outputFilePath = path.join(distDir, 'bundle.css');
const outputStream = fs.createWriteStream(outputFilePath, { flags: 'w' });

const stylesDir = path.join(__dirname, 'styles');
fs.readdir(stylesDir, (err, files) => {
  if (err) {
    console.error(`Error reading styles directory: ${err}`);
    return;
  }
  files.forEach((filename) => {
    const filePath = path.join(stylesDir, filename);

    if (path.extname(filePath) !== '.css' || !fs.statSync(filePath).isFile()) {
      return;
    }

    const fileStream = fs.createReadStream(filePath);
    fileStream.on('error', (err) => {
      console.error(`Error reading file ${filePath}: ${err}`);
    });
    fileStream.pipe(outputStream, { end: false });
  });
  outputStream.on('finish', () => {
    console.log(`Bundle file has been written to ${outputFilePath}`);
  });
  outputStream.end();
});

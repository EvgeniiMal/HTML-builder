const fs = require('fs');

function copyDir(sourceDir, targetDir) {
  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Source directory "${sourceDir}" does not exist`);
  }
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }
  const files = fs.readdirSync(sourceDir);
  files.forEach((file) => {
    const sourcePath = `${sourceDir}/${file}`;
    const targetPath = `${targetDir}/${file}`;
    const stat = fs.statSync(sourcePath);
    if (stat.isDirectory()) {
      copyDir(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

copyDir('./files', './files-copy');

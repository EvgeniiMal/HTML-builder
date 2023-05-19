const fs = require('fs');
const concat = require('concat');

const stylesFolderPath = './styles';
const outputFilePath = './project-dist/bundle.css';

fs.readdir(stylesFolderPath, (err, files) => {
  if (err) {
    throw err;
  }

  const fileContents = files.map((fileName) => {
    return fs.readFileSync(`${stylesFolderPath}/${fileName}`, 'utf-8');
  });

  const concatenatedContents = concat(fileContents);

  fs.writeFileSync(outputFilePath, concatenatedContents, 'utf-8');

  console.log('Styles merged successfully');
});

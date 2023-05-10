const fs = require("fs");
const path = require("node:path");

const source = path.join(__dirname, 'styles');
const bundle = path.join(__dirname, 'project-dist', 'bundle.css');

function copyFiles(src, dist) {
  fs.readdir(src, (error, files) => {
    if (error) {
      console.error(error);
      return;
    }

    fs.writeFile(dist, '', (error) => {
      if (error) {
        console.error(error);
        return;
      }
    });

    files.forEach((file) => {
      const fullPath = path.join(src, file);

      fs.stat(fullPath, (error, stats) => {
        if (error) {
          console.error(error);
          return;
        }

        if (stats.isFile() && path.extname(fullPath) === '.css') {
          appendFile(fullPath, dist);
        }
      });
    });
  });
}

function appendFile(src, dist) {
  const stream = fs.createReadStream(src, 'utf8');

  stream.on('data', (chunk) => {
    fs.appendFile(dist, chunk, (error) => {
      if (error) {
        console.error(error);
        return;
      }
    });
  });
}

copyFiles(source, bundle);
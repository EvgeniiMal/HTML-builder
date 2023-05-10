const fs = require("fs");
const path = require("node:path");

let dirPath = path.join(__dirname, "secret-folder");

function readDirectory(src) {
  fs.readdir(src, (error, files) => {
    if (error) {
      console.error(error);
      return;
    }

    files.forEach((file) => {
      let dirPath = path.join(src, file);

      fs.stat(dirPath, (error, stats) => {
        if (error) {
          console.error(error);
          return;
        }

        if (stats.isFile()) {
          const fileFormat = path.extname(dirPath);
          const fileName = path.basename(dirPath, fileFormat);
          const fileSize = stats.size;
          const outputLine = `${fileName} - ${fileFormat.slice(
            1
          )} - ${fileSize}b`;

          console.log(outputLine);
        }
      });
    });
  });
}

readDirectory(dirPath);

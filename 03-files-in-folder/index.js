const { stdout, stderr } = require("process");
const path = require("path");
const fsPromises = require("fs/promises");

const dirName = path.dirname(__filename);
const folder = path.join(dirName, "secret-folder");
try {
  let files = fsPromises.readdir(folder, { withFileTypes: true });
  files.then((data) => {
    data
      .filter((file) => file.isFile())
      .forEach((file) => {
        const lastDote = file.name.lastIndexOf(".");
        const fileName = file.name.slice(0, lastDote);
        const filePath = path.join(folder, file.name);
        fsPromises.stat(filePath).then((data) => {
          stdout.write(
            `${fileName} - ${path.extname(filePath).slice(1)} - ${
              data.size / 1024
            }kb\n`
          );
        });
      });
  });
} catch (error) {
  stderr.write(error);
}

const fsPr = require("fs/promises");
const path = require("node:path");

const folderPath = "03-files-in-folder/secret-folder";

function getFolderContent(_folderPath) {
  console.log("<имя файла>-<расширение файла>-<вес файла>");
  fsPr.readdir(folderPath).then((data) => {
    data.forEach((file) => {
      const filePath = path.resolve(path.join(folderPath, file));
      fsPr.lstat(filePath).then((fileStats) => {
        if (fileStats.isFile()) {
          const fileNameParts = file.split(".");
          console.log(
            `${fileNameParts[0]} - ${fileNameParts[1]} - ${fileStats.size}`
          );
        }
      });
    });
  });
}
getFolderContent(folderPath);

const fs = require("fs");
const path = require("node:path");

let dirPathNew = path.join(__dirname, "files-copy");
let dirPathFile = path.join(__dirname, "files");

fs.mkdir(dirPathNew, { recursive: true }, function (err) {
  if (err) throw err;
  console.log("Папка успешно создана");
  fs.readdir(dirPathFile, "utf8", function (err, data) {
    for (const key in data) {
      fs.copyFile(
        dirPathFile + "\\" + data[key],
        dirPathNew + "\\" + data[key],
        (err) => {
          if (err) throw err;
          console.log("Файл успешно скопирован");
        }
      );
    }
  });
});

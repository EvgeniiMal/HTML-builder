const fs = require("fs");
const path = require("node:path");

let dirPathNew = path.join(
  "D:\\school\\HTML-builder\\HTML-builder\\04-copy-directory\\files-copy\\"
);

fs.mkdir(dirPathNew, { recursive: true }, function (err) {
  if (err) throw err;
  console.log("Папка успешно создана");
  fs.readdir(
    "D:\\school\\HTML-builder\\HTML-builder\\04-copy-directory\\files\\",
    "utf8",
    function (err, data) {
      for (const key in data) {
        fs.copyFile(
          "D:\\school\\HTML-builder\\HTML-builder\\04-copy-directory\\files\\" +
            data[key],
          "D:\\school\\HTML-builder\\HTML-builder\\04-copy-directory\\files-copy\\" +
            data[key],
          (err) => {
            if (err) throw err;
            console.log("Файл успешно скопирован");
          }
        );
      }
    }
  );
});

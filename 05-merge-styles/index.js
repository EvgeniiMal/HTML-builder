const fs = require("fs");
const path = require("node:path");
let dirPath = path.join(
  "D:\\school\\HTML-builder\\HTML-builder\\05-merge-styles\\styles\\"
);
let dirPathNew = path.join(
  "D:\\school\\HTML-builder\\HTML-builder\\05-merge-styles\\project-dist\\bundle.css"
);
fs.readdir(dirPath, { withFileTypes: true }, (err, dirEntries) => {
  if (err) console.log(err);
  else {
    dirEntries.forEach((dirEntry) => {
      let ext = path.extname(
        "D:\\school\\HTML-builder\\HTML-builder\\03-files-in-folder\\secret-folder\\" +
          dirEntry.name
      );
      if (ext === ".css") {
        let stream = new fs.ReadStream(
          "D:\\school\\HTML-builder\\HTML-builder\\05-merge-styles\\styles\\" +
            dirEntry.name
        );
        stream.on("data", (e) => {
          console.log(e.toString());
          fs.appendFile(dirPathNew, e.toString(), function (err) {
            if (err) throw err;
            console.log("Файл создан!");
          });
        });
      }
    });
  }
});

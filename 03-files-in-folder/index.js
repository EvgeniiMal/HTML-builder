const fs = require("fs");
const path = require("node:path");

let dirPath = path.join(
  "D:\\school\\HTML-builder\\HTML-builder\\03-files-in-folder\\secret-folder\\"
);
fs.readdir(dirPath, { withFileTypes: true }, (err, dirEntries) => {
  if (err) console.log(err);
  else {
    dirEntries.forEach((dirEntry) => {
      fs.stat(
        "D:\\school\\HTML-builder\\HTML-builder\\03-files-in-folder\\secret-folder\\" +
          dirEntry.name,
        (error, stats) => {
          if (error) {
            console.log(error);
          } else {
            let size = stats.size + "kb";
            let name = dirEntry.name.split(".", 1).toString();
            let ext = path
              .extname(
                "D:\\school\\HTML-builder\\HTML-builder\\03-files-in-folder\\secret-folder\\" +
                  dirEntry.name
              )
              .replace(".", "");
            console.log(name + " - " + ext + " - " + size);
          }
        }
      );
    });
  }
});

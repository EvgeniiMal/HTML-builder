const fs = require("fs");
const path = require("node:path");

let dirPath = path.join(__dirname, "styles");
let dirPathNew = path.join(__dirname, "bundle.css");
let dirProjectDist = path.join(__dirname, "project-dist");

fs.readdir(dirPath, { withFileTypes: true }, (err, dirEntries) => {
  if (err) console.log(err);
  else {
    dirEntries.forEach((dirEntry) => {
      let ext = path.extname(dirProjectDist + "\\" + dirEntry.name);
      if (ext === ".css") {
        let stream = new fs.ReadStream(dirPath + "\\" + dirEntry.name);
        stream.on("data", (e) => {
          fs.appendFile(dirPathNew, e.toString(), function (err) {
            if (err) throw err;
            console.log("Файл создан!");
          });
        });
      }
    });
  }
});

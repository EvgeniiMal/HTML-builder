const fs = require("fs");
const path = require("node:path");
let pathTXT = path.join(
  "D:\\school\\HTML-builder\\HTML-builder\\01-read-file\\text.txt"
);
let stream = new fs.ReadStream(pathTXT);

stream.on("data", (e) => {
  console.log(e.toString());
});



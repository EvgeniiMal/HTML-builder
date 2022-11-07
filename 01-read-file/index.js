const fs = require("fs");
const path = require("path");

fs.readFile(path.join("01-read-file", "text.txt"), "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

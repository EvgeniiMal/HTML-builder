const fs = require("fs");
const path = require("node:path");

let pathTXT = path.join(__dirname, "text.txt");
let stream = new fs.ReadStream(pathTXT);

stream.on("data", (e) => {
  console.log(e.toString());
});



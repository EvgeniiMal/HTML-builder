const { stdout, stderr, exit } = process;
const path = require("node:path");
const fs = require("node:fs");
const textFilePath = path.resolve(path.join(__dirname, "text.txt"));

function readText(path) {
  let stream = fs.createReadStream(path, "utf8");
  stream.on("error", function (error) {
    stderr.write(error.message);
    exit();
  });

  stream.on("data", (data) => {
    stdout.write(data);
    exit();
  });
}
readText(textFilePath);

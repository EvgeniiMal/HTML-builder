const { stdout, stderr } = require("process");
const path = require("path");
const fs = require("fs");

const dirName = path.dirname(__filename);
const textFile = path.join(dirName, "text.txt");

const readableStream = fs.createReadStream(textFile, "utf-8");

readableStream.on("data", (chunk) => {
  stdout.write(chunk);
});

readableStream.on("error", (error) => {
  stderr.write(error.message);
});

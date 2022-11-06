const { stdin, stdout, stderr } = require("process");
const path = require("path");
const fs = require("fs");

const dirName = path.dirname(__filename);
const textFile = path.join(dirName, "text.txt");

stdout.write("Enter text:\n");

const output = fs.createWriteStream(textFile);

function writeData(data) {
  let text = data.toString();
  text.slice(0, text.length - 2) !== "exit" ? output.write(data) : sayGoodbye();
}

function sayGoodbye() {
  stdout.write("live long and prosper");
  process.exit();
}

stdin.on("data", writeData);
process.on("SIGINT", sayGoodbye);

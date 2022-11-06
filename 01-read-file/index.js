const path = require("path");
const fs = require("fs");
const { stdout } = process;

const fileReadStream = fs.createReadStream(path.resolve(__dirname, "text.txt"));

fileReadStream.on('data', (data) => stdout.write(data).toString());
//fileReadStream.on('end', () => { });
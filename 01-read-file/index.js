const fs = require("fs");
const path = require("path");
const { stdout } = process;

const file = path.join(__dirname, ("text.txt"));
const encode = "utf-8";
let content = "";

const stream = fs.createReadStream(file, encode);

stream.on("data", chunk => content += chunk);
stream.on("end", () => stdout.write(content));
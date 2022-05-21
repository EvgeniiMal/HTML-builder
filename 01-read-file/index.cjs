const fs = require("fs");
const path = require("path");

const myFilePath = path.join(__dirname, "text.txt");

const readStream = fs.createReadStream(myFilePath, "utf-8");
let text = "";
readStream.on("data", (chunk) => {
  text += chunk;
});
readStream.on("end", () => {
  return console.log(text);
});
readStream.on("error", (error) => {
  return console.error("Error " + error.message);
});

const { stdout, exit } = process;
const path = require("node:path");
const fs = require("node:fs/promises");
const dirname="./01-read-file";
const textFilePath =path.resolve( path.join(dirname, "text.txt"));
console.log(textFilePath);

async function readText(path) {
  let filehandle;
  try {
    filehandle = await fs.open(path, "r");
    const data = await fs.readFile(path, { encoding: "utf8" });
    stdout.write(data);
    exit();
  } catch (err) {
    console.log(err);
  } finally {
    if (filehandle) await filehandle.close();
  }
}
readText(textFilePath);

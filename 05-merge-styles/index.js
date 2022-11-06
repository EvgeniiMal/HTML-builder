const { stdout, stderr } = require("process");
const { readdir } = require("fs/promises");
const path = require("path");
const fs = require("fs");

const dirNameCurrent = path.dirname(__filename);
const dirStyle = path.join(dirNameCurrent, "styles");
const dirDist = path.join(dirNameCurrent, "project-dist");
const targetStyle = path.join(dirDist, "bundle.css");

mergeStyles();

async function mergeStyles() {
  const output = fs.createWriteStream(targetStyle);

  const files = await readdir(dirStyle, { withFileTypes: true });
  files
    .filter(
      (file) =>
        file.isFile() && path.extname(path.join(dirStyle, file.name)) === ".css"
    )
    .forEach((file) => {
      const readableStream = fs.createReadStream(
        path.join(dirStyle, file.name)
      );
      readableStream.on("data", (chunk) => {
        output.write(chunk);
      });
      readableStream.on("end", () => {
        stdout.write(`${file.name} styles copied to bundle.css\n`);
      });
    });
}

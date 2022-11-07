const { mkdir, readdir, copyFile, unlink, rmdir } = require("fs/promises");
const path = require("path");
const { stdout, stderr } = require("process");
const fs = require("fs");

const dirNameCurrent = path.dirname(__filename);
const dirDist = path.join(dirNameCurrent, "project-dist");
const dirAssets = path.join(dirNameCurrent, "assets");
const dirAssetsCopy = path.join(dirDist, "assets");

const targetStyle = path.join(dirDist, "style.css");
const dirStyle = path.join(dirNameCurrent, "styles");

buildPage();

async function buildPage() {
  const createDir = await mkdir(dirDist, { recursive: true });
  if (createDir) {
    stdout.write(`project-dist folder created\n`);
  }
  copyDir(dirAssets, dirAssetsCopy);
  mergeStyles();
}

async function copyDir(soursePath, distPath) {
  try {
    const createDir = await mkdir(distPath, { recursive: true });
    if (createDir) {
      stdout.write(`${distPath} folder created\n`);
    }

    const files = await readdir(soursePath, { withFileTypes: true });
    files.forEach((file) => {
      if (!file.isFile()) {
        copyDir(
          path.join(soursePath, file.name),
          path.join(distPath, file.name)
        );
      } else {
        copyFile(
          path.join(soursePath, file.name),
          path.join(distPath, file.name)
        );
        stdout.write(`${file.name} copied\n`);
      }
    });

    const filesNames = files.map((file) => file.name);

    const filesCopied = await readdir(distPath, {
      withFileTypes: true,
    });
    filesCopied
      .filter((file) => !filesNames.includes(file.name))
      .forEach(async (file) => {
        if (!file.isFile()) {
          const removeDir = await rmdir(path.join(distPath, file.name), {
            recursive: true,
          });
          if (removeDir) {
            stdout.write(`${file.nane} folder removed\n`);
          }
        } else {
          const deletedFile = await unlink(path.join(distPath, file.name));
          if (!deletedFile) {
            stdout.write(`${file.name} removed \n`);
          }
        }
      });
  } catch (err) {
    stderr.write(err.message);
  }
}
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
        stdout.write(`${file.name} styles copied to style.css\n`);
      });
    });
}

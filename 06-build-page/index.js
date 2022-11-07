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

const htmlTemplateFile = path.join(dirNameCurrent, "template.html");
const dirComponents = path.join(dirNameCurrent, "components");
const htmlResultFile = path.join(dirDist, "index.html");

buildPage();

async function buildPage() {
  const createDir = await mkdir(dirDist, { recursive: true });
  if (createDir) {
    stdout.write(`project-dist folder created\n`);
  }
  copyDir(dirAssets, dirAssetsCopy);
  mergeStyles();
  buildHtml();
}

async function copyDir(soursePath, distPath) {
  try {
    const createDir = await mkdir(distPath, { recursive: true });
    if (createDir) {
      stdout.write(`\n${distPath} folder created\n`);
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

async function buildHtml() {
  const readableStream = fs.createReadStream(htmlTemplateFile, "utf-8");
  let htmlString = "";

  readableStream.on("data", (chunk) => {
    htmlString += chunk;
  });
  readableStream.on("end", async () => {
    const files = await readdir(dirComponents, { withFileTypes: true });
    files
      .filter(
        (file) =>
          file.isFile() &&
          path.extname(path.join(dirStyle, file.name)) === ".html"
      )
      .forEach((file) => {
        const lastDote = file.name.lastIndexOf(".");
        const fileName = file.name.slice(0, lastDote);
        const filePath = path.join(dirComponents, file.name);

        const readableStreamHtml = fs.createReadStream(filePath, "utf-8");
        let componentString = "";

        readableStreamHtml.on("data", (chunk) => {
          componentString += chunk;
        });
        readableStreamHtml.on("end", () => {
          htmlString = htmlString.replace(`{{${fileName}}}`, componentString);
          const output = fs.createWriteStream(htmlResultFile);
          output.write(htmlString);
          stdout.write(
            `${htmlResultFile} updated with ${file.name} component content\n`
          );
        });
      });
  });
}

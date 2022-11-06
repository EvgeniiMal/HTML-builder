const { stdout, stderr } = require("process");
const { mkdir, readdir, copyFile } = require("fs/promises");
const path = require("path");

const dirNameCurrent = path.dirname(__filename);
const dirNameTarget = path.join(dirNameCurrent, "files");
const dirNameTargetCopy = path.join(dirNameCurrent, "files-copy");

copyDir();

async function copyDir() {
  try {
    const createDir = await mkdir(dirNameTargetCopy, { recursive: true });
    if (createDir) {
      stdout.write(`files-copy folder was created\n`);
    }

    const files = readdir(dirNameTarget, { withFileTypes: true });
    files.then((data) => {
      data
        .filter((file) => file.isFile())
        .forEach((file) => {
          copyFile(
            path.join(dirNameTarget, file.name),
            path.join(dirNameTargetCopy, file.name)
          );
          stdout.write(
            `files\\${file.name} was copied to files-copy\\${file.name}\n`
          );
        });
    });
  } catch (err) {
    stderr.write(err.message);
  }
}

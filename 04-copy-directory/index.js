const { stdout, stderr } = require("process");
const { mkdir, readdir, copyFile, unlink } = require("fs/promises");
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

    const files = await readdir(dirNameTarget, { withFileTypes: true });
    files
      .filter((file) => file.isFile())
      .forEach((file) => {
        copyFile(
          path.join(dirNameTarget, file.name),
          path.join(dirNameTargetCopy, file.name)
        );
        stdout.write(`${file.name} was copied to files-copy\n`);
      });

    const filesNames = files.map((file) => file.name);

    const filesCopied = await readdir(dirNameTargetCopy, {
      withFileTypes: true,
    });
    filesCopied
      .filter((file) => !filesNames.includes(file.name))
      .forEach(async (file) => {
        const deletedFile = await unlink(
          path.join(dirNameTargetCopy, file.name)
        );
        if (!deletedFile) {
          stdout.write(`${file.name} was removed from files-copy\n`);
        }
      });
  } catch (err) {
    stderr.write(err.message);
  }
}

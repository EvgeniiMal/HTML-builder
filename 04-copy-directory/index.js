const fsPr = require("fs/promises");
const path = require("node:path");

const initFolderPath = "04-copy-directory/files";
const copiedFolderPath = "04-copy-directory/files-copy";

async function cleanCopiedFolder(folderPath) {
  for (const file of await fsPr.readdir(folderPath)) {
    await fsPr.unlink(path.join(folderPath, file));
  }
}
async function copyFolder(initFolderPath, copiedFolderPath) {
  fsPr.access(copiedFolderPath).catch(async () => {
    await fsPr.mkdir(copiedFolderPath, { recursive: true });
  });
  await cleanCopiedFolder(copiedFolderPath);
  const files = await fsPr.readdir(initFolderPath);
  files.forEach(async (file) => {
    const initFilePath = path.resolve(initFolderPath, file),
      copiedFilePath = path.resolve(copiedFolderPath, file);
    await fsPr.copyFile(initFilePath, copiedFilePath);
  });
}

copyFolder(initFolderPath, copiedFolderPath);

const { readdir, rm, copyFile, mkdir } = require('fs/promises');
const { resolve } = require('path');
const filePath = resolve(__dirname, 'files');
const filePathCopy = resolve(__dirname, 'files-copy');

(async() => {
  try {
    await rm(filePathCopy, { recursive: true, force: true });
    await mkdir(filePathCopy, { recursive: true });

    const files = await readdir(resolve(filePath));

    for (const file of files) {
      await copyFile(resolve(__dirname, 'files', file), resolve(__dirname, 'files-copy', file));
    }
    console.log('Copy done!');
  } catch (error) {
    if (error) throw error;
  }
})();
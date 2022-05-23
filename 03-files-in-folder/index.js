const { readdir, stat } = require('fs/promises');
const { resolve, extname } = require('path');

const filePath = resolve(__dirname, 'secret-folder');

(async() => {
  try {
    let files = await readdir(filePath, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        let stats = await stat(resolve(__dirname, 'secret-folder', file.name));
        let info = [];
        info.push(file.name.split('.').slice(0, -1));
        info.push(extname(file.name).slice(1));
        info.push((stats.size / 1024).toFixed(3) + 'kb');
        console.log(info.join(' - '));
      }
    }
  } catch (error) {
    if (error) throw error;
  }
})();
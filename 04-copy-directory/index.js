const path = require('path');
const fsPr = require('fs').promises;

const dirSrcPath = path.resolve(__dirname, "files");
const dirCopyPath = path.resolve(__dirname, "files-copy");

const rmDir = fsPr.rm(dirCopyPath, { recursive: true, force: true });
rmDir.then(function makeDir(value) {
	const mkDir = fsPr.mkdir(dirCopyPath, { recursive: true });
	return mkDir;
}).then(function checkFiles() {
	const files = fsPr.readdir(dirSrcPath, { encoding: "utf-8", withFileTypes: true });
	return files;
}).then(function copyFIles(files) {
	for (let file of files) {
		fsPr.copyFile(path.resolve(dirSrcPath, file.name), path.resolve(dirCopyPath, file.name));
	}
});
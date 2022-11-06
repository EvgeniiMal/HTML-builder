const path = require('path');
const fs = require('fs');
const fsPr = fs.promises;
const stream = require('stream');

const dirSrcPath = path.resolve(__dirname, "styles");
const dirCompPath = path.resolve(__dirname, "project-dist", "bundle.css");



const wrStream = fs.WriteStream(dirCompPath);

const files = fsPr.readdir(dirSrcPath, { encoding: "utf-8", withFileTypes: true });

files.then(function copyFIles(files) {
	for (let file of files) {
		if (!file.isFile()) continue;

		const point = file.name.lastIndexOf(".");
		if (point == -1) continue;

		const fileExt = file.name.slice(point + 1, file.name.length);
		if (fileExt != "css") continue;

		const srcFileStream = fs.ReadStream(path.resolve(dirSrcPath, file.name));

		srcFileStream.pipe(wrStream);
	}
});


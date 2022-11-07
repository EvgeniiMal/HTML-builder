const path = require('path');
const fs = require('fs');
const fsPr = fs.promises;
const stream = require('stream');

const dirSrcPath = path.resolve(__dirname, "styles");
const dirCompPath = path.resolve(__dirname, "project-dist", "bundle.css");



const wrStream = fs.WriteStream(dirCompPath);

const files = fsPr.readdir(dirSrcPath, { encoding: "utf-8", withFileTypes: true });

files.then(function copyFIles(files) {
	const CSSFiles = files.filter((file) => file.isFile() && (file.name.lastIndexOf(".css") != -1));

	for (let file of CSSFiles) {
		const srcFileStream = fs.ReadStream(path.resolve(dirSrcPath, file.name));

		srcFileStream.pipe(wrStream);
	}
});


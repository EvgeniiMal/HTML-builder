const path = require('path');
const fs = require('fs');

const dirPath = path.resolve(__dirname, 'secret-folder');

const files = fs.promises.readdir(dirPath, { encoding: "utf-8", withFileTypes: true });
files.then(function (files) {
	for (let file of files) {
		if (!file.isFile()) continue;

		const pathFile = path.resolve(__dirname, 'secret-folder', file.name);

		const point = file.name.indexOf(".");
		if (point == -1) continue;

		const fileName = file.name.slice(0, point);
		const fileExt = file.name.slice(point + 1, file.name.length)
		const stat = fs.stat(pathFile, (error, stat) => {
			console.log(`${fileName}--${fileExt}--${stat.size / 1000}kb`);
		});
	}
})

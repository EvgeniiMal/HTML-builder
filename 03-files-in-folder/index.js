const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

fsPromises.readdir(path.join(__dirname, 'secret-folder'), {

	withFileTypes: true

}).then(results => {

	results.forEach(result => {
		if (!result.isDirectory()) {

			const filePatch = path.join(__dirname, 'secret-folder', result.name);
			const fileName = path.basename(filePatch);
			const ext = path.extname(filePatch);
			fsPromises
				.stat(filePatch)
				.then(res => {
					console.log(`FileInfo: \n${fileName.replace(ext, '')} - ${ext.replace('.', '')} - ${Number(res.size / 2000).toFixed(3)}kb`);
				});
		};
	});
});
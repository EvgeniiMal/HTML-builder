const fs = require('fs');
const path = require('path');

	fs.mkdir(path.join('04-copy-directory', 'files-copy'), err => {
		if(err) throw err; // не удалось создать папку
		console.log('Папка успешно создана');
	});
	
	fs.copyFile(path.join('04-copy-directory', 'files', 'test-css.css'), path.join('04-copy-directory', 'files-copy', 'test-css.css'), err => {
		if(err) throw err; // не удалось скопировать файл
		console.log('Файл успешно скопирован');
	});
	
	fs.copyFile(path.join('04-copy-directory', 'files', 'test-image.jpg'), path.join('04-copy-directory', 'files-copy', 'test-image.jpg'), err => {
		if(err) throw err; // не удалось скопировать файл
		console.log('Файл успешно скопирован');
	});
	
	fs.copyFile(path.join('04-copy-directory', 'files', 'test-js.js'), path.join('04-copy-directory', 'files-copy', 'test-js.js'), err => {
		if(err) throw err; // не удалось скопировать файл
		console.log('Файл успешно скопирован');
	});
	
	fs.copyFile(path.join('04-copy-directory', 'files', 'test-text.txt'), path.join('04-copy-directory', 'files-copy', 'test-text.txt'), err => {
		if(err) throw err; // не удалось скопировать файл
		console.log('Файл успешно скопирован');
	});




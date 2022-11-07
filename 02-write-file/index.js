let fs = require('fs');

fs.open('02-write-file/text.txt', 'r+', (err) => {
	if (err) throw err;
	console.log('file created');
});

let string = 'Hello!'

fs.appendFile('02-write-file/text.txt', `\n` + string, function(error){
	if(error) throw error;
	console.log('Данные успешно записаны записать файл');
});


const fs = require('fs');
const path = require('path');
const process = require('process');
const {exit, stdin} = process;

fs.writeFile(

   path.join('02-write-file', 'text.txt'),
   '\n',
   err => {
      if (err) throw err;
      console.log('Файл был создан');
   }

);

stdin.on('data', data => {

	fs.appendFile(
		path.join('02-write-file', 'text.txt'),
		data,
		err => {
			if (err) throw err;
			console.log('Файл был изменен'); 
		}
	);

	if (data.toString().trim() === 'exit') {
		console.log('Откройте файл text.txt');
		process.exit(); }

	process.on('SIGINT', () => {
		console.log('Откройте файл text.txt');
		process.exit();
	}
	)
}
);




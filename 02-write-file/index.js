let fs = require('fs');

function createFile() {
	fs.open('02-write-file/text.txt', 'w', (err) => {
		if (err) throw err;
		console.log('file created');
	});
}

createFile();

let stream = new fs.ReadStream('02-read-file/text.txt');

stream.on('readable', function() {
	let data = stream.read();
	if (data != null) console.log(data.toString());
});

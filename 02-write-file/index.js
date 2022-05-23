const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
var output = fs.createWriteStream(path.join(__dirname, "text.txt"));

stdout.write('write message\n')

stdin.on('data', (data) => {
    if (process.on('SIGINT', () => process.exit()));
    if(data.toString() === 'exit\r\n') process.exit();
    output.write(data);
});

process.on('exit', (item) => itemm === 0 ? stdout.write('Good bye!') : stdout.write('error' + item));

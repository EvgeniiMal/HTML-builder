const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
const pathToFile = path.join(__dirname, 'text.txt');
const emitter = new EventEmitter();
const { stdin } = process;
const output = fs.createWriteStream(pathToFile);
emitter.on('start', message => console.log(message));
emitter.emit('start', 'Start\nPlease enter text and press "Enter"');

stdin.on('data', (data) => {
  if (data.toString() == 'exit\n') {
    emitter.emit('start', 'Bye, bye');
    process.exit();
  }
  output.write(data);
});

process.on('SIGINT', () => {
  emitter.emit('start', 'Bye, bye');
  process.exit();
});
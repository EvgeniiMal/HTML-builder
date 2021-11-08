var fs = require('fs');
const path = require('path');

var stream = new fs.ReadStream(path.join(__dirname, 'text.txt'));



stream.on('readable', function() {
  var data = stream.read();
  console.log(data.toString());
});

stream.on('end', function (){
  console.log('End');
});
const fs = require('node:fs');
const path = require('node:path');

const stream = new fs.ReadStream(path.join(__dirname,'text.txt'), {encoding: 'utf-8'});
stream.on('readable', function(){
  var data = stream.read();
  if(data != null) console.log(data);
});
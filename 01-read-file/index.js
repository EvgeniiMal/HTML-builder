const fs = require('node:fs');
const path = require('node:path');

let stream = new fs.ReadStream(path.join(__dirname,'text.txt'));
stream.on('readable', function(){
  var data = stream.read();
  if(data != null) console.log(data.toString());
});
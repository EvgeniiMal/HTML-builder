const fs = require('fs');
const stream = fs.createReadStream('./01-read-file/text.txt',{encoding: 'utf-8'});
stream.on('readable', function(){
    let data = stream.read();
    if(data!=null){console.log(data)};
});
 
stream.on('end',() =>{});
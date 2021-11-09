const fs = require('fs')

let myReadStream = fs.createReadStream(__dirname + '/text.txt', 'utf8')

myReadStream.on('data', function(arr){
    console.log(arr);
});
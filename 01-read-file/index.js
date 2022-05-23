const fs = require('fs');
const rs = fs.ReadStream("./01-read-file/text.txt");
let data = '';

rs.on('data', chunk => data += chunk);
rs.on('end', ()=> console.log(data));
rs.on('error', (err) => console.log(err));
const fs =require('fs');
const path = require('path');

const pathRead=path.join(__dirname,'text.txt')
const ctreateReadStream = fs.createReadStream(pathRead,'utf-8')


ctreateReadStream.on( 'data', chunk=>console.log(chunk));


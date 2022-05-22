const fs = require('fs');
// const path = require('path');
// const stream = require('stream');


fs.readFile('01-read-file/text.txt', 'utf8',
  function(error,data){

    if(error) throw error;
    console.log(data);
  });
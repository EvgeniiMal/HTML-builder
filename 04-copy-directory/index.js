const  path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;

const dirSrc = "./04-copy-directory/files/";
const dirDest = "./04-copy-directory/files-copy/"

fsPromises.mkdir(dirDest,{recursive: true},(err) => {if (err) {console.log(err)};});

fs.readdir(dirSrc,{withFileTypes: true},function(err, items) {   
  for (let i=0; i<items.length; i++) {
    fsPromises.copyFile(dirSrc+"/"+items[i].name,dirDest+"/"+items[i].name);
  };
});

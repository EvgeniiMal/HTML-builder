
const  path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;

const dirSrc = "./04-copy-directory/files/";
const dirDest = "./04-copy-directory/files-copy/";

fsPromises.mkdir(dirDest, {
  recursive: true
},(err) => {
  if (err) {
    console.log(err)};
  });

fs.readdir(dirSrc,{withFileTypes: true},function(err, item) {   
  
  for (let i=0; i<item.length; i++) {
    fsPromises.copyFile(dirSrc+"/"+item[i].name,dirDest+"/"+item[i].name);
  };
});
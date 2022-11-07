
const  path = require("path");
const fs = require("fs");
// вводим промисы, чтобы в дальнейшем их не писать
const fsPromises = fs.promises;

const dirSrc = "./04-copy-directory/files/";
const dirDest = "./04-copy-directory/files-copy/";
// используем метод для асинхронного создания каталога fs.mkdir(путь, режим, обратный вызов)
fsPromises.mkdir(dirDest, {
  recursive: true
},(err) => {

  if (err) {
    console.log(err)};
  });
// метод для взаимодействия с жестким диском
fs.readdir(dirSrc,{withFileTypes: true},function(err, item) {   
  
  for (let i=0; i<item.length; i++) {
    fsPromises.copyFile(dirSrc+"/"+item[i].name,dirDest+"/"+item[i].name);
  };
});

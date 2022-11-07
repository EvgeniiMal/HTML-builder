const  path = require("path");
const fs = require("fs");
// здесь указываем промисы, чтобы в дальнейшем их не прописывать
const fsPromises = fs.promises;
const output = fs.createWriteStream('./05-merge-styles/project-dist/bundle.css');
const dirSrc = "./05-merge-styles/styles/"
let arrDest = [];
// метод для взаимодействия с жестким диском 
fs.readdir(dirSrc,{withFileTypes: true},function(err, items) {   
  for (let i = 0; i < items.length; i++) {
//     модуль для чтения состояния файла
    fs.stat(dirSrc+items[i].name,function(err, bum){
//       находим файл стилей
      if((items[i].isFile())&&(path.extname(dirSrc+items[i].name).toString())==".css"){
        console.log(dirSrc+items[i].name);
        const stream = fs.createReadStream(dirSrc+items[i].name,{encoding: 'utf-8'});
        stream.on('readable', function(){
          let data = stream.read();
          if(data != null){
            arrDest[i] = data;
            output.write(arrDest[i]);
            console.log(items[i].name+'   aded');
          };
        });
        stream.on('end',() => {});
      };
    }); 
  };
});

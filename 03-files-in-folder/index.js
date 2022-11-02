const path = require('path');
const fs = require('fs');
//var async = require('async');
const  dir='./03-files-in-folder/secret-folder/';
function directoryInn(put){
    let fileSize;
fs.readdir(put,{withFileTypes: true},function(err, items) {   

   for (let i=0; i<items.length; i++) {
    fs.stat(put+items[i].name,function(err, bum){
      if(items[i].isFile()){
      console.log(path.parse(items[i].name).name+' - '+
      (path.extname(put+items[i].name).toString()).replace('.','')+' - '+Number(bum.size)/1000+'kb')};
      if(items[i].isDirectory()){ directoryInn(put+items[i].name+'/')};
      });
     
    };
       
});
};
directoryInn(dir);
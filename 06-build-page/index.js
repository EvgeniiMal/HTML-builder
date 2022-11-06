const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;
const dirDest = "./06-build-page/project-dist/";
const dirDestAssets = "./06-build-page/project-dist/assets/";
const dirSrcAssets = "./06-build-page/assets/";
const output = fs.createWriteStream('./06-build-page/project-dist/style.css');
const outputHtml = fs.createWriteStream("./06-build-page/project-dist/index.html")
const outputHtmlPath = "./06-build-page/project-dist/index.html";
const dirSrcStyle = "./06-build-page/styles/";
const destIndex = "./06-build-page/project-dist/index.html";
const srcIndex = "./06-build-page/template.html"
const dirSrcComp = "./06-build-page/components/";

// ================= make a folders project-dist and copy assets ============================

fsPromises.mkdir(dirDest,{recursive: true},(err) => {if (err) {console.log(err)};});
//fsPromises.copyFile("./06-build-page/template.html",dirDest+"index.html");
fsPromises.mkdir(dirDestAssets,{recursive: true},(err) => {if (err) {console.log(err)};});

fs.readdir(dirSrcAssets,{withFileTypes: true},function(err, items) {   
    for (let i=0; i<items.length; i++) {
      if(items[i].isDirectory()){
        fsPromises.mkdir(dirDestAssets+items[i].name,{recursive: true},(err) => {if (err) {console.log(err)};});   
        fs.readdir(dirSrcAssets+items[i].name,{withFileTypes: true},function(err, items2) {
            for (let j=0; j<items2.length; j++) {
                fsPromises.copyFile(dirSrcAssets+items[i].name+'/'+items2[j].name,dirDestAssets+items[i].name+'/'+items2[j].name);
            };

        });
    
    }
     // fsPromises.copyFile(dirSrcAssets+items[i].name,dirDestAssets+items[i].name);
    };
  });
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ========================= make in project-dist file style.css from style directory 

  let arrDest = [];
  fs.readdir(dirSrcStyle,{withFileTypes: true},function(err, items) {   
    for (let i = 0; i < items.length; i++) {
      fs.stat(dirSrcStyle+items[i].name,function(err, bum){
        if((items[i].isFile())&&(path.extname(dirSrcStyle+items[i].name).toString())===".css"){
          console.log(dirSrcStyle+items[i].name);
          const stream = fs.createReadStream(dirSrcStyle+items[i].name,{encoding: 'utf-8'});
          stream.on('readable', function(){
            let data = stream.read();
            if(data != null){arrDest[i] = data;  output.write(arrDest[i]); console.log(items[i].name+'   aded')};
          });
          stream.on('end',() => {});
        };
      }); 
    };
  });
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  
// ============================== assembling index.html ===============================

let assArr='';
const stream = fs.createReadStream(srcIndex,{encoding: 'utf-8'});
//const outputHtml = fs.createWriteStream(destIndex);
stream.on('readable', function(){
    let data = stream.read();
    if(data!=null){assArr=data};
    if(data != null){outputHtml.write(data)};
});
stream.on('end',() =>{console.log('template ===>>> index ')});
let filCont;
fs.readFile(outputHtmlPath, 'utf8', (errorHeader, fileContent) => {
console.log('== index.html == '+fileContent);
filCont=fileContent;
console.log('filCont===================>>'+filCont);
});

  
   
 /*   fs.readdir(dirSrcComp,{withFileTypes: true},function(err, items) {   
        for (let i = 0; i < items.length; i++) {
            if(items[i].isFile()){ 
                const stream = fs.createReadStream(dirSrcComp+items[i].name,{encoding: 'utf-8'});
                const streamIndex = fs.createReadStream(destIndex,{encoding: 'utf-8'});
                streamIndex.on('readable', function(){
                    console.log("---------------------------"+destIndex);
                    let dataIndex=stream.read();
                    console.log('==========================='+dataIndex);
                    if(dataIndex != null){concole.log('+++++++++++++++++++++++++++++'+dataIndex) };
                });
                stream.on('readable', function(){
                    let data = stream.read();
                    if(data!=null){console.log('file name ==>>  '+items[i].name+'  ==>>  ins  '+data)};
                });
                 
                stream.on('end',() =>{});
              
                console.log('file  ==>>'+path.parse(items[i].name).name);
              
            };  

        }})



   // let newstr = assArr.replace(/{{header}}/, 'апельсины');*/
        
    
 



const fs = require('fs');
const fsP = require('fs').promises;
const path = require('node:path');


const assetsFolder = path.join(__dirname,'assets');
const componentsFolder = path.join(__dirname,'components');
const templateFile = path.join(__dirname,'template.html');
const targetFolder = path.join(__dirname,'project-dist');
const stylesFolder = path.join(__dirname,'styles');
const targetHtml = path.join(targetFolder,'index.html');
const targetCss = path.join(targetFolder,'style.css');

fs.mkdir(targetFolder, { recursive: true }, (err) => {
  if (err) throw err;
});

function copyDir ( oldDir, newDir )
{
  fs.mkdir(newDir, { recursive: true }, (err) => {
    if (err) throw err;
  });
  fs.readdir(oldDir, { withFileTypes: true },(err, files) => {
    if (err) console.log(err);
    else {
      files.forEach(file => {  
        if (file.isFile())
        {   
          fs.copyFile (path.join(oldDir,file.name),path.join(newDir,file.name),(err) =>
          {
            if (err) console.log(err);    
          });  
        }
        else if (file.isDirectory())
        {
          copyDir ( path.join(oldDir,file.name), path.join(newDir,file.name) );
        }
      });}}); 
}

copyDir ( assetsFolder, path.join(targetFolder, 'assets') );

fs.writeFile(targetCss, '', function(error){
  if(error) throw error;});
  
fs.readdir(stylesFolder, { withFileTypes: true },(err, files) => {
  if (err) console.log(err);
  else {
    files.forEach(file => {
      if (file.isFile()) {
        const ext = path.extname(file.name);
        if (ext.toLowerCase() === '.css') {
          const stream = new fs.ReadStream(path.join(stylesFolder,file.name), {encoding: 'utf-8'});
          stream.on('readable', function(){
            const data = stream.read(); 
            if(data != null) {
              fs.appendFile(targetCss, data + '\n', function(error){
                if(error) throw error;});
            }
          });
        }  } });}});

let htmlData = [];
let resultData = [];
 
async function loadTemplate() {
  try{
    const data = await fsP.readFile(templateFile,{encoding: 'utf-8'});
    htmlData = data.split('\n');
  }
  catch(err)
  {
    console.log(err);
  }
}

async function loadComponent(filePath) {
  try{
    const data = await fsP.readFile(filePath,{encoding: 'utf-8'});
    resultData.push(data);
  }
  catch(err)
  {
    console.log(err);
  }
}

async function testAndPush(htmlString)
{
  try{
    const res = htmlString.search(/\{\{(.*)\}\}/i);
    let name = RegExp.$1;
    let data = htmlString;
    if (res!=-1 && name)
    { 
      await loadComponent(path.join(componentsFolder,name + '.html'));
    }
    else
    {
      resultData.push(data);
    }
  }
  catch(err)
  {
    console.log(err);
  } 
}

async function collectData(htmlData)
{
  try{
    for (const htmlString of htmlData) {
      await testAndPush(htmlString);
    }
    
  }
  catch(err)
  {
    console.log(err);
  }
}

async function checkTemplate()
{
  try{
    await loadTemplate();
    await collectData(htmlData);
  }
  catch(err)
  {
    console.log(err);
  }
}

async function writeAndRead()
{
  try{
    await checkTemplate();
    console.log('Created!');
    await fsP.writeFile(targetHtml, resultData.join('\n'));
  }
  catch(err)
  {
    console.log(err);
  } 
}

writeAndRead();
const fs = require('fs');
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

fs.writeFile(targetHtml, '', function(error){
  if(error) throw error;});

const templateStream = new fs.ReadStream(templateFile, {encoding: 'utf-8'});
templateStream.on('readable', function(){
  const templateFileContent = templateStream.read();
  if ( templateFileContent!=null )
  {
    const fileArray =  templateFileContent.split('\n');
    fileArray.forEach(data =>{
      if(data != null) {
        const res = data.search(/\{\{(.*)\}\}/i);
        let name = RegExp.$1;
        if (res!=-1 && name)
        { 
          const fileToHtml = path.join(componentsFolder,name + '.html'); 
          fs.access(fileToHtml, fs.F_OK, (err) => {
            if (err) {
              console.error(err);
            }
            else
            {
              const stream = new fs.ReadStream(fileToHtml, {encoding: 'utf-8'});
              stream.on('readable', function(){
                var fileContent = stream.read();
                if(fileContent != null) fs.appendFile(targetHtml, fileContent+'\n', function(error){
                  if(error) throw error;});
              } 
              );
            }    
          });
        }
        else { 
          fs.appendFile(targetHtml, data, function(error){
            if(error) throw error;});
        } 
      }
    });
  }
});
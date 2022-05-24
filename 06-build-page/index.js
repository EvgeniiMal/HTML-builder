const fs = require('fs');

fs.readdir('./06-build-page/', (err, files) => {
    if(err) throw err; // не прочитать содержимое папки 
    if(!files.includes("project-dist")){
        createDirectory();
    } else {
        createFiles();
    };
 });

 function createDirectory(){
    fs.mkdir(`./06-build-page/project-dist/`, err => {
        if(err) throw err;
        fs.mkdir(`./06-build-page/project-dist/assets`, err => {
            if(err) throw err; 
            createSubDir();
        })
    }); 
    
 } 
 function createSubDir(){
    fs.readdir('./06-build-page/assets/', (err, files) => {
        if(err) throw err; // не прочитать содержимое папки 
        files.forEach(dir => fs.mkdir(`./06-build-page/project-dist/assets/${dir}`, err => {if(err) throw err; createFiles();}));
     });
 }

 function createFiles(){
    const wsStyle = fs.createWriteStream("./06-build-page/project-dist/style.css");
    
    wsStyle.on('data', chunk => wsStyle.write(chunk));
    wsStyle.on('error', error => console.log('Error', error.message));

    fs.readdir('./06-build-page/styles/', (err, files) => {
        if(err) throw err; // не прочитать содержимое папки 
        files.forEach(file => writeFileToBundle(file));
     });
    

    function writeFileToBundle(file){
        const rs = fs.ReadStream(`./06-build-page/styles/${file}`);
        let data = '';

        rs.on('data', chunk => data += chunk);
        rs.on('end', ()=> fs.appendFile('./06-build-page/project-dist/style.css', `${data} `, function(error){if(error) throw error;}));      
    }

    copyDir();
    createHtml();
 }    
 function copyDir(){
        fs.readdir('./06-build-page/assets/', (err, files) => {
                if(err) throw err; 
                files.forEach(dir => copyFile(dir));     
        })
         
    function copyFile(dir){
            fs.readdir(`./06-build-page/assets/${dir}`, (err, files) => {
               if(err) throw err; 
                files.forEach(file => 
                    fs.copyFile(`./06-build-page/assets/${dir}/${file}`, `./06-build-page/project-dist/assets/${dir}/${file}`, (err) => {if (err) throw err}))
            })           
        }
}    
function createHtml(){
    const rsTemplateHtml = fs.createReadStream("./06-build-page/template.html", "utf8");
    let data = '';
    let components = [];

    fs.readdir('./06-build-page/components/', (err, files) => {
            if(err) throw err; 
            files.forEach(component => components.push(component));     
        })
    rsTemplateHtml.on('data', chunk => data += chunk);
    rsTemplateHtml.on('end', ()=> replaceSections(data), function(error){if(error) throw error;});  

        function replaceSections(data){
            for (let component in components){
                let componentName = components[component];
                let rs = fs.createReadStream(`./06-build-page/components/${componentName}`);
                let content = '';
                let componentsNameSearch = `{{${componentName.substring(0,componentName.indexOf('.'))}}}`;
                rs.on('data', chunk => content += chunk);
                rs.on('end', ()=> {
                    let newData = data.replace(componentsNameSearch, content);   
                    data = newData;
                    fs.writeFile('./06-build-page/project-dist/index.html', newData, function(error){if(error) throw error;});
                }, function(error){if(error) throw error;});  
            }
     //       fs.writeFile('./06-build-page/project-dist/index.html', data, function(error){if(error) throw error;});
        }     
    }
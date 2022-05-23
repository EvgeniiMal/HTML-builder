let fs = require('fs');
const ws = fs.createWriteStream('./05-merge-styles/project-dist/bundle.css');

fs.readdir('./05-merge-styles/styles/', (err, files) => {
   if(err) throw err; 
   let styleFiles = files.filter(item => item.includes(".css"));
   createBundle(styleFiles);
 });

 function createBundle(files){
    ws.on('data', chunk => ws.write(chunk));
    ws.on('error', error => console.log('Error', error.message));
    files.forEach(file => writeFileToBundle(file));

    function writeFileToBundle(file){
        const rs = fs.ReadStream(`./05-merge-styles/styles/${file}`);
        let data = '';

        rs.on('data', chunk => data += chunk);
        rs.on('end', ()=> fs.appendFile('./05-merge-styles/project-dist/bundle.css', `${data} `, function(error){if(error) throw error;}));      
    }
 }
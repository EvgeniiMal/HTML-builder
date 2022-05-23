let fs = require('fs');
fs.readdir('./03-files-in-folder/secret-folder/', (err, files) => {
   if(err) throw err; // не прочитать содержимое папки
   
   files.map(item => getStatsFile(item))
});

function getStatsFile(fileString){
    fs.stat(`./03-files-in-folder/secret-folder/${fileString}`, function(err, stats) {
        if (stats.isFile()) {
            let fileArr = fileString.split('.');
            console.log(`${fileArr[0]} - ${fileArr[1]} - ${stats.size/1000}kb`);
        }
    })
}

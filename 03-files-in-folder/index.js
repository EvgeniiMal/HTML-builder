const fs = require('fs');

fs.readdir('./03-files-in-folder/secret-folder', {withFileTypes: true}, (error, dirEntryList) => {
  if (!error){
    dirEntryList.forEach((dirEntry) => {
      fs.stat(`./03-files-in-folder/secret-folder/${dirEntry.name}`, (err,stats)=> {
        if (err) {
          console.log(err.message);
        } 
        console.log(dirEntry.name + ' ' + stats.size);
      });
    });
  } else {
    console.log(error);
  }
});

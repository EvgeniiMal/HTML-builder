

var fs = require('fs');

fs.readFile("text.txt", "utf8", 
            function(error,data){
                if(error) throw error; 
                console.log(data);
});
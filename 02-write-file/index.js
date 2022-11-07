const { stdin, stdout } = process;
const path = require('path')
const fs = require('fs');

stdout.write('Hello. What is your text?\n');

fs.writeFile(
    path.join(__dirname, '', 'text.txt'),
    "",
    (err) => {
        if (err) throw err;
    }
)

stdin.on('data', data => {

    if (data.toString().trim() == 'exit') {
        process.exit()
    }
    
    fs.appendFile(
        path.join(__dirname, 'text.txt'),
        data,
        (err) => {
                if (err) throw err
            }
        )
    }
);

process.on('exit', () => stdout.write("Good bye!"))
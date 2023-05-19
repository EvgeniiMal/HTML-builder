const fs = require('fs');
const readline = require('readline');

console.log('Привет! Введи текст для записи в файл:');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (text) => {
    fs.writeFile('text.txt', text, (err) => {
        if (err) throw err;

        console.log(`Текст "${text}" успешно записан в файл text.txt`);
        rl.close();
    });
});

const fs = require("fs");
const path = require("path");
const readline = require('readline');
const file = path.join(__dirname, ("alldialog.txt"));
const write = fs.createWriteStream(file);
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });

const botQuestion = "- привет, как тебя зовут, о велики кросс-чекер?\n";
const botAnswer = "- скоро буду, купи чипсов, ";
const botOffer = "\n- расскажи еще что-нибудь о себе, а я внимательно запишу в заметки, кроме твоего имени, КОНЕЧНО!,\n- найти их сможешь тут:";
const byeDear = "\nАга, испугался, думаешь, я не вижу, что ты закрыл консоль, используя Ctrl + C 😞"

rl.question(botQuestion, (answer) => {

    console.log(
        `${botAnswer}${answer}${botOffer}${file}`
    );

    rl.on('line', answer => {
        write.write(answer + "\n");
    });
});

rl.on('pause', () => {
    console.log(byeDear);
});
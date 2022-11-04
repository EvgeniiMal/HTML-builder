const { stdin: input, stdout: output } = require("process");
const readline = require("readline");
const fs = require("node:fs");
const path = require("node:path");

const filename = "userInputs.txt";
const filePath = path.resolve(path.join(__dirname, filename));

function writeToFile(path) {
  const openFileStream = fs.createWriteStream(path);

  const rl = readline.createInterface({
    input,
    output,
    prompt: "Введите, пожалуйста, текст для записи в файл >\n",
  });
  rl.prompt();
  rl.on("line", (data) => {
    if (data.trim() === "exit") {
      rl.close();
    } else {
      openFileStream.write(`${data.toString()} \n`);
      console.log(`Received: ${data.toString()}`);
    }
  }).on("close", () => {
    openFileStream.end();
    openFileStream.on("finish", () => {
      console.log(`Данные сохранены в файле ${filePath}`);
    });
  });

  const onExit = () => {
    rl.close();
    console.log("Удачи в изучении Node.js!");
  };

  process.on("exit", onExit);
  process.on("SIGINT", () => {
    exit();
  });
}

writeToFile(filePath);

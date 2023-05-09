const fs = require("fs");
const path = require("node:path");
let pathTXT = path.join(__dirname, "text.txt");

fs.appendFile(pathTXT, "", function (err) {
  if (err) throw err;
  console.log("Введите, пожалуйста, текст в консоль!");
  let stdin = process.openStdin();
  stdin.on("data", function (chunk) {
    if (chunk.toString().trim() == "exit") {
      console.log("Благодарю, что сделали проверку этого задания!");
      process.exit(0);
    }
    fs.appendFile(pathTXT, chunk, function (err) {
      if (err) throw err;
    });
    console.log("Got chunk: " + chunk);
    process.on("SIGINT", function () {
      console.log("Благодарю, что сделали проверку этого задания!");
      process.exit(0);
    });
  });
});

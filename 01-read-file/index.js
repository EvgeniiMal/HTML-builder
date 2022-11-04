const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, ("text.txt"));
const encode = "utf-8";
const stream = fs.createReadStream(file, encode);

async function readNOut() {
    try {
        stream.pipe(process.stdout);
    }
    catch (error) {
        console.log("something wrong happened, dear");
    }
}
readNOut();
const { stdin, stdout } = process
const fs = require("fs")
const path = require("path")

const output = fs.createWriteStream(path.join(__dirname, "text.txt"), 'utf-8')

stdout.write('type some text\n')

stdin.on('data', data => {
    if (data.toString().trim() === 'exit') exit()

    output.write(data)
})
process.on('SIGINT', exit)

function exit() {
    stdout.write('Goodbye!')
    process.exit()
}

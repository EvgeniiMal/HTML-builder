const fsProm = require('fs/promises');
const path = require('path');
const secretFolder = path.join(__dirname, "secret-folder");

async function fileList(secretFolder) {

    const files = await fsProm.readdir(secretFolder, { withFileTypes: true });

    files.forEach((file) => {
        if (file.isFile()) {
            const fileName = file.name.split('.')[0];
            const extencion = path.extname(file.name).slice(1);
            
            fsProm.stat(path.join(secretFolder, file.name))
                .then(sizeFile =>
                    console.log(`${fileName} - ${extencion} - ${Math.round(sizeFile.size/1024)} kb`));
        };
    })
};
fileList(secretFolder);
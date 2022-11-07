const fs = require("fs");
const path = require("path");
const promises = fs.promises;

promises
  .readdir(path.join(__dirname, "secret-folder"), {
    withFileTypes: true,
  })
  .then((results) => {
    results.forEach((result) => {
      if (!result.isDirectory()) {
        const fPatch = path.join(__dirname, "secret-folder", result.name);
        const fName = path.basename(fPatch);
        const ext = path.extname(fPatch);
        promises.stat(fPatch).then((res) => {
          console.log(
            `Info: \n${fName.replace(ext, "")} - ${ext.replace(
              ".",
              ""
            )} - ${Number(res.size / 2000).toFixed(3)}kb`
          );
        });
      }
    });
  });

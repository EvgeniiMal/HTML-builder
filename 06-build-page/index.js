let path = require("path");
let fs = require("fs");

let pathCopy = path.join(__dirname, "project-dist");
let pathAssCopy = path.join(pathCopy, "assets");
let folderPath = path.join(__dirname, "components");
let pathCSS = path.join(__dirname, "styles");
let pathAss = path.join(__dirname, "assets");

function copyDir(dir, exit) {
  fs.readdir(dir, { withFileTypes: true }, function (err, files) {
    if (err) throw err;
    files.forEach(function (file) {
      if (!file.isFile()) {
        fs.stat(path.join(exit, file.name), function (err) {
          if (err) {
            fs.mkdir(path.join(exit, file.name), function (err) {
              if (err) {
                return console.erroror(err);
              }
            });
            copyDir(`${dir}\\${file.name}`, path.join(exit, file.name));
          } else {
            copyDir(`${dir}\\${file.name}`, path.join(exit, file.name));
          }
        });
      } else {
        fs.copyFile(
          `${dir}\\${file.name}`,
          `${exit}\\${file.name}`,
          function (err) {
            if (err) throw err;
          }
        );
      }
    });
  });
}

fs.stat(pathCopy, function (err) {
  if (err) {
    fs.mkdir(pathCopy, function (err) {
      if (err) {
        return console.erroror(err);
      }
    });
    copyHTML();
  } else {
    fs.readdir(pathCopy, function (err) {
      if (err) console.log(err);
      else {
        copyHTML();
      }
    });
  }
});

fs.stat(pathAssCopy, function (err) {
  if (err) {
    fs.mkdir(pathAssCopy, function (err) {
      if (err) {
        return console.erroror(err);
      }
    });
    copyDir(pathAss, pathAssCopy);
  } else {
    copyDir(pathAss, pathAssCopy);
  }
});

// копируем template.html в index.html
function copyHTML() {
  fs.copyFile(
    `${__dirname}\\template.html`,
    `${pathCopy}\\index.html`,
    function (err) {
      if (err) throw err;
      fs.readFile(`${pathCopy}\\index.html`, "utf8", function (err, data) {
        if (err) throw err;
        fs.readdir(folderPath, { withFileTypes: true }, function (err, files) {
          if (err) throw err;

          files.forEach(function (file) {
            fs.readFile(
              `${folderPath}\\${file.name}`,
              "utf8",
              function (err, dataFile) {
                if (err) throw err;
                let tagName = `{{${file.name.split(".")[0]}}}`;
                data = data.replace(tagName, dataFile);
                fs.writeFile(`${pathCopy}\\index.html`, data, function (err) {
                  if (err) console.log(err);
                });
              }
            );
          });
        });
      });
    }
  );
}

// css
fs.readdir(pathCSS, { withFileTypes: true }, async (err, all) => {
  if (err) {
    console.log(err);
  } else {
    all.forEach(function (one, ind) {
      let cssPath = path.join(pathCSS, one.name);
      if (one.isFile() && one.name.split(".")[1] === "css") {
        fs.readFile(cssPath, "utf8", function (err, data) {
          if (err) {
            console.log(err);
          } else if (ind === 0) {
            fs.writeFile(
              path.join(pathCopy, "style.css"),
              data,
              function (err) {
                if (err) console.log(err);
              }
            );
          } else {
            fs.appendFile(
              path.join(pathCopy, "style.css"),
              data,
              function (err) {
                if (err) console.log(err);
              }
            );
          }
        });
      }
    });
  }
});

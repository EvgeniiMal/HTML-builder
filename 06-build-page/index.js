module.exports = buildHtml;

function buildHtml(tempFile, compPath, buildHtmlFile) {
  const path = require('path');
  const fs = require('fs');
  const rs = fs.createReadStream(tempFile, {encoding: 'utf-8'});
  let countMods = 0;
  let tempString = '';
  
  rs.on('data', data => tempString += data)
  rs.on('error', err => addPart(`не могу прочитать "template.html" файл`, err))
  rs.on('close', () => {
    const tempArr = tempString
      .split('{')
      .map(data => data == '' ? '{' : data)
      .map(data =>
        data.split('}')
          .map(data => data == '' ? '}' : data)
      ).flat()
    tempArr.forEach((compFile, i, arr) => {
      if(arr[i-1] == '{' && arr[i+1] == '}') {
        countMods++;
        let cData = '';
        const compFilePath = path.join(compPath, compFile + '.html');
        const rsComp = fs.createReadStream(compFilePath, {encoding: 'utf-8'});
        rsComp.on('data', data => cData += data);
        rsComp.on('error', err => {cData = addPart(`Не удается прочитать файл компонента "${compFile}.html"`, err)});
        rsComp.on('close', () => {
          arr[i] = cData;
          countMods--;
          if(countMods == 0) {
            const ws = fs.createWriteStream(buildHtmlFile)
            const toWrite = tempArr
              .flat()
              .filter(data => data == '{' || data == '}' ? '' : data)
              .join('')
            ws.write(toWrite, err => {if(err) console.log(err)})
          }
        });
      }
    });
  });

  function addPart(titl, txt) {
    return `<div class="build-error">
              <h2 class="build-error__title">${titl}</h2>
              <p class="build-error__text">${txt}</p>
            </div>`
    }
}

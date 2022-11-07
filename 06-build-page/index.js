const path = require('path');
const fs = require('fs');
const fsPr = require('fs').promises;

const nameDistDir = "project-dist";

const srcCSSDir = "styles";
const distCSSFile = "style.css"

const srcAssetsPath = "assets";

const templateHTMLFile = "template.html";
const componentsHTMLPath = "components";
const distHTMLFile = "index.html"

async function remakeDir(nameDir) {
	const pathDir = path.resolve(__dirname, nameDir);

	await fs.promises.rm(pathDir, { recursive: true, force: true });
	await fs.promises.mkdir(pathDir, { recursive: true });
}

function readFile(nameFile, change) {
	return new Promise(function (resolve, reject) {
		let output = "";
		const stream = fs.createReadStream(path.resolve(__dirname, nameFile));
		stream.on('data', function (part) { output += part; }); // (typeof change == "function") ? change(part) : 
		stream.on('end', () => resolve(output));
	});
}

async function buildHTMLBundle(template, componentsFolder, distName, distFile) {
	const componentsHTMLPath = path.resolve(__dirname, componentsFolder);

	const files = await fs.promises.readdir(componentsHTMLPath, { encoding: "utf-8", withFileTypes: true });
	const filesHTML = files.filter((file) => file.isFile() && (file.name.lastIndexOf(".html") != -1));

	const templateSteam = await fs.createReadStream(path.resolve(__dirname, template));
	const bundleStream = await fs.createWriteStream(path.resolve(__dirname, distName, distFile));

	const tempFileString = await readFile(path.resolve(__dirname, template));
	const tempFileBundle = tempFileString.toString().replace(/\}{2}\r\n/gm, ".html}}").replace(/[\{,\}]{1,}/gm, "|").split("|")

	for (let i = 0; i < tempFileBundle.length; i++) {
		if (tempFileBundle[i].lastIndexOf(".html") != -1) tempFileBundle[i] = await readFile(path.join(componentsFolder, tempFileBundle[i]));

		bundleStream.write(tempFileBundle[i]);
	}
}

async function buildCSSBundle(srcDir, nameDir, nameDist) {

	const dirSrcPath = path.resolve(__dirname, srcDir);
	const dirCompPath = path.resolve(__dirname, nameDir, nameDist);

	const wrStream = await fs.WriteStream(dirCompPath);

	const files = await fsPr.readdir(dirSrcPath, { encoding: "utf-8", withFileTypes: true });
	const CSSFiles = files.filter((file) => file.isFile() && (file.name.lastIndexOf(".css") != -1));

	for (let file of CSSFiles) {

		const srcFileStream = fs.ReadStream(path.resolve(dirSrcPath, file.name));

		srcFileStream.pipe(wrStream);
	}
}

async function copyDir(srcDir, destDir) {

	const srcPath = path.resolve(__dirname, srcDir);
	const destCopyPath = path.resolve(__dirname, destDir, srcDir);

	await remakeDir(destCopyPath);
	const files = await fs.promises.readdir(srcPath, { encoding: "utf-8", withFileTypes: true });

	for (let file of files) {
		if (!file.isDirectory()) fs.promises.copyFile(path.join(srcPath, file.name), path.join(destCopyPath, file.name));
		else copyDir(path.join(srcDir, file.name), destDir);
	}

}





remakeDir(nameDistDir).then(() => {
	buildCSSBundle(srcCSSDir, nameDistDir, distCSSFile);
	copyDir(srcAssetsPath, nameDistDir);
	buildHTMLBundle(templateHTMLFile, componentsHTMLPath, nameDistDir, distHTMLFile);
});



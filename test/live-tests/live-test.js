const fs = require('fs');
const path = require('path');
const programLoader = require('../../modules/runtime/programLoader');

const sourceFileName = process.argv.slice(2)[0];

function loadSource(fileName) {
    const filePath = path.join(__dirname, fileName);
    return fs.readFileSync(filePath, { encoding: 'utf8' });
}

const programSource = loadSource(sourceFileName);

console.log('\n********** Program source: **********\n');

console.log(programSource);

console.log('\n********** Program output: **********\n');

programLoader.loadAndRun(programSource);
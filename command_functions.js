const fs = require('fs');
const fileText = fs.readFileSync('./test.txt','utf8')

function countLines(input) {
    const splitByLines = input.split('\n').length;
    return splitByLines;
}

console.log(countLines(fileText))
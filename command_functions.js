const fs = require('fs');
const fileText = fs.readFileSync('./test.txt','utf8')

function countLines(input) {
    const splitByLines = input.split('\n').length;
    return splitByLines;
}

console.log(countLines(fileText))

function countWords(input){
    const noSpaceExp = /\s+/g
    const splitByWords = input.trim().replace(noSpaceExp, " ").split(' ').length;
    return splitByWords
}

console.log(countWords(fileText))

function countCharacters(input){
    const splitByCharacters = input.split('').length;
    return splitByCharacters
}

console.log(countCharacters(fileText))
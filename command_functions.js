const fs = require('fs');
const { argv } = require("node:process");

// print process.argv
function parseTerminalArguments(args) {
    const argRecord = {};
    //check that there is at least one parameter provided and it is a path
    if (args.length === 0 || !args.at(-1).includes(".")) {
        throw new Error("Please supply a valid path");
    }
    argRecord.path = args.pop();
    //only take first option
    if (args.length > 0) {
        argRecord.option = args[0];
    }
    return argRecord;
}

//read a file based on option flags
function main() {
    const { path, option } = parseTerminalArguments(argv.slice(2));
    const fileText = fs.readFileSync(`${path}`, 'utf8');

    switch (option) {
        case '-l':
            return console.log(countLines(fileText), path);
            break;
        case '-w':
            return console.log(countWords(fileText), path);
            break;
        case '-m':
            return console.log(countCharacters(fileText), path);
            break;
        case '-c':
            return console.log(countBytes(fileText), path);
            break
        default:
            return console.log(countLines(fileText), countWords(fileText), countBytes(fileText), path);
            break;
    }
}
main();



function countLines(input) {
    const splitByLines = input.split('\n').length;
    return splitByLines;
}

function countWords(input) {
    const noSpaceExp = /\s+/g
    const splitByWords = input.trim().replace(noSpaceExp, " ").split(' ').length;
    return splitByWords;
}

function countCharacters(input) {
    const splitByCharacters = input.split('').length;
    return splitByCharacters;
}

function countBytes(input) {
    const byte = Buffer.from(input).length;
    return byte;
}
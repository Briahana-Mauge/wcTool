const fs = require('fs');
const { argv } = require("node:process");
const resolve = require("path").resolve;
process.stdin.setEncoding("utf8");

const globalData = [];

process.stdin.on("data", function (data) {
    globalData.push(data);
});
process.stdin.on("end", function (data) {
    main(globalData.join(""));
    process.exit();
});

// print process.argv
function parseTerminalArgumentsWithoutCat(args) {
    const argRecord = {};
    //check that there is at least one parameter provided and it is a path
    if (args.length === 0 || !args.at(-1).includes(".")) {
        throw new Error("Please supply a valid path");
    }

    argRecord.path = args.pop();
    if (argRecord.path[0] === ".") {
        argRecord.path = resolve(argRecord.path);
    }
    //only take first option
    if (args.length > 0) {
        argRecord.option = args[0];
    }
    return argRecord;
}

//read a file based on option flags
function main(globalData) {
    let fileText;
    let commandOption;
    let filePath = "";
    if (globalData && globalData.length > 0) {
        fileText = globalData;
        commandOption = argv[argv.length - 1] || "";
    } else {
        const { path, option } = parseTerminalArgumentsWithoutCat(argv.slice(2));
        fileText = fs.readFileSync(`${path}`, 'utf8');
        commandOption = option;
    }
    switch (commandOption) {
        case '-l':
            console.log(countLines(fileText), filePath);
            break;
        case '-w':
            console.log(countWords(fileText), filePath);
            break;
        case '-m':
            console.log(countCharacters(fileText), filePath);
            break;
        case '-c':
            console.log(countBytes(fileText), filePath);
            break;
        default:
            console.log(countLines(fileText), countWords(fileText), countBytes(fileText), filePath);
            break;
    }

    process.exit();
}
//process.stdin.isTTY if the process is connected to the raw terminal instead of being
//piped from another command
//TTY is true if nothing is being piped or redirected. it is true if the terminal
//is running interactively
//if this is true that means there is no cat, so we run main without external data
//and read the file the user passes in with node
if (process.stdin.isTTY) main();



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
let input = process.argv.slice(2);

function minus(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function sum(a, b) {
    return a + b;
}

let commands = {
    "-m" : minus,
    "-s" : sum,
    "-M" : multiply
}

console.log(commands[input[0]](parseInt(input[1]),parseInt(input[2])))
let inputs = process.argv.slice(2);
let command = inputs[0];

let controllers = [];

function parseInput(input){
    return parseInt(input);
}

function use(name, func){
    let x = {
        command: name,
        function: func
    };

    controllers.push(x);
}


function loop(){
    let found = false;
    for(let item of controllers){
        if(item.command === command){
            console.log(item.function(parseInput(inputs[1]), parseInput(inputs[2])));
            found = true
        }
    }
    if (!found){
        console.log("Command not Found");
    
    }
}

module.exports = {
    use: use,
    loop: loop
}

let fs = require('fs');
let inputs = process.argv.slice(2);
let command = inputs[0];
let controllers = [];

function parseInput(input){
    if(isNaN(parseInt(input))){
        return input;
    }
    return parseInt(input);
}

function use(name, func){
    let x = {
        command: name,
        function: func
    };
    controllers.push(x);
}

function start(){
    function next(){
        let found = false;
        for(let item of controllers){
            if(item.command === command){
                item.function(inputs);
                found = true;
            }
        }
        if(!found){
            console.log('Command not found.');
        }
    }

    fs.readFile('database.json', function(error, data){
        if(error){
            if(error.code === 'ENOENT'){
                fs.writeFile('database.json', JSON.stringify({data:[]}), {encoding:'utf8'}, function(error){
                    if(error){
                        console.log('ERROR:', error);
                    }
                    else{
                        console.log("Database created.")
                        next();
                    }
                })
            }
        }
        else{
            console.log("Database already exists.")
            next();
        }
    });
}

module.exports = {
    use: use,
    start: start,
    parseInput: parseInput
}

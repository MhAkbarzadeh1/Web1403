let cmd = require('./C-4-cmd.js');
let fs = require('fs');

cmd.use("minus", function(contInputs){
    console.log(cmd.parseInput(contInputs[1]) - cmd.parseInput(contInputs[2]));
});
cmd.use("sum", function(contInputs){
    console.log(cmd.parseInput(contInputs[1]) + cmd.parseInput(contInputs[2]));
});
cmd.use("multiply", function(contInputs){
    console.log(cmd.parseInput(contInputs[1]) * cmd.parseInput(contInputs[2]));
});
cmd.use("div", function(contInputs){
    console.log(cmd.parseInput(contInputs[1]) / cmd.parseInput(contInputs[2]));
});
cmd.use("printRecord", function(contInputs){
    console.log(({
        name: contInputs[1],
        family: contInputs[2],
        age: contInputs[3],
        email: contInputs[4]
    }));
});
cmd.use("saveRecord", function(contInputs){
    fs.writeFile('myDatabase.txt', contInputs, {encoding:'utf8'}, function(error){
        if(error){
            console.log('ERROR:', error);
        }
        else{
            console.log('File Saved.')
        }
    })
});

cmd.use("saveRecord2", function(contInputs){
    let x = {
        name: contInputs[1],
        family: contInputs[2],
        age: contInputs[3],
        email: contInputs[4]
    };
    x= JSON.stringify(x)
    fs.writeFile('myDatabase.txt', x, {encoding:'utf8'}, function(error){
        if(error){
            console.log('ERROR:', error);
        }
        else{
            console.log('File Saved.')
        }
    })
});
cmd.use("openfile", function(contInputs){
    fs.readFile(contInputs[1], function(error,data){
        if(error){
           if (error.code === 'ENOENT'){
            console.log("File not Found")
           }
           else if(error.code === 'EINVAL'){
                fs.readdir(contInputs[1], function(error,data){
                    if(error){
                        console.log("ERROR",error)
                       }
                    else{
                        console.log('Dir Opened',data.toString())
                    }
                })
           } 
        }
        else{
            console.log('File Opened',data.toString())
        }
    })
});


cmd.start();
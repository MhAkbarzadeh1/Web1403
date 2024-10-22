let cmd = require('./D-1-cmd');
let fs = require('fs');

cmd.use("minus", function (contInputs) {
    console.log(cmd.parseInput(contInputs[1]) - cmd.parseInput(contInputs[2]))
});
cmd.use("sum", function (contInputs) {
    console.log(cmd.parseInput(contInputs[1]) + cmd.parseInput(contInputs[2]))
});
cmd.use("multiply", function (contInputs) {
    console.log(cmd.parseInput(contInputs[1]) * cmd.parseInput(contInputs[2]))
});
cmd.use("div", function (contInputs) {
    console.log(cmd.parseInput(contInputs[1]) / cmd.parseInput(contInputs[2]))
});
cmd.use("print", function (contInputs) {
    console.log({
        Name: contInputs[1],
        Family: contInputs[2],
        Age: contInputs[3],
        Email: contInputs[4]
    })
});

cmd.use("save", function (contInputs) {
    let newObj = {
        name: contInputs[1],
        family: contInputs[2],
        age: contInputs[3]
    }
    fs.writeFile('myFile.txt', JSON.stringify(newObj), 'utf8', function (error) {
        if (error) {
            console.log("ERROR:", error);
        } else {
            console.log("File Saved");
        }
    })
})


cmd.use("openFile", function (contInputs) {
    fs.readFile(contInputs[1], "utf8", function (error, data) {
        if (error) {
            console.log("ERROR:", error);
        } else {
            console.log(data.toString());
        }
    })
})


cmd.use("open", function (contInputs) {
    fs.readFile(contInputs[1], "utf8", function (err, data) {
        if (error) {
            if (error.code === "EISDIR") {
                fs.readdir(contInputs[1], "utf8", function (error, datas) {
                    if (error) {
                        console.log("not Finded :(");
                    } else {
                        console.log("Files: ", datas);
                    }
                })
            } else {
                console.log(error);
            }
        } else {
            console.log(data.toString());
        }
    })
})


cmd.use("saveOBJ", function (contInputs) {

    fs.readFile("Database.json", function (error, data) {
        if (error) {
            if (error.code === 'ENONET')
            console.log("File not Found");
        else{
            console.log("some other Error",error)
        }
        } else {

            let dObj = {
                name: contInputs[1],
                family: contInputs[2],
                age: contInputs[3],
                email: contInputs[4]
            }

            let obj = JSON.parse(data.toString());
            obj.data.push(dObj);
            let txt = JSON.stringify(obj);
            fs.writeFile("Database.json", txt, {encoding:"utf8"}, function (err) {
                if (err) {
                    console.log("ERROR:", err);
                } else {
                    console.log("File Saved!");
                }
            })
        }
    })

})
cmd.start();
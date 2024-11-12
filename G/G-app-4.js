let app = require('./G-http-1.js');

function write(res, body){
    res.write(JSON.stringify(body));
    res.end();
}

app.use('/test', function(request, response){
    console.log('test.')
});
app.use('/sum', function(request, response){
    result = {
        data: parseInt(request.path[2]) + parseInt(request.path[3])
    };

    write(response, result);
});
app.use('/multiply', function(request, response){
    result = {
        data: parseInt(request.path[2]) * parseInt(request.path[3])
    };
    write(response, result);
});
app.use('/printRecord', function(request, response){
    result = {
        "name": request.path[2],
        "family": request.path[3],
        "email": request.path[4]
    }
    write(response, result);
});

app.use('/file', function(request, response){
    let fs = require('fs');

    fs.writeFile(request.data.name, request.data.content, function(err) {
        if (err) {
            console.log('FAILLLLL')
            write(response, { status: "FAIL"})
        }
        else{
            console.log('OKKKKKKKK');
            write(response, { status: "OK"})
        }
    }); 
});

app.use('/data', function(request, response){
    let fs = require('fs');
    fs.readFile("./database.json",function(err,FileData){
        if (err) {
            write(response, { status: "FAIL"})
        }
        else if(request.method == "POST"){
            let obj = JSON.parse(FileData);
            obj.records.push(request.data);
            let txt = JSON.stringify(obj);
            fs.writeFile("./Data.json", txt, {encoding:"utf8"}, function (err) {
                if (err) {
                    write(response, { status: "FAIL"})
                } else {
                    fs.writeFile("./Data.json", txt, {encoding:"utf8"}, function (err) {
                        if (err) {
                            write(response, { status: "FAIL"})
                        } else {
                            write(response, { status: "OK"})
                        }
                    })
                }
            })
        }
        else if(request.method == "GET"){
            let obj = JSON.parse(FileData);
            write(response, obj);
        }
        else if (request.method == "PUT"){
            let obj = JSON.parse(FileData);
            let i = 0;
            for(let item of obj.records){
                if (request.path[2]==item.id){
                    break;
                }
                i++;
            }
            
            obj.records[i].content = request.data;

            fs.writeFile("./database.json", JSON.stringify(obj), {encoding:"utf8"}, function (err) {
                if (err) {
                    write(response, { status: "FAIL"})
                } else {
                    write(response, { status: "OK"})
                }
            })
        }
        else{
            write(response, { status: "FAIL"}) 
        }
    })
    
});

app.start();


let app = require('./i-http-1.js');
let fs = require('fs');

function write(res, body, ext, cookie){
    if(!ext){
        ext = 'json';
    }
    if(!cookie){
        cookie = '';
    }

    let types = {
        'txt': 'text/plain',
        'html': 'text/html',
        'jpg': 'image/jpeg',
        'json': 'application/json'
    } 
    res.writeHead(200, { 
        'Content-Type':  types[ext],
        'Set-Cookie': cookie
    });
    res.write(body);
    res.end();
}

app.use('GET', '/test', function(request, response){
    console.log('test.')
});

app.use('GET', '/sum', sumController);
app.use('POST', '/sum', sumController);
function sumController(request, response){
    result = {
        data: parseInt(request.path[2]) + parseInt(request.path[3])
    };

    write(response, result);
}

app.use('GET', '/multiply', function(request, response){
    result = {
        data: parseInt(request.path[2]) * parseInt(request.path[3])
    };
    write(response, result);
});

app.use('GET', '/printRecord', function(request, response){
    result = {
        "name": request.path[2],
        "family": request.path[3],
        "email": request.path[4]
    }
    write(response, result);
});

app.use('POST', '/file', function(request, response){
    fs.writeFile(request.data.name, request.data.content, function(err) {
        if (err) {
            console.log('FAILLLLL');
            write(response, { status: "FAIL"})
        }
        else{
            console.log('OKKKKKKKK');
            write(response, { status: "OK"})
        }
    }); 
});

app.use('POST', '/data', function(request, response){
    fs.readFile('./database.json', {encoding:'utf8'}, function(error, fileData){
        if(error){
            write(response, { status: "FAIL"});
        }
        else{
            let obj = JSON.parse(fileData);
            obj.records.push(request.data);
            let string = JSON.stringify(obj);
            fs.writeFile('./database.json', string, function(error2){
                if(error2){
                    write(response, { status: "FAIL"});
                }
                else {
                    write(response, { status: "OK"});
                }
            })
        }
    });  
});
app.use('GET', '/data', function(request, response){
    fs.readFile('./database.json', {encoding:'utf8'}, function(error, fileData){
        if(error){
            write(response, { status: "FAIL" });
        }
        else{
            write(response, JSON.parse(fileData));
        }
    });  
}); 

app.use('PUT', '/data', function(request, response){
    function getArrayIndex(array, id){
        for(let i=0; i<array.length; i++){
            if(array[i].id === id){
                return i;
            }
        }
        return -1;
    }
    fs.readFile('./database.json', {encoding:'utf8'}, function(error, fileData){
        if(error){
            write(response, { status: "readFile FAIL" });
        }
        else{
            let obj = JSON.parse(fileData);
            let i = getArrayIndex(obj.records, request.data.id);
            if(i<0){
                write(response, { status: "ID not found"});
            }
            else{
                obj.records[i].content = request.data.content;
                let string = JSON.stringify(obj);
                fs.writeFile('./database.json', string, function(error2){
                    if(error2){
                        write(response, { status: "writeFile FAIL"});
                    }
                    else {
                        write(response, { status: "update OK"});
                    }
                })
            }
        }
    });  
}); 

app.use('GET', '/image', function(request, response){
    fs.readFile(request.path[2], function(err, data) {
        if (err) {
            console.log('FAILLLLL');
            write(response, { status: "FAIL"})
        }
        else{
            response.writeHead(
                200, 
                { 'Content-Type': 'text/plain' }
            );
            response.write(data);
            response.end();
        }
    }); 
});

app.use('GET', '/file', function(request, response){
    fs.readFile(request.path[2], function(err, data) {
        if (err) {
            console.log('FAILLLLL');
            write(response, { status: "FAIL"})
        }
        else{
            let ext = request.path[2].split('.')[1];
            console.log('ext', ext)
            write(response, data, ext);
        }
    }); 
});

app.use('GET', '/page', function(request, response){
    write(response, 'hello world', 'txt', 'x=1');
});

app.start();
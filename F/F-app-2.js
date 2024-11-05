const path = require('path');
let app = require('./F-http-1.js');
let fs = require('fs');

function write(response, body){
    response.write(JSON.stringify(body));
    response.end();
}

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

app.use('/saveRecord', function(request, response){
    result = {
        "name": request.path[2],
        "family": request.path[3],
        "email": request.path[4]
    }
    writeFile('database.txt', x, function(){
        console.log('File Saved.');
        write(response, { result: 'File Saved. sdfdsfds'});
    });
});

app.use('/create', function(request, response){
    result = {
        "name": request.path[2],
        "family": request.path[3],
        "email": request.path[4]
    }
    writeFile(url[2], x, function(){
        console.log('File Saved.');
        write(response, { result: 'File Saved.'});
    });
});

function writeFile(name, body, callback){
    body = JSON.stringify(body);
    fs.writeFile(name, body, function(error){
        if(error){
            console.log('ERROR:', error);
            write(response, { result: 'ERROR:', error});
        }
        else{
            callback();
        }
    })
}

app.start();

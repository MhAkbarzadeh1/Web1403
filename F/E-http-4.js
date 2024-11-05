let http = require('http');
let fs = require('fs');

function write(res, body){
    res.write(JSON.stringify(body));
    res.end();
}

let server = http.createServer(function(req, res){
    console.log('request:', req.method, req.url);
    let path = req.url.split('/');
    let result;

    if(path[1] === 'sum'){
        result = {
            data: parseInt(path[2]) + parseInt(path[3])
        };
        write(res, result);
    }
    if(path[1] === 'multiply'){
        result = {
            data: parseInt(path[2]) * parseInt(path[3])
        };
        write(res, result);
    }
    if(path[1] === 'printRecord'){
        result = {
            "name": path[2],
            "family": path[3],
            "email": path[4]
        }
        write(res, result);
    }
    if(path[1] === 'saveRecord'){
        let x = {
            "name": path[2],
            "family": path[3],
            "email": path[4]
        }
        writeFile('database.txt', x, function(){
            console.log('File Saved.');
            write(res, { result: 'File Saved. sdfdsfds'});
        });

    }
    if(path[1] === 'create'){
        let x = {
            "name": path[3],
            "family": path[4],
            "email": path[5]
        }
        writeFile(path[2], x, function(){
            console.log('File Saved.');
            write(res, { result: 'File Saved.'});
        });
    }
});

function writeFile(name, body, callback){
    body = JSON.stringify(body);
    fs.writeFile(name, body, function(error){
        if(error){
            console.log('ERROR:', error);
            write(res, { result: 'ERROR:', error});
        }
        else{
            callback();
        }
    })
}
server.listen(80);
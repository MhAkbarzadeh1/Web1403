let http = require('http');

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
    }
    if(path[1] === 'multiply'){
        result = {
            data: parseInt(path[2]) * parseInt(path[3])
        };
    }
    if(path[1] === 'printRecord'){
        result = {
            "name": path[2],
            "family": path[3],
            "email": path[4]
        }
    }

    write(res, result);
});

server.listen(80);
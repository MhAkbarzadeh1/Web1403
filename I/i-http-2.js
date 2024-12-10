let http = require('http');
let controllers = [];

function use(method, asghar, func){
    let x = {
        method: method,
        url: asghar,
        function: func
    };
    controllers.push(x);
}

function route(request, response){
    let found = false;
    for(let item of controllers){
        //if(item.url === request.url){
        if(request.url.startsWith(item.url) 
        && request.method === item.method){
            item.function(request, response);
            found = true;
        }
    }
    if(!found){
        console.log('Path not found.');
        response.write('Path not found.');
        response.end();
    }
}

function start(){
    console.log('start')
    let server = http.createServer(function(request, response){
        console.log('-----------------------------------')
        console.log('request:     ', request.method, request.url);
        request.asghar = 'nasser';
        request.path = request.url.split('/');
        
        let data = '';
        request.on('data', function(chunck){
            data = data + chunck;
        });
        request.on('end', function(chunck){
            try{
                request.data = JSON.parse(data);
            }
            catch(e){
                request.data = data;
            }
            console.log('request.data:', request.data);
            route(request, response);
        });

    });
    server.listen(80);
}

module.exports = {
    use: use,
    start: start
}
let http = require('http');
let server = http.createServer(function(req, res){
    console.log('request:', req.method, req.url);
    let path = req.url.split('/');
    if (path[1] === "multiply"){
        let multiply = parseInt(path[2]) * parseInt(path[3]);
        console.log('path:', path);
        console.log('multiply:', multiply);
    
        res.write(multiply.toString());
        res.end();

    }
    else if (path[1] === "sum"){
        let sum = parseInt(path[2]) + parseInt(path[3]);
        console.log('path:', path);
        console.log('multiply:', sum);
        res.write(sum.toString());
        res.end();
    }
    else {
        res.write("Command Not Found")
        res.end();
    }
    
});
server.listen(80);
let http = require('http');
let server = http.createServer(function(req, res){
    let path = req.url.split('/');
    let sum = parseInt('<h1>' + path[1]) + parseInt(path[2] + '</h1>');
    console.write(sum.toString());
    res.end();
});
server.listen(80);
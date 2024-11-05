let app = require('./F-http-1.js');

app.use('/test', function(request, response){
    console.log('test.')
});
app.use('/sum', function(request, response){
    result = {
        data: parseInt(path[2]) + parseInt(path[3])
    };
    write(res, result);
});

app.start();

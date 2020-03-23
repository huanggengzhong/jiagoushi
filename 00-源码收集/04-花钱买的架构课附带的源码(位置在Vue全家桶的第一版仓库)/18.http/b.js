let http = require('http');


http.createServer(function(req,res){
    res.end('b'); 
}).listen(4000)
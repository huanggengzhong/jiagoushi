let http = require('http');
let fs = require('fs');
let path =  require('path');
let url = require('url');
let zlib = require('zlib');
let server = http.createServer((req,res)=>{
    let encoding = req.headers['accept-encoding'];
    if(encoding){
        // Accept-Encoding: gzip, deflate
        if(/\bgzip\b/.test(encoding)){
            res.setHeader('Content-Encoding','gzip');
            fs.createReadStream('./1.html').pipe(zlib.createGzip()).pipe(res);
            return 
        }
        if(/\bdeflate\b/.test(encoding)){
            res.setHeader('Content-Encoding','deflate');
            fs.createReadStream('./1.html').pipe(zlib.createDeflate()).pipe(res);
            return
        }
        fs.createReadStream('./1.html').pipe(res);
    }else{
        fs.createReadStream('./1.html').pipe(res);
    }
});
server.listen(5000);
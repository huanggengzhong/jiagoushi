let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');  // 0.1+0.2!=0.3 双精度  
let mime = require('mime'); // 第三方模块
let server = http.createServer((req,res)=>{
    // 获取请求的路径 去当前目录下查找
    let {pathname} = url.parse(req.url,true);
    // /client/index.html
    let currentPath = path.join(__dirname,pathname);
    fs.stat(currentPath,(err,statObj)=>{
        if(err){
            res.statusCode = 404;
            return res.end('Not Found')
        }
        if(statObj.isDirectory()){
            currentPath = path.join(currentPath,'index.html');
            fs.access(currentPath,(err)=>{
                if(err){
                    res.statusCode = 404;
                    return res.end('Not Found')
                }else{
                    res.setHeader('Content-Type',mime.getType(currentPath)+';charset=utf8');
                    fs.createReadStream(currentPath).pipe(res);
                }
            })
        }else{ // pipe  //.js application/x-javascript   .html text/html
            res.setHeader('Content-Type',mime.getType(currentPath)+';charset=utf8');
            fs.createReadStream(currentPath).pipe(res);
        }
    });
});
server.listen(3000);


// http://localhost:3000/client/
// http://localhost:3000/client/index.html?  
// http://localhost:3000/client/1.js  
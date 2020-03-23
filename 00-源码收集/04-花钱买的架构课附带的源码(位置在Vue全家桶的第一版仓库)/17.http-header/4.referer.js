let http = require('http');
let fs = require('fs');
let path =  require('path');
let url = require('url');
 let whiteList = ['localhost:4000']
let server = http.createServer((req,res)=>{
    fs.stat('.'+req.url,function(err,statObj){
        if(err){
            console.log(err);
            res.statusCode = 404
            res.end();
            return 
        }
        if(statObj.isDirectory()){
            res.end();
        }else{
            /**
             * 
             * Host: a.zhufeng.cn:4000
               Referer: http://b.zhufeng.cn:4000/1.html 判断引用来源
             */
            let refererHost = req.headers['referer']
            if(refererHost){ // 如果有referer  才需要做防盗链
                refererHost = url.parse(refererHost).host
                let host = req.headers['host']; // 当前的主机当前的图片地址
                // 如果当前引用地址 和主机名 不相同
                if(refererHost != host && !whiteList.includes(refererHost)){
                    return fs.createReadStream(path.join(__dirname,'/bad.jpg')).pipe(res);
                }
            }
            fs.createReadStream(path.join(__dirname,req.url)).pipe(res);
        }   
    })  
});
server.listen(4000);
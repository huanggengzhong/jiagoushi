let http = require('http');
let fs = require('fs');
let path =  require('path');


let server = http.createServer((req,res)=>{
    let core = req.headers['user-agent'];
    console.log(core);
    if(core.includes('iPhone')){ /// Iphone ,...../  
        res.statusCode = 302;
        // 浏览器会解析地址 进行跳转 redirect
        res.setHeader('Location','https://www.baidu.com');
        res.end(); // 重定向
    }else{
        res.statusCode = 302;
        res.setHeader('Location','http://www.javascriptpeixun.cn');
        res.end(); // 重定向
    }
});
server.listen(3000);
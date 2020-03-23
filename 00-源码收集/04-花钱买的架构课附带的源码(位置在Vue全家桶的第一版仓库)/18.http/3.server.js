let http = require('http');

// 代理：正向代理 (科学上网)反向代理 nginx

let httpProxy = require('http-proxy');
let p = httpProxy.createProxyServer();
let proxy = {
    'a.zhufeng.cn:8081':"http://localhost:3000",
    'b.zhufeng.cn:8081':"http://localhost:4000"
}

http.createServer(function(req,res){
    let host = req.headers.host;
    p.web(req,res,{
        target:proxy[host]
    });
    console.log(host);
}).listen(8081);


//a.zhufeng.cn:8081;  
//b.zhufeng.cn:8081;

// 正向代理 就是我访问 外网 我需要挂一个代理来访问 （客户知道代理的存在）
// 反向代理 就是我们访问 外网 某个网站前 会先判断 跳转到指定的网站 （客户端不知道他的存在）

// http-proxy 实现代理   http.request
// webpack proxy 
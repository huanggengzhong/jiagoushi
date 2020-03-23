let http = require('http'); // 内置的http服务模块
// requestListener 可以监听用户的请求 
let server = http.createServer();
let querystring = require('querystring');

// let str = {name:'zfpx',age:9};
// console.log(querystring.stringify(str,'&&','='));



// 内部是通过tcp来进行传输的 socket 套接字  socket是一个双工流 可以拿到浏览器发来的所有内容 整个内容buffer 行 头 体 ，在内部 把socket 分成了两部分  req  res  this.emit('request',req,res)
server.on('request',(req,res)=>{ // req，res node 帮你处理好了
    console.log('请求来了');
    console.log(req.method); // 大写的
    console.log(req.url); // 当前请求的路径
    console.log(req.httpVersion); 
    // 请求行 ------
    console.log(req.headers); //头的字段都是小写的
    // 请求体 
    let arr  = []
    req.on('data',function(chunk){ // req是一个可读流
        arr.push(chunk)
    });
    req.on('end',()=>{
        let str = Buffer.concat(arr).toString(); // 'name=zfpx&age=10'
        let obj  = {}
        if(req.headers['content-type'] === 'application/x-www-form-urlencoded'){
             obj  = querystring.parse(str);
        }
        if(req.headers['content-type'] === 'application/json'){
             obj  = JSON.parse(str);
        }
        if(req.headers['content-type'] === 'multipart/form-data'){
            // 上传文件的类型
        }
        console.log(obj);
        res.statusCode = 200; // 成功
        res.sendDate = false;
        res.setHeader('a',1);
        res.end(`{str:${obj.name + obj.age}}`);
    });
});
// 客户端 静态服务 
let port = 3000;
server.listen(port,()=>{
    console.log('server start' + port); // 开启服务
});

// server.on('error',(err)=>{ // 重启端口
//     if(err.errno == 'EADDRINUSE'){
//         server.listen(++port);
//     }
// })
// nodemon node monitor 监控node的变化  在代码里 控制监控哪个目录  可以全局安装nodemon xxxx.js
// sudo npm install -g nodemon   liveserver supervisor
// cors 跨域方式  服务端可以解决跨域 可以允许哪个服务器来访问我 

let http = require('http');
let fs = require('fs');
let url = require('url');
let path = require('path');
let server = http.createServer((req,res)=>{
    let {pathname} = url.parse(req.url);
    let absPath = path.join(__dirname,pathname);

    // 给我一个文件名 就返回一个绝对路径 resolve path.resolve('webpack.config.js') // 以当前的执行代码目录 找到 a文件夹  webpack打包  webpack.config.js


    res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:5500'); // 允许某个源来访问我
    res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PUT,OPTIONS');// 允许的方法
    res.setHeader('Access-Control-Allow-Credentials',true); // 允许携带cookie
    // 允许哪些头来访问我
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    res.setHeader('Access-Control-Max-Age',10); // 默认每次都发options ，可以限制发送的频率
    if(req.method === 'OPTIONS'){ // 如果是options请求就结束掉
        return res.end();
    }
    console.log(req.headers);

    if(pathname === '/user' && req.method =='GET'){
        return res.end(JSON.stringify({name:'zf'}));
    }
    // resfulApi  根据请求的方法

    fs.stat(absPath,function(err,statObj){
        if(err) return res.statusCode = 404,res.end();
        if(statObj.isDirectory()){
            res.end('directory');
        }else{
            fs.createReadStream(absPath).pipe(res);
        }
    });
}).listen(3000);
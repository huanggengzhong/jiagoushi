let express = require('express');
let app = express(); 
let session = require('express-session');
app.use(session({
    // 把session 存到redis中....
    resave:false, // 每次是否发放新的名字
    saveUninitialized:true, // 只要客户端连接服务端 就提供一个session 
    secret:'zf' // 签名的秘钥
})); // 将cookie解析后 放到req属性上
app.get('/read',function(req,res){
    res.send(req.session.a);
})

app.get('/write',function(req,res){
   req.session.a = 'hello';
    res.send('ok')
})

app.listen(3000,function(){
    console.log('server start');
});

// 二级路由
// crypto 是node的内置模块
// body-parser不支持文件 
// express => multer 处理文件的内容   怎么解析 二进制文件 

// koa源码  koa源码 koa 中间件 koa用法 文件上传
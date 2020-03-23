let express = require('./express');
let app = express(); 

// cookie path
// 中间件 可以放公共的逻辑 执行的代码
// 一般情况下中间件 放到路由的上方
// 用于鉴权 可以拦截，如果有权限可以继续 ，决定代码是否向下执行
app.use('/write',function(req,res,next){
    console.log(1);
    next();
    console.log(4);
})
app.use('/write',function(req,res,next){
    console.log(2);
    next();
    console.log(5);
})
// app.use('/',function(req,res,next){
//     console.log(2);
//     next();
//     console.log(5);
// })
// app.use('/username',function(req,res,next){
//     console.log(3);
//     next();
//     console.log(6);
// })
app.get('/',function(req,res){
    res.end('xxxx');
})

app.listen(3000,function(){
    console.log('server start');
});

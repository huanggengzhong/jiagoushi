// express 大 功能全 集成路由的功能 ，还集成了内置的方法  koa 小 + 插件
// egg -> koa;
// express 快
let express = require('./express');
let app = express(); // app监听函数 http.createServer(app)
// use 中间件  get / post /delete /put



app.get('/',function(req,res){
    res.end('home')
})
app.get('/a',function(req,res){
    res.end('home-a')
})
app.post('/',function(req,res){
    res.end('post home')
})

app.all('/',function(req,res){
    res.end('all')
})
// // 请求方法 + 请求的路径
app.all('*',function(req,res){
    res.end('all * ');
})
app.listen(3000,function(){
    console.log('server start');
});// 监听某个服务
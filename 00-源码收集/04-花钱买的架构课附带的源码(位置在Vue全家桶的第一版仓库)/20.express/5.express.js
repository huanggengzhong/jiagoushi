let express = require('./express');
let app = express(); 
// 中间件的写法 中间函数都是一个高阶函数 返回的是一个函数
// express 内置了 express.static中间件
express.static = function(dirname){
    return function(req,res,next){
        let fs = require('fs');
        let path = require('path');
        let current = path.join(dirname,req.path);
        fs.stat(current,(err,statObj)=>{ // 304 statObj.ctime / isFile isDirectory size...
            if(err){
                console.log(err);
                return next(); // 中间件无法处理 向下执行吧
            }
            if(statObj.isFile()){
                fs.createReadStream(current).pipe(res);
            }
        });
    }
}
// app.use 可以提供一些公共的功能 

// 判断路径 是不是一个文件 是文件就把这个文件返回回去 ，否则不是就执行路径

app.use(express.static(__dirname)); // 静态文件中间件
app.use(express.static(__dirname+'/my'));

app.get('/1',function(req,res){
    res.send('ok');
});

app.listen(3000,function(){
    console.log('server start');
});

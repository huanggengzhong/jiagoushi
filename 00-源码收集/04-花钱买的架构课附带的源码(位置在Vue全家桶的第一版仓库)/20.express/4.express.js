let express = require('express');
let app = express(); 

// express 中内置了模板引擎 
// 使用ejs 模板引擎
app.engine('.html',require('ejs').__express); // 指定渲染方式
app.set('view engine','.html'); // 设置模板引擎的后缀是html的
app.set('views','my'); // 设置文件夹的名字
app.get('/',function(req,res){
   res.render('index',{name:'zf'});
})

// app.use(function(err,req,res,next){
//     console.log(err);
//     res.send('出错了')
// })

app.listen(3000,function(){
    console.log('server start');
});

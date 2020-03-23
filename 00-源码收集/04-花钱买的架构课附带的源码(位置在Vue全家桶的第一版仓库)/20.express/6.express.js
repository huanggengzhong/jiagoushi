let express = require('express');
let app = express(); 

// body-parser 第三方
// let bodyParser = require('body-parser');

function bodyParser(){

}
bodyParser.json = function(){
    return function(req,res,next){
        if(req.headers['content-type']=== 'application/json'){
            let arr = [];
            req.on('data',function(data){
                arr.push(data);
            })
            req.on('end',function(){
                req.body = JSON.parse(Buffer.concat(arr).toString());
                next();
            })
        }else{
            next();
        }
    }
}
bodyParser.urlencoded = function(){
    return function(req,res,next){
        if(req.headers['content-type']=== 'application/x-www-form-urlencoded'){
            let arr = [];
            req.on('data',function(data){
                arr.push(data);
            })
            req.on('end',function(){
                req.body = require('querystring').parse(Buffer.concat(arr).toString());
                next();
            })
        }else{
            next();
        }
    }
}

app.use(bodyParser.json()); // 会把解析后的结果 给你放到 req.body上
app.use(bodyParser.urlencoded());
app.post('/ajax',function(req,res){ 
    res.send(req.body);
});
app.listen(3000,function(){
    console.log('server start');
});
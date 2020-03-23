let express = require('./express');
let app = express(); 
// vue react route.paramas

// 常见传递参数的方式 ?a=1&b=2 req.query     /1/2 req.params
app.get('/username',function(req,res){
    res.end(`ok`)
});
app.get('/username/:xid/:xname',function(req,res){
    console.log(req.params.xid,req.params.xname)
    res.end(`${req.params.xid},${req.params.xname}`)
});


app.listen(3000,function(){
    console.log('server start');
});

// '/username/:xid/:xname/a'  => [xid,xname]
// '/username/1/2/a'  => [1,2] => {xid:1,xname:2}  pathToRegExp

// 把请求路径 和 配置的路径 取出params
let server = '/username/:xid/:xname/a'
//            /username/([^\/]+)/([^\/]+)/a
let client = '/username/1/2/a'
let arr = [];
let regStr = server.replace(/:([^\/]+)/g,function(){
    arr.push(arguments[1]);
    return '([^\/]+)'
});

let reg = new RegExp(regStr);
let [,...args] = client.match(reg);
// let params = arr.reduce((memo,current,index)=>(memo[current]=args[index],memo),{});
console.log(args);

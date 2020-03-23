// node中间层  在node中发送请求  （无跨域）

let http = require('http');


let client = http.request({
    host:'localhost',
    method: 'POST',
    path:'/aaa',
    port:3000,
    headers:{
        a:1,
        // 'Content-Type':'application/x-www-form-urlencoded'
        'Content-Type':'application/json'
        // 纯字符串 xml  文件上传  表单有跨域问题? 没有
    }
},(response)=>{
    let arr =[];
    response.on('data',function(data){
        arr.push(data);
    })
    response.on('end',function(){
        console.log(Buffer.concat(arr).toString());
    })
});
// get请求无请求体
client.end(JSON.stringify({name:'zfpx',age:9}));
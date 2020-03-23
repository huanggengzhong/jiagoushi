let express = require('express');
let app = express(); 

// s%3Azf.StyezDnH4o2jv7Slu2XXJb7l5rcmfA2rJgZn%2BmYRIJA
// s:zf.StyezDnH4o2jv7Slu2XXJb7l5rcmfA2rJgZn+mYRIJA
// s:zf.StyezDnH4o2jv7Slu2XXJb7l5rcmfA2rJgZn+mYRIJA

// console.log(require('crypto').createHmac('sha256','zf').update('zf').digest('base64'))
// cookie-parser  express-session

let cookieParser = require('cookie-parser');
app.use(cookieParser('zf')); // 将cookie解析后 放到req属性上
app.get('/read',function(req,res){
    res.send(req.cookies)
})

app.get('/write',function(req,res){
    res.cookie('name','zf',{signed:true});
    res.send('ok')
})

app.listen(3000,function(){
    console.log('server start');
});
// session 基于cookie的

let http = require('http');
let querystring = require('querystring');
let uuid = require('uuid'); // 第三方模块
let session = {}; // 用来存储 客户端和服务端的所有数据
const CARD_ID = 'connect.sid';  // 当前是哪加店铺 
http.createServer((req,res)=>{
    // 当客户端访问服务端时  需要获取当前用户是否来过 
    if(req.url == '/favicon.ico') return res.end();
    // cookie是以 ; 来算的
    let cookies = querystring.parse(req.headers.cookie,'; ') || {};
    let cardNumber = cookies[CARD_ID]; // 取到对应的卡号
    if(cardNumber && session[cardNumber]){
        session[cardNumber].mny -=10;
    }else{
        cardNumber = uuid.v4(); // 申请卡号
        session[cardNumber] = {mny:100} // 存钱
        res.setHeader('Set-Cookie',`${CARD_ID}=${cardNumber}`)
    }
    res.setHeader('Content-Type','text/html;charset=utf8');
    res.end(`2当前您的账户上有 ${session[cardNumber].mny}`)
    
}).listen(4000);
// 登录的时候 有可能服务器一重启 就丢失了session  => session  redis中  mysql  mongo  redis
// cookie + session 做客户端服务端同构  
// spa react + vue   token  jwt （给用户token） 用户token正确 就是正确  服务端不存储信息，直接加盐把内容返回去 ，客户端拿到后使用 （秘钥丢失 会导致可以伪造用户）


// 第三周作业:
// http-server 缓存  206 + gzip压缩 + 如果是文件 标识文件图标 文件夹 文件夹图标标  + 提交到npm包上 代码发到github上 
// localStorage sessionStorage cookie session的区别

// localStorage 存到浏览器里 不能跨域 5M  如果用户不清空 不会丢失

// sessionStorage session会话  会话关闭后 会清空存储   滚动条的位置 当前页面中需要的共享数据

// cookie 用来和服务端传输数据 （cookie存储大小 4k）  不要把数据都存到cookie中 可能会导致 请求时 多发送数据  合理使用cookie (不能存放敏感信息)


// 如何设置 cookie  和 获取cookie 

let http = require('http');
let querystring = require('querystring');
let secret = 'ZFJG';
let crypto = require('crypto');
http.createServer((req,res)=>{
    // res.setHeader('Set-Cookie',['name=zf; max-age=10','age=10; httpOnly=true']);
    let arr = [];
    res.setCookie = function(key,value,options={}){
        let itemArr = [];
        let line;
        if(options.signedCookie){ // [name='zf','max-age=10']
        let sign = crypto.createHmac('sha256',secret).update(value+'').digest('base64').replace(/\+|\//g,'');
        line = `${key}=${value}.${sign}`
        }else{
            line = `${key}=${value}`
        }
        itemArr.push(line);
        if(options.maxAge){ // [name='zf','max-age=10']
            itemArr.push(`max-age=${options.maxAge}`);
        }
        if(options.domain){ // [name='zf','max-age=10']
            itemArr.push(`domain=${options.domain}`);
        }
        if(options.httpOnly){ // [name='zf','max-age=10']
            itemArr.push(`httpOnly=${options.httpOnly}`);
        }
        
        arr.push(itemArr.join('; '));
        res.setHeader('Set-Cookie',arr);
    }
    res.getCookie = function(key,options={}){
        // cookie之间 用; 来分割  
        let cookie = querystring.parse(req.headers['cookie'],'; ') || {};
        // options中可能会有 signedCookie
        if(options.signedCookie){
            // 获取的是当前要取的值  sign
            if(cookie[key]){
                let [value,sign] = cookie[key].split('.');
                let newSign = crypto.createHmac('sha256',secret).update(value+'').digest('base64').replace(/\+|\//g,'');
                if(newSign === sign){ // 用户没有篡改
                    return value;
                }else{
                    return '';
                }
            }else{
                return '';
            }
        }else{
            return cookie[key] && cookie[key].split('.')[0];
        }
    }
    if(req.url === '/read'){
        return res.end(res.getCookie('name',{signedCookie:true}) || '没有name');
    }
    if(req.url === '/write'){
        // domain 只在某个域名下使用 默认是当前域名 ，.zhufeng.cn 一级域名 二级 可以共用cookie
        // path 当前在某个路径下 可以读取cookie 
        // max-age 秒为单位 expires 绝对时间 设置cookie的存活事件  
        // httpOnly 前端不能操作后端的cookie 相对安全一些
        // res.setHeader('Set-Cookie',['name=zf; domain=.zhufeng.cn; path=/write','age=10']);
        // express koa 
        res.setCookie('name','zf',{signedCookie:true});  // crypto sha256  sha1 
        res.setCookie('age','10');
        // res.getCookie('name');
        return res.end('write ok');
    }
    if(req.url === '/visit'){
        let visit = res.getCookie('visit',{signedCookie:true});
        if(visit){
            let v = ++visit;
            res.setCookie('visit',v,{signedCookie:true});
            res.end(`${v} come`);
        }else{
            res.setCookie('visit',1,{signedCookie:true});
            res.end('first come');
        }
    }
}).listen(3000);

// cookie的签名 
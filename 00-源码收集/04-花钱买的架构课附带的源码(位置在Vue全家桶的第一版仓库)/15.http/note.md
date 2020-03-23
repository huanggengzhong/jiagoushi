## 状态码
- 200 成功 204 206 范围请求 断点续传
- 301 (永久重定向) 302(临时重定向) 304 (服务器设置的缓存)  307 不改变请求的方法
- 404 (not found) 401(你没登录) 403 （登录了无法访问）  
- 500 502 （服务端）


## 请求方法 restFul api
- /user GET 获取用户   （简单请求）
- /user POST 增加   增加自定义了请求头  就不是简单请求了
- /user DELETE 删除  (非简单请求  之前就会预检)
- /user PUT 修改
- /options OPTIONS 跨域 试探请求 预检


## 跨域  域名  端口号  协议
- 解决跨域 （后端解决跨域 头） 
- postman  可以调试接口 是否靠谱
 
## url地址  服务端无法拿去hash
- https://username:passsword@www.baidu.com:443/index.html?a=1#abc
- host  www.baidu.com
- pathname  /index.html
- query ?a=1

## url uri urn

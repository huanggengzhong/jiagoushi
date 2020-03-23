## node中间层
- 解决跨域（浏览器）问题 (协议  ip  端口号)


## java 多线程语言
- tomcat，iis


## node 适合并发高web （主要是读取文件）
- node适合i/o密集型  readFile  libuv
- 不适合cpu密集  运算 加密 解密
- nginx
- nginx 开多进程 =》 node =》java

> 生态好 前端的一些 开发工具 webpack gulp

## i/o 异步/同步 阻塞/非阻塞
- 内核v8  基于 libuv库 多线程（可以实现异步） 
- v8引擎中的方法setTimeout 不能操作dom 没用bom  只有ecmascript ,支持拥有服务端的能力 内置了很多模块 fs http.....


## 异步/同步 阻塞/非阻塞
- 指的是被调用方 fs.readFile
- 阻塞和非阻塞指代的是调用方

- 同步阻塞
- 异步非阻塞  ✅


## node的方法 过一下
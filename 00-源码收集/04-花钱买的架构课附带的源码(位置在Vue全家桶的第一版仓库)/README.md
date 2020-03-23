## 课程回顾
- callback 高阶函数 （解决异步问题 并发 after）
- (基于回调 回调地狱 错误处理很复杂)
- promise的用法 原理(默认同步的promise，then的原理 发布订阅 resolvepromise 递归解析promise)
- Promise.all Promise.finally (Promire.resolve,race,reject....)
- defer 实现defer的延迟对象 
- promise的优缺点 优点1）回调地狱 链式调用 2）catch实现捕获错误
    (不能完全解决函数嵌套问题)
- co + generator （saga） yield *
- async + await  中级解决方案 可以处理错误和异步问题 可以使用trycatch

## es6
- 箭头函数（没有this arguments prototype） this的使用 变量提升 原型链 各种继承
- 解构，模板字符串，剩余运算符 拓展预算符  {...} (浅拷贝和深拷贝)
- 递归拷贝 + 解决循环引用 weakmap
- Set,Map (去重 交差补) Symbol (js原始数据类型 string number boolean null undefined symbol) object 包含函数 正则。。。,instanceof typeof
- Object.defineProperty -> proxy(可以解决数组的问题)+reflect 递归
- 数组常见的方法 reduce * filter map (compose redux原理 koa原理)
- class

## eventloop事件环
- 宏任务先执行 还是 微任务先执行
- 宏任务 是包括 settimeout messagecheenl setimmidate 主代码执行的时候 ui线程
- 微任务 promise.then mutationobserver nexttick

> 叙述 node事件环和浏览器事件环的区别 （node中是分阶段）

timer -> poll -> check (每执行一个宏任务 就会清空微任务)

## 进程线程 js 主线程是单线程
- webworker (pwa serverworker)
- ajax settimeout.... 切换 ui线程和js线程 （内部会开一个扫描线程）


## node
global上的属性 
- Buffer  (Buffer.alloc() Buffer.from() isBuffer,Buffer.concat buffer.slice buffer.indexOf buffer.split) 默认node编码 都是utf8 iconv-lite
- process.nexttick  process.pid 进程id process.cwd() 
- process.stdin  process.stdout(进程通信)  process.argv process.env(cross-env)
- setImmediate nextTick

## node中的模块
有哪些常见的模块 commonjs  esmodule amd/cmd umd
实现一个commonjs规范 （webpack都是一样的）
模块的查找 （./ 文件模块 当前目录下找文件，文件不存在会去找包 index.js/ index.json） require('xxx') 核心模块 第三方模块 module.paths
npm 的配置 package.json 里面的参数的应用 (bin scripts main)

## node核心模块 
fs (fs.readFile writeFile (createReadStream...) fs.read write open close,fs.stat fs.mkdir fs.rmdir fs.unlink fs.access readdir rename....) (流的原理 pipe) (深度 * 广度) 多叉树
path  (extname basename resolve join dirname)
util promisify inherts继承
events 发布订阅 + 观察者（mvvm） （on emit once off newListener）
http （http.createServer ）
- res相关的内容 write end  res.on('data');
- req method url headers req.on('data');
url url.parse
querystring parse
crypto  加密
vm runInthisContext

> 流的分类 读 写 双工 res 转化 gzip

## http的header
- 状态码 301 302 204 206 304 401 403 500 502
- 对应的头 能做哪些事 多语言 缓存 范围请求 gzip压缩 防盗链（referer） 虚拟主机 正向代理 反向代理 重定向
- cookie 和 session （localstroage sessionstorage ）

## koa/express
- 文件上传 formData() --boundary="----xxxx"
- fileReadear （10） 实现预览  blob.slice二进制 
- ArrayBuffer 前端使用fileReadear 读取的时候 base64 （ArrayBuffer）是无法操作的  => Uint8Array => buffer
- 上传文件 需要加header multipart/form-data
- formidable （所有的服务都可以实现）
- koa中间件的原理 和 express中间件的原理

## webpack
- webpack核心配置（loader和plugin 看文档） github npm 官方文档
- 优化webpack配置
- ast语法树 es6->es5
- tapable库 管理代码流程的 （实现钩子）
- 自己实现一版webpack （加入loader和plugin） 
- 实现loader plugin （写常见的loader和plugin）


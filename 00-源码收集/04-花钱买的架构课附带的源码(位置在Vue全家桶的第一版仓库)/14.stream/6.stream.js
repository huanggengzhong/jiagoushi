let fs = require('fs');
let {Writable,Duplex,Transform} = require('stream');
let Stream = require('stream');
// class MyReadStream extends Readable{ // http 基于流的 req.on('data')
//     constructor(){
//         super();
//         this.index = 5;
//     }
//     _read(){ // fs.createReadStream 重写了_read方法
//         if(this.index-- == 0){
//             return this.push(null); // 读取完毕后 放一个null
//         }
//         this.push(this.index+'');
//     }
// }
// let rs = new MyReadStream();
// rs.on('data',function (chunk) {
//     console.log(chunk);
// });

// class MyWriteStream extends Writable{ // http res
//     _write(chunk,encoding,clearBuffer){ // 子类实现 可写流方法
//         fs.appendFile('./name.txt',chunk,()=>{
//             setTimeout(()=>{
//                 clearBuffer();
//             },1000);
//         });
//     }
// }
// let ws = new MyWriteStream();
// ws.write('1'); // 1) 真的写入文件 之后放到队列里
// ws.write('2'); 
// rs = new ReadStream
// 父类会调用子类的_read方法


// 双工  读写都可以的流 Duplex
// util.inherits(Duplex,Readable)
// class MyDuplex extends Duplex{
//     _read(){
//         console.log('read')
//     }
//     _write(chunk){
//         console.log(chunk)
//     }
// }
// let md = new MyDuplex();
// md.on('data',()=>{

// })
// md.write('1');

// rs.pipe(ts).pipe(ws);
// 压缩 gzip 转化流 先把数据读取出来 -> ( 进行转化 ）-> 写到一个新的文件里
class MyTransform extends Transform{
    _transform(chunk,encoding,callback){
        this.push(chunk.toString().toUpperCase());
        callback();
    }
}
let myTransform = new MyTransform(); // 转化 把 写 转换成 读
process.stdin.pipe(myTransform).pipe(process.stdout);
// 读流 写流 转化流 双工流

// 进程间 console.log();  
// process.stdout.write('xxx'); // 只要有write 就是可写流 
// process.stdin.on('data',(chunk)=>{ // 只要能on('data')流
//     console.log(chunk)
// })

// read方法是父类的方法 Readable read()
// ReadStream _read方法 (放的是自己的逻辑)
// rs.read();
// fs.read
 
// 如何判断一个东西他是不是流 看一看是否是实例
console.log(myTransform instanceof Stream)

// pipe  rs.on('data'); rs.on('end') ws.write()  ws.end()
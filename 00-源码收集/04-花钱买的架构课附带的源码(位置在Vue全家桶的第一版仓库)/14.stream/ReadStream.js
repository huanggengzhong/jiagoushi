let fs = require('fs');
let EventEmitter = require('events');  // 核心模块
class ReadStream extends EventEmitter{
    constructor(path,options = {}){
        super();
        this.path = path; 
        this.flags = options.flags || 'r';
        this.mode = options.mode || 438
        this.start = options.start || 0;
        this.end = options.end;
        this.autoClose = options.autoClose || true;
        this.highWaterMark = options.highWaterMark|| 64*1024;
        this.encoding = options.encoding || null;

        // 默认叫非流动模式 rs.pause  rs.resume
        this.flowing = null; // 开始读取的时候 需要把这个值改成true
        
        // 要读取文件 需要打开文件
        this.open(); // events on emit once newListener

        this.on('newListener',(type)=>{
            if(type ==='data'){
                // 用户监听了data事件
                this.flowing = true; // 开始读取
                this.read();
            }
        });
        // 每次读取的位置
        this.pos = this.start; // 默认等于开始的位置
    } 
    read(){
       // 默认第一次 read方法 肯定拿不到fd的 但是等一会如果触发了open事件 ，肯定可以获取到this.fd
       if(typeof this.fd !== 'number'){ // 保证文件描述符存在的时候 才调用read方法来读取
           return this.once('open',()=>this.read());
       }
       //highWaterMark代表的是每次读取的个数
       // 默认如果没有end 每次读取highWaterMark如果有end 那就需要end来算最后一次要读取多少
       let howMuchToRead = this.end? Math.min((this.end-this.pos+1),this.highWaterMark):this.highWaterMark;
       let buffer = Buffer.alloc(howMuchToRead);
       fs.read(this.fd,buffer,0,buffer.length,this.pos,(err,bytesRead)=>{
           if(bytesRead>0){ // 如果能读取到内容 而且 flowing为true就继续读取
            this.pos += bytesRead; // 维护每次读取的位置
            // 考虑 highWater比较大的情况 可以截取一下
            this.emit('data',this.encoding?buffer.slice(0,bytesRead).toString(this.encoding):buffer.slice(0,bytesRead));
            if(this.flowing){
                this.read();
            }
           }else{
               this.emit('end');
               if(this.autoClose){
                   fs.close(this.fd,()=>{ // 关闭文件 触发close事件
                        this.emit('close');
                        this.flowing = null;
                   });
               }
           }
       });  
    }
    open(){
        fs.open(this.path,this.flags,(err,fd)=>{
            if(err){
                this.emit('error');
                return 
            }
            this.fd = fd; // 代表当前文件的描述符 number  fs.read()
            this.emit('open',this.fd);
        });
    }
    pause(){
        this.flowing = false;
    }
    resume(){
        this.flowing = true;
        this.read();
    }
    pipe(ws){
        this.on('data',(chunk)=>{
            let flag = ws.write(chunk);
            if(!flag){
                this.pause();
            }
        })
        
        ws.on('drain',()=>{
            this.resume();
        });
    }
}

module.exports =  ReadStream
// 异步间如何拆分逻辑 发布订阅
// 多个异步如何串行


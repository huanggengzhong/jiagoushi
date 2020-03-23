let fs = require('fs');
let Events = require('events');
// 第一次像文件中写入  第二次 把内容放到缓存中，第一次写入成功后 清空缓存第一项,缓存第一项 清空后 在清空第二个 ，都清空后在看是否触发drain事件 是的话重新执行




class WriteStream extends Events{
    constructor(path,options){
        super();
        this.path = path;
        this.flags = options.flags || 'w'
        this.mode = options.mode|| 0o666;
        this.autoClose = options.autoClose || true;
        this.encoding = options.encoding || 'utf8';
        this.highWaterMark = options.highWaterMark || 16*1024
        this.start = options.start || 0;

        this.open();
        // 链表 js中可以用对象 模拟链表  
        // {head:1,chund:'xxx',tail:2} - {head:2,chunk:aaaa,tail:3} - {head:3,chunk:aaaa,tail}
        this.cache = []; // 缓存多次写入的数据

        // 维护写入的长度 len
        this.len = 0;
        // 是否触发drain事件
        this.needDrain = false;

        // 如果正在写入就放到缓存中
        this.writing = false;

        // 维护写入的位置
        this.pos = this.start;
    }
    open(){
        fs.open(this.path,this.flags,(err,fd)=>{
            if(err){
                return this.emit('error');
            }
            this.fd = fd;
            this.emit('open');
        })
    }
    write(chunk,encoding=this.encoding,callback=()=>{}){
        // 第一次是真正的像文件中写入，之后都放到内存中了
        // 把写入的内容 统一转化成buffer
        chunk = Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk);
        this.len += chunk.length;
        if(this.len >= this.highWaterMark){ // 清空后需要触发drain事件
            this.needDrain = true;
        }
        // write 方法要有一个返回结果
        if(this.writing){
            this.cache.push({
                chunk,
                encoding,
                callback
            })
        }else{
            this.writing = true;
            this._write(chunk,encoding,()=>{
                callback();
                this.clearBuffer(); // 清理数组的第一项
            }); //没实现  fs.write
        }
        return !this.needDrain;
    }
    clearBuffer(){
        let obj = this.cache.shift();
        if(obj){
            this._write(obj.chunk,obj.encoding,()=>{
                // 当自己写入成功后 继续清空缓存，直到缓存区为空
                obj.callback();
                this.clearBuffer();
            });
        }else{ // 缓存已经干了
            if(this.needDrain){ // 需要触发drain    
                this.needDrain = false;
                this.writing = false;// 不是正在写入，下次写入时 依然是第一个往文件里写入，剩下的像缓存中写入
                this.emit('drain');
            }
        }
    }
    _write(chunk,encoding,callback){
        if(typeof this.fd !== 'number'){
            return this.once('open',()=>this._write(chunk,encoding,callback));
        }
        // 写入时可以不用加pos
        fs.write(this.fd,chunk,0,chunk.length,this.pos,(err,written)=>{
            this.pos += written;
            this.len -= written; // 每次写入成功后 都需要把缓存的大小减少
            callback(); // 当写入成功后 调用callback，会执行clearBuffer的方法
        });
    }
}

module.exports = WriteStream
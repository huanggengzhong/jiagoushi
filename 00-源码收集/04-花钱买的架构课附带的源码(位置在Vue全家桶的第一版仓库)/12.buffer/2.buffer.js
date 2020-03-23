// buffer 能要到的 slice截取 indexOf 循环 有长度 有索引

let buffer = Buffer.from('珠峰');

console.log(Buffer.isBuffer(buffer)) // 判断是不是buffer

// concat,copy

// 拼接数据  tcp http  需要把多个buffer拼接在一起

let buffer1 = Buffer.from('珠峰');
let buffer2 = Buffer.from('架构');

// let bigBuffer = Buffer.alloc(12);
// 1） 拷贝方法
Buffer.prototype.copy = function(target,targetStart,sourceStart=0,sourceEnd=this.length){
    for(let i = 0; i<sourceEnd - sourceStart;i++){
        target[targetStart+i] = this[sourceStart+i];
    }
}
// // / 目标buffer 目标的拷贝位置  源的开始和源的结束
// buffer1.copy(bigBuffer,0,0,6); // 字节
// buffer2.copy(bigBuffer,6); // 字节
// console.log(bigBuffer.toString());

// 2) concat合并

Buffer.concat = function(list,totalLength = list.reduce((a,b)=>(a+b.length),0)){
    let buffer = Buffer.alloc(totalLength);
    let offset = 0;
    list.forEach(buff=>{
        buff.copy(buffer,offset);
        offset+= buff.length
    });
    return buffer;
}
// isBuffer toString Buffer.concat()   split方法
console.log(Buffer.concat([buffer1,buffer2]).toString()); 
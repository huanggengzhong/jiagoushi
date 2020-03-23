// 文件操作读和写 流：可读流 可写流  （fs.read  fs.write） 异步读写

let fs = require('fs');
// 我们希望不会占用大量内存
let rs = fs.createReadStream('./name.txt',{
    flags:'r', // 打开文件做什么事 r w r+ w+ a....
    highWaterMark:1, // 每次读取一个 字节数 默认每次读取64k文件内容
    mode:0o666, // 可读可写
    start:0, // 开始读取的位置
    end:4,// 结束读取的位置
    //encoding: 'utf8', // 读取的内容 如果gbk的 强行转化成utf8 乱码
    autoClose:true,
}); 
rs.on('error',()=>{
    console.log('出错了')
})
rs.on('open',()=>{
     console.log('文件打开了')
}) // rs 是内部new ReadStream产生的
// 默认创建可读流 不会马上读取 ，如果我们监听了data事件
// 默认非流动模式 =》 流动模式
let arr = []; // 拼接buffer， 默认有的人会使用str+='' 可能会导致乱码
// rs.on('data',(chunk)=>{
//     arr.push(chunk);
//     //rs.pause(); // 停止data事件的触发
// });
// setInterval(()=>{
//     rs.resume(); // 恢复的就是data事件
// },1000);
rs.on('end',()=>{
    console.log(str.length)
    console.log(Buffer.concat(arr).toString());
    console.log('读取完毕')
});
rs.on('close',()=>{
    console.log('close')
});

// data  end  (open close)  pause resume
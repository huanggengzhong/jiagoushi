let fs = require('fs');


let ws = fs.createWriteStream('./name.txt',{
    flags:'w',
    mode:0o666,
    autoClose:true,
    encoding:'utf8',
    highWaterMark: 2 // highWaterMark预期使用的内存
});
// 可写流 (open close) write  end  on('diran')

// 写一个1   预计使用内存是1
// 写入的过程是异步的
let flag = ws.write(1111+''); // 写入的内容 只能是string or buffer
ws.write(2222+''); 
ws.write(3333+''); 

// 第一个是真正的像文件中写入 其他的写入会排队 [2222,3333]
// flag 不带表是否写入成功

// 如果flag 返回false 就不要在继续写入了 ，如果在写入的话 肯定会超出预期

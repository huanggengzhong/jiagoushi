let fs = require('fs');
let ReadStream = require('./ReadStream');
let WriteStream = require('./writeStream');
let rs = new ReadStream('./name.txt',{highWaterMark:4});

let ws = new WriteStream('./name1.txt',{highWaterMark:1});

// 先读64k  我就拿着64k去写  超过16 别读了 等我把这64k写入完毕后 ，你在去读取

// 拿不到读取的内容 或者写入的内容，不能控制中间的流程 rs.on('data')
// fs.readFile 不能处理大文件的
rs.pipe(ws); // 通过pipe可以实现拷贝

// ws.write('123');
// ws.write('456');
// ws.end('789'); // 会强把内存中的清空 并且关闭文件
// ws.end(); // write after end 文件已经关闭 就不能再写入 如果end中传递参数会继续调用write方法 fs.close



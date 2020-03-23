let fs = require('fs');
let WriteStream = require('./writeStream')
ws = fs.createWriteStream('./name.txt');
ws.write('123');
ws.write('123');
ws.write('123'); // {next:obj1} let obj1 = {next:obj2}  let obj2 = {next:}
// let ws = new WriteStream('./name.txt',{
//     flags:'w',
//     mode:0o666,
//     autoClose:true,
//     encoding:'utf8',
//     highWaterMark: 4,
//    start:0
// });
// // 写入9个数  
// let i =9;
// function write(){
//     let flag = true;
//     while(i && flag){ // 8 //7
//        flag = ws.write(i--+'','utf8',()=>{});
//        // write方法 只能放字符串 或者buffer
//     }
// }
// write();
// ws.on('drain',()=>{ // 抽干，当我们的预计的大小和写入的内容的大小相等或者写入的内容大于了预计的内存会触发此方法，当我们的写入的内容都写入完成后会触发次方法
//     console.log('drain')
//     write();
// })

// let i = 9; // 耗9个字节的内存
// while(i--){
//     ws.write(i+'');
// }


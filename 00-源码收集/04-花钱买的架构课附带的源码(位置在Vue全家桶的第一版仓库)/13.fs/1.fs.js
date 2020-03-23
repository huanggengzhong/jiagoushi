// fs fileSystem 文件系统 文件的操作 目录的操作
// fs中的方法都分为同步（require 可以马上拿到返回值，阻塞主线程）异步（非阻塞）
// readFile writeFile   异步
// readFileSync writeFileSync


let fs = require('fs');
let path = require('path');

// readFile 10g 内存 5g 这个方法 可能会淹没可用内存 
// 读取默认的编码是buffer
// 写入的时候不给编码就是utf8
// let r = fs.readFileSync(path.resolve(__dirname,'./name.txt'));
fs.writeFileSync(path.resolve(__dirname,'./name.txt'),Buffer.from('珠峰'));


// webpack copy-webpack-plugin
// function copy(source,target){  // node 10+ fs.copyFile
//     fs.readFile(source,function(err,data){
//         if(err) return console.log(err);
//         fs.writeFile(target,data,function(err){
//             if(err) return console.log(err);
//             console.log('写入成功')
//         });
//     });
// }
// readFile + writeFile 适合读取小文件
// 限制读取的内存数 fs.read  fs.write  =>  文件流
copy(path.resolve(__dirname,'./name.txt'),path.resolve(__dirname,'./age.txt'));
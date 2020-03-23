// fs.open fs.read fs.write fs.close 

let fs = require('fs');
let path = require('path');
// flags 对文件的操作类型 w r + a
// mode 权限  读取 4 写入 2 执行 1 chmod -R 777    八进制
// 二爷一直 四读书
// file descriptor 文件描述符 number类型
// let buffer =Buffer.alloc(3);
// fs.open(path.resolve(__dirname,'age.txt'),'r',0o666,(err,fd)=>{
//     // fd文件描述符 buffer 读取到那个内存中 0 buffer的偏移量 文件的读取位置
//     fs.read(fd,buffer,0,3,8,(err,bytesRead)=>{ // bytesRead实际读取到的个数
//         console.log(bytesRead);
//         console.log(buffer.toString());
//     });
// })  // 10进制

// r+ 如果文件不存在会报错 w+ 以写为准没有这个文件会创建
// let buffer =Buffer.from('珠峰'); 
// fs.open(path.resolve(__dirname,'name.txt'),'w+',(err,fd)=>{
//     // fd代表的是写入的文件描述符 写入的内容  当前写入的buffer的位置
//     // buffer中选几个写入  写入文件的位置
//     fs.write(fd,buffer,3,3,0,(err,written)=>{

//     })
// });


// 拷贝  文件流 (来简化操作)
function copy(source,target){ 
    let buffer =Buffer.alloc(3);// 012 345 678 978
    let pos = 0;
    fs.open(source,'r',(err,rfd)=>{
        fs.open(target,'w',(err,wfd)=>{
            function next(){
                fs.read(rfd,buffer,0,3,pos,(err,bytesRead)=>{
                    if(bytesRead>0){ // 能读取到内容就继续写入
                        pos += bytesRead;
                        fs.write(wfd,buffer,0,bytesRead,(err,written)=>{
                            next();
                        });
                    }else{
                        // 读取完毕
                        fs.close(rfd,()=>{})
                        fs.close(wfd,()=>{})
                    }
                });
            }
            next();
        });
    })
}

copy(path.resolve(__dirname,'age.txt'),path.resolve(__dirname,'name.txt'));
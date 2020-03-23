let ReadStream = require('./ReadStream');
console.log('my');
let rs = new ReadStream('./name.txt',{
    //flags:'r', 
    highWaterMark:100,  
    // 我预期 读取5个 每次 读3个
    // 3  3
    // pos  = 3  6-pos+1  Buffer.alloc(3);
    mode:0o666,
    encoding:'utf8',
    start:0, 
    // end:5,
    autoClose:true,
}); 
rs.on('error',()=>{
    console.log('出错了')
})
rs.on('open',()=>{
     console.log('文件打开了')
}) 
rs.on('data',(chunk)=>{
    console.log(chunk);
});
rs.on('end',()=>{
    console.log('读取完毕')
});
rs.on('close',()=>{
    console.log('close')
});

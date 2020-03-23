let http = require('http');
let fs = require('fs');
let path =  require('path');

const DOWNLOAD_FILE = path.resolve(__dirname,'note.txt')

let total = fs.statSync(DOWNLOAD_FILE).size
// curl -v --header "Range:bytes=0-10" http://localhost:3000
let server = http.createServer((req,res)=>{
    let range = req.headers['range'];
    res.setHeader('Content-type','text/plain;charset=utf8');
    if(range){ // Range:bytes=1-5
        let [,start,end] = range.match(/(\d*)-(\d*)/);
        start = start ? Number(start) : 0;
        end = end ? end:total;

        res.statusCode = 206; // 表示范围请求
        res.setHeader('Content-Range',`bytes ${start}-${end}/${total}`);
        // 返回部分数据
        fs.createReadStream(DOWNLOAD_FILE,{start,end:end-1}).pipe(res);
    }else{
        fs.createReadStream(DOWNLOAD_FILE).pipe(res);
    }
});
server.listen(3000);
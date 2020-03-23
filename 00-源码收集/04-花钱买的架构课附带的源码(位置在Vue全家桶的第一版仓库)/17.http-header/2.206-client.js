let http = require('http');

let start = 0; // 默认从0开始 每次下载5个 保存到一个新的文件中 test.txt
let fs = require('fs');
let ws = fs.createWriteStream('./test.txt');
// ajax 分片上传  
let mode = 'start';
process.stdin.on('data',function(chunk){ // stdout.write  stdin.on('data')
    if(chunk.toString().includes('pause')){
        mode = 'pause';
    }else{
        mode = 'start';
        downLoad();
    }
})
function downLoad(){
    http.get({
        hostname:'localhost',
        port:3000,
        headers:{
            Range:`bytes=${start}-${start+5}`
        }
    },function(res){
        // 监听服务端 返回的数据
        res.on('data',function(chunk){
            ws.write(chunk);
            let total = res.headers['content-range'].split('/')[1]
            if(start <= total){ // 如果读取的数量 小于总数 就继续读取
                start += 5;
                setTimeout(()=>{
                    if(mode == 'start'){
                        downLoad();
                    }
                },1000)
            }else{
                ws.end();
            }
        })
    })
};



// pipe 最后的时候 会调用end end fs.close
downLoad();
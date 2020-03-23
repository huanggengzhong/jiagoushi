let zlib = require('zlib');


let gzip = zlib.createGzip(); // 流 转化流



let fs = require('fs');

fs.createReadStream('./test.txt').pipe(gzip).pipe(fs.createWriteStream('./test.gz'));
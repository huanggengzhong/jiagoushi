let url = require('url');

// url uri urn

let {query,pathname} = url.parse('https://username:passsword@www.baidu.com:443/index.html?a=1&b=2#abc',true);

console.log(query,pathname)
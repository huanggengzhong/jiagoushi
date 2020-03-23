// 加密 摘要算法

let crypto = require('crypto');

// md5 不能解密 摘要算法

// 好处 不同的内容 摘要出的结果不同
// 相同的内容 摘要的结果相同
// 摘要的结果的长度都是定长


// let r = crypto.createHash('md5').update('123456').digest('base64');

// cookie 加盐算法


// openssl
let r = crypto.createHmac('sha1','秘药').update('123456').digest('base64');
console.log(r);


let r1 =   crypto.createHmac('sha1','秘药').update('123').update('456').digest('base64');

console.log(r1===r)
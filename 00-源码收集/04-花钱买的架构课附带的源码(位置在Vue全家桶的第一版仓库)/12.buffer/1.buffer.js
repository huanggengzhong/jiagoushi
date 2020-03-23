// 每个汉字 node只支持utf8编码（一个汉字3个字节） gbk(一个汉字2个字节)
// 如果编码不同 可能出现乱码问题   iconv-lite 靠第三方模块转化编码
// 一个字节 是由8个bit组成 8个二进制 

// 在node中 一个汉字 3个字节 24个位


// ascii gb2312 gbk  gb18030 unicode utf8(包含了所有的国家的内容)

// buffer 缓存 内存 255（读取文件 二进制   16进制 ff ）

// buffer长什么样子

// 声明buffer的方式 3中  固定长度  固定的内容

let buffer = Buffer.alloc(5); // 安全
console.log(buffer);

// 固定的内容
let buffer1 = Buffer.from('珠峰'); 
console.log(buffer1); // 16进制  buffer和字符串可以相互转化

// 通过数组来声明buffer  0b 二进制 0 八进制 0x16进制 控制台打不出来 其他进制的
let buffer2 = Buffer.from([0x16]);
console.log(buffer2);


// 希望实现进制的转化 16 -> 2
console.log((0x16).toString(2)); // 10110
console.log(parseInt('10110',2))// 任意进制转化成10进制

// base64 取代所有的url 不会发起请求 速度快  小图标 
// 一个汉字 24个位   3*8 = 4*6

let buf = Buffer.from('珠');
console.log(buf); //e7 8f a0

console.log((0xe7).toString(2));
console.log((0x8f).toString(2));
console.log((0xa0).toString(2));

// 111001   
// 111001 111000  111110  100000

console.log(parseInt('111001',2))
console.log(parseInt('111000',2))
console.log(parseInt('111110',2))
console.log(parseInt('100000',2))
// 57 56 62 32

// base64 做一个编码转化  转化的规则是大家都知道的
let str = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
str += 'abcdefghijklmnopqrstuvwxyz';
str += '0123456789+/';
console.log(str[57]+str[56]+str[62]+str[32]);


// buffer中方的都是内存
let buf = Buffer.from('珠峰前端');
let newBuffer = buf.slice(2);
newBuffer[0] = 100;
console.log(buf.toString());

let arr = [[1,2,3]];
let newArr = arr.slice(0);
newArr[0][1] = 100;
console.log(arr);

// buffer中的方法   slice 索引 length（字节长度）indexOf 静态方法

let buffer = Buffer.from('珠峰架构珠峰架构珠峰架构');
Buffer.prototype.split = function(sep){
   let pos = 0;
   let len = Buffer.from(sep).length;
   let arr = [];
   let current;
   while( -1!== (current=this.indexOf(sep,pos))){
        arr.push(this.slice(pos,current));
        pos = current+len;
   }
   arr.push(this.slice(pos));// 最后那一项无法找到
   return arr;
}
let arr = buffer.split('珠峰');
console.log(arr.join(''));

// copy +  concat + fs应用 + 树的遍历算法 广度/ 深度 (promise + callback)
// http + stream + express 



// let r = buffer.indexOf('峰');
// console.log(r);

// 分割 split 自己封装一个分割方法  架构  架构 架构
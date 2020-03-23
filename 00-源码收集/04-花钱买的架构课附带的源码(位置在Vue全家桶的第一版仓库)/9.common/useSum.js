// let path  = require('path');
// let fs = require('fs');
// let vm = require('vm');
// function Module(id){
//     this.id = id;
//     this.exports = {}
// }
// Module.wrapper = [
//     '(function(exports,module,require,__dirname,__filename){'
//     ,
//     '})'
// ]
// Module._extensions = {
//     '.js'(module){
//         let str = fs.readFileSync(module.id,'utf8');
//         // 给读取到的内容 增加了个函数
//         let scriptStr =  Module.wrapper[0] + str +  Module.wrapper[1];
//         let fn = vm.runInThisContext(scriptStr);
//         // 把函数执行 将exports属性传递给 sum.js
//         // exports 是module.exports 别名
//         fn.call(module.exports,module.exports,module,req);
//     },
//     // json处理的时候把exports对象添上 处理js的时候 让用户自己把结果放上去
//     '.json'(module){
//         let str = fs.readFileSync(module.id,'utf8');
//         str = JSON.parse(str);
//         module.exports = str; // 把最终的结果放到exports对象上 require方法会自动把结果返回回去
//     }
// }
// Module.prototype.load = function(){
//     // this : id , exports
//     let extname = path.extname(this.id);
//     Module._extensions[extname](this);
// }
// function req(id){
//     // 解析出一个绝对路径
//     let absPath = path.resolve(__dirname,id);
//     let module = new Module(absPath);
//     module.load();
//     return module.exports;
// }

// module.exports= exports = {a}
// exports.a = 'hello world'
let r = require('./sum.js'); //fs.readFileSync()
console.log(r);



// 回去后：调试一下模块的执行 是怎样执行的
//  作业  需要先添加.js后缀 找不到 如果出错 就继续找 .json 文件 （最终都没找到报错了）
// 会先尝试加载 .js 文件 找不到在去找.json
// 缓存的功能
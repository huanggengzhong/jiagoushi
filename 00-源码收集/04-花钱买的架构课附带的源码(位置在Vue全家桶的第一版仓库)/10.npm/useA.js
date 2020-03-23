// require('./a'); // 每个node版本都不一样

// node 8左右的时候 会先找文件下 的package.json
// 现在会全部查找a.js文件 文件不存在 才会找a文件夹

// 不要文件夹和文件的名字相同

// 如果文件夹中 有package.json 会先查找main的指向 （没有找 index.js index.json）

// 第三方模块 会去当前目录下查找node_modules文件夹
// 如果无法找到 则想上一级查找
require('b');
console.log(module.paths); // 第三方目录默认会向上查找 ，找不到则报错
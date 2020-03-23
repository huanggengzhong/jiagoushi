// 每个文件都是一个模块 可以使用 commonjs module.exports  exports require node  
// import (export default export)es6  babel-node
// 默认导入和默认导出
// 如果使用 export 导出的 导入的时候可以解构 
// import {a} from './sum';
// import * as a from './sum';// 把所有的属性作为a的属性
// import sum from './sum';

// 尽量不要把require和import混用
// import 只能放到页面的最顶上
// import './index.css';
// let sum = require('./sum'); // sum.default
// console.log(sum.default('a','bc'));

// vue scoped：true 
// 增加前缀 cssmodule


// import  './index.css';

// let div = document.createElement('div');
// div.innerHTML = 'hello';

// div.className ='cc'
// document.body.appendChild(div)

import url from './weixin.jpg'
// file-loader的作用 第一步会帮你生成一个文件放到dist目录下
// 会返回拷贝的路径
// url-loader 可以把小图片变成base64打包进去 icon
let img = new Image();
img.src = url;
document.body.appendChild(img);

import './iconfont/iconfont.css';
let i = document.createElement('i');
i.className = `iconfont icon-bluetoothon`;
document.body.appendChild(i);
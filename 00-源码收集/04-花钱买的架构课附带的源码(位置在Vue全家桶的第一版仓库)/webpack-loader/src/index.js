// 经常使用inline-loader 不希望别的loader在进行处理了
// require('!inline-loader!./a');

// !! 不要其他的loader老处理
// -! 不要执行当前inline-loader 前面的loader
// ! normalLoader不执行


// babel-loader @babel/core  @babel/preset-env

// file-loader会劫持此文件 产生一个新的文件到dist目录下
// 会返回一个路径 `module.exports = '123.jpg'`
import './style.less'
// import logo from './weixin.jpg'


// let img = new Image();
// img.src = logo;
// document.body.appendChild(img);

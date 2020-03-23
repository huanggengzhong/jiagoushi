// import React from 'react';

// import ReactDOM from 'react-dom';

// import Header from '_c/header'
// import './css';
// import 'bootstrap'
// ReactDOM.render(<Header></Header>,document.getElementById('app'));

// 把一些模块打包好放在那，打包的时候只打包自己写的业务代码
// 在写一个配置文件 打包React,ReactDOM 留着
// 动态链接库 dllPlugin


// treeshaking 只能对es6模块进行解析

// scope hosting 作用域提升
// let a = 1;
// let b = 2;
// let c= 3;
// let d = a+b+c;
// console.log(d); // console.log(6);


// import() 0.js
import {sum} from './calc';
console.log(sum());
import _ from 'lodash'; // 提高加载速度 可以单独抽离出一个js  5个
import $ from 'jquery';
let fn = _.after(1,function(){
    console.log('hello');
})
fn();
console.log($);
import moment from 'moment';
import 'moment/locale/zh-cn'; // 忽略其它的语言
moment.locale('zh-CN');
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
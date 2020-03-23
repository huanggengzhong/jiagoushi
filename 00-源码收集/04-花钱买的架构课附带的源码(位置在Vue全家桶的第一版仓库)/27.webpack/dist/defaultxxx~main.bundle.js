(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["defaultxxx~main"],{

/***/ "./src/calc.js":
/*!*********************!*\
  !*** ./src/calc.js ***!
  \*********************/
/*! exports provided: sum, minus */
/*! exports used: sum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return sum; });\n/* unused harmony export minus */\nvar sum = function sum() {\n  return 'aaaa+bbbb';\n};\nvar minus = function minus() {\n  return 'aaaa-bbbbb';\n};\n\n//# sourceURL=webpack:///./src/calc.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calc */ \"./src/calc.js\");\n// import React from 'react';\n// import ReactDOM from 'react-dom';\n// import Header from '_c/header'\n// import './css';\n// import 'bootstrap'\n// ReactDOM.render(<Header></Header>,document.getElementById('app'));\n// 把一些模块打包好放在那，打包的时候只打包自己写的业务代码\n// 在写一个配置文件 打包React,ReactDOM 留着\n// 动态链接库 dllPlugin\n// treeshaking 只能对es6模块进行解析\n// scope hosting 作用域提升\n// let a = 1;\n// let b = 2;\n// let c= 3;\n// let d = a+b+c;\n// console.log(d); // console.log(6);\n// import() 0.js\n\nconsole.log(Object(_calc__WEBPACK_IMPORTED_MODULE_0__[/* sum */ \"a\"])()); // import _ from 'lodash'; // 提高加载速度 可以单独抽离出一个js  5个\n// import $ from 'jquery';\n// let fn = _.after(1,function(){\n//     console.log('hello');\n// })\n// fn();\n// console.log($);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

}]);
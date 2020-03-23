(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~main"],{

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************************************************************!*\
  !*** delegated ./node_modules/webpack/buildin/global.js from dll-reference react ***!
  \***********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference react */ \"dll-reference react\"))(\"./node_modules/webpack/buildin/global.js\");\n\n//# sourceURL=webpack:///delegated_./node_modules/webpack/buildin/global.js_from_dll-reference_react?");

/***/ }),

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calc */ \"./src/calc.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);\n// import React from 'react';\n// import ReactDOM from 'react-dom';\n// import Header from '_c/header'\n// import './css';\n// import 'bootstrap'\n// ReactDOM.render(<Header></Header>,document.getElementById('app'));\n// 把一些模块打包好放在那，打包的时候只打包自己写的业务代码\n// 在写一个配置文件 打包React,ReactDOM 留着\n// 动态链接库 dllPlugin\n// treeshaking 只能对es6模块进行解析\n// scope hosting 作用域提升\n// let a = 1;\n// let b = 2;\n// let c= 3;\n// let d = a+b+c;\n// console.log(d); // console.log(6);\n// import() 0.js\n\nconsole.log(Object(_calc__WEBPACK_IMPORTED_MODULE_0__[/* sum */ \"a\"])());\n // 提高加载速度 可以单独抽离出一个js  5个\n\n\n\nvar fn = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.after(1, function () {\n  console.log('hello');\n});\n\nfn();\nconsole.log(jquery__WEBPACK_IMPORTED_MODULE_2___default.a);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

}]);
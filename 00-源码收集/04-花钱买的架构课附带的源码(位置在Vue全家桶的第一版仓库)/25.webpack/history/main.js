// commonjs 规范 自己写了一个require方法
 (function(modules) { 
 	var installedModules = {};

 	function __webpack_require__(moduleId) { // index.js

 		if(installedModules[moduleId]) { // 缓存
 			return installedModules[moduleId].exports;
 		}
 	
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};

 	
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

 		module.l = true;

 		return module.exports;
 	}

 	return __webpack_require__("./src/index.js");
 })
 ({
"./src/index.js":
    (function(module, exports, __webpack_require__) {
        // 默认会去调用 require('sum.js')  默认会放回sumjs中的module.exports的结果
        eval("let sum = __webpack_require__(/*! ./sum */ \"./src/sum.js\");\n\n\nconsole.log(sum(1,2));");
    }),
 "./src/sum.js":
    (function(module, exports) {
        eval("module.exports = function sum(a,b){\n    console.log(a+b)\n}\n\n//# sourceURL=webpack:///./src/sum.js?");
    })
 });

 // 1) webpack打包的流程
// 1) 找到入口的文件 index.js 为例
// 2) 找index.js 中引用了哪些模块 会加载sum模块  ast
// 3) index是入口 执行的时候 默认会从入口执行  require方法改写成 __webpack_require__
// (需要找到入口 ，需要找到入口中的所有依赖 加载依赖) +  模板 =》 渲染后的结果
// 自己实现了一个common js模块
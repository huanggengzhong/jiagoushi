(function(modules) { 
    var installedModules = {};

    function __webpack_require__(moduleId) {

        if(installedModules[moduleId]) {
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


    return __webpack_require__( "./src/index.js");
})

// 1) 确定文件的入口"./src/index.js"
// 2) 收集依赖，做成一个依赖列表 （递归找依赖）
({
"./src/a.js":
(function(module, exports, __webpack_require__) {
 eval("let b = __webpack_require__(/*! ./base/b */ \"./src/base/b.js\");\nlet c = __webpack_require__(/*! ./base/c */ \"./src/base/c.js\");\n\n\nmodule.exports = b+c;\n\n//# sourceURL=webpack:///./src/a.js?");
}),
"./src/base/b.js":
(function(module, exports) {
 eval("module.exports = 'b'\n\n//# sourceURL=webpack:///./src/base/b.js?");
}),
"./src/base/c.js":
(function(module, exports) {
 eval("module.exports = 'c';\n\n//# sourceURL=webpack:///./src/base/c.js?");
}),
"./src/index.js":
(function(module, exports, __webpack_require__) {
 eval("let a = __webpack_require__(/*! ./a.js */ \"./src/a.js\");\n\nconsole.log(a);\n\n\n//# sourceURL=webpack:///./src/index.js?");
 })
});
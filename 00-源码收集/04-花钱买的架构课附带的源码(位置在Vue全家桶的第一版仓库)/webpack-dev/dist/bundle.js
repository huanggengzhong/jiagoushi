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

    return __webpack_require__("./src/index.js");
})
({
    
        "./src/index.js":
        (function(module, exports, __webpack_require__) {
            eval(`let a = __webpack_require__("./src/a.js");

__webpack_require__("./src/index.less");

console.log(a);`);
        }),
    
        "./src/a.js":
        (function(module, exports, __webpack_require__) {
            eval(`let b = __webpack_require__("./src/base/b.js");

let c = __webpack_require__("./src/base/c.js");

module.exports = b + c;`);
        }),
    
        "./src/base/b.js":
        (function(module, exports, __webpack_require__) {
            eval(`module.exports = 'b';`);
        }),
    
        "./src/base/c.js":
        (function(module, exports, __webpack_require__) {
            eval(`module.exports = 'c';`);
        }),
    
        "./src/index.less":
        (function(module, exports, __webpack_require__) {
            eval(`let style = document.createElement('style');
style.innerHTML = "html body {\\n  background: red;\\n}\\n";
document.head.appendChild(style);`);
        }),
    
});
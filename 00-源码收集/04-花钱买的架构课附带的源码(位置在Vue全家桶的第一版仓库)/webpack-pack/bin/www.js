#! /usr/bin/env node

let path = require('path'); 
// 以当前的执行目录 产生一个绝对路径 
let configPath = path.resolve('webpack.config.js');

// 自动的引用webpack配置
let config = require(configPath);

// 通过此配置文件进行打包

let Compiler = require('../src/Compiler');
// 实例化打包器
let compiler = new Compiler(config);

if(Array.isArray(config.plugins)){ 
    // 如果用户传入了多个插件 就让插件依次执行 调用他的apply方法
    config.plugins.forEach(plugin => {
        plugin.apply(compiler); // 参数是compiler this.hooks
    });
}

compiler.hooks.entryOption.call();
// 开始打包
compiler.run(); 
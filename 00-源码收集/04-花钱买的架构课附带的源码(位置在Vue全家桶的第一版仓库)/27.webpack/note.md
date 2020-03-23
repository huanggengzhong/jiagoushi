## dllPlugin
- dllPlugin
- referencePlugin
- add-asset-html-webpack-plugin
## resovle参数
- extensions 
- mainField/mainFiles
- alias
## 定义变量区分
- DefinePlugin
## include/exclude
## treeshaking (只支持es6模块) require
- usedExports:true
- sideEffects:false
## scope hosting
## splitChunks (webpack 4 commonChuncksPlguin)
## ingorePlugin
## happypack使用 （多线程打包 给定一个合适的线程数）
https://github.com/amireh/happypack
## 插件使用
- bannerWebpackPlugin  /**休闲鞋**/
- copyWebpackPlugin 拷贝文件的用的

## tapable 使用
SyncHook


----------
SyncBailHook 返回值不为undefined 就停止
SyncWaterfallHook 瀑布
SyncLoopHook
AsyncParalleHook tap tapAsync tapPromise/ call callAsync  promise 
AsyncParalleBailHook 
AsyncSeriesHook
AsyncSeriesWaterfallHook
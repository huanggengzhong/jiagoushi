let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let htmlPlugins = [
    'index',
    'other'
].map(chunkName=>{
    return new HtmlWebpackPlugin({
        filename: `${chunkName}.html`,
        chunks:[chunkName]
    })
});
module.exports = {
    mode:'development', // 模式开发和生产模式
    // 如果这个文件在缓存的时候 可能就不会请求新的内容
    entry:{// 多入口打包
        index:'./src/index.js',
        other:'./src/other.js' 
    },
    output:{
        filename:'[name].[contentHash:8].js'
        // path: path.resolve(__dirname,'dist')
    },
    plugins:[
        new CleanWebpackPlugin(),
        // 清空文件的插件
        ...htmlPlugins
    ]
}
// webpack插件 相当于 vue的钩子函数
// 通过插件来实现自己的功能，在钩子函数上订阅一些事情
// html-webpack-plugin
// clean-webpack-plugin api刚刚更新
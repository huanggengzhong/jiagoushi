let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let htmlPlugins = [
    'index',
].map(chunkName=>{
    return new HtmlWebpackPlugin({
        filename: `${chunkName}.html`,
        chunks:[chunkName]
    })
});
module.exports = {
    optimization:{ // webpack4提供的压缩项
        minimizer: [ // 手动指定压缩
            new TerserJSPlugin({}), 
            new OptimizeCSSAssetsPlugin({})],
    },
    devServer:{
        port:3000, // 服务启动的端口号
        //open:true, // 自动打开浏览器
        compress:true,// 启用gzip压缩
        contentBase:'./dist' // express.static(dist)
        // 默认打包的结果通过webpack-dev-server 放到内存中的，而且目录是当前的根目录，contentBase 在启动一个静态文件目录
    },
    mode:'production',
    entry:{
        index:'./src/index.js',
    },
    output:{
        filename:'[name].js'
    },
    module:{
        rules:[
            // less less-loader
            // stylus stylus-loader
            // node-sass sass-loader
            // css抽离出来 mini-css-extract-plugin
            {
                test:/\.css$/,
                use:[ // 抽离css样式
                   {loader: MiniCssExtractPlugin.loader},
                    {
                        loader:'css-loader',
                    },
                        'postcss-loader',
                        'sass-loader', // less会把文件直接转化掉
                    ]
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        ...htmlPlugins,
        new MiniCssExtractPlugin({
            filename:'css/main.css'
        })
    ]
}

// loader 加载器 翻译官 （转化模块的）
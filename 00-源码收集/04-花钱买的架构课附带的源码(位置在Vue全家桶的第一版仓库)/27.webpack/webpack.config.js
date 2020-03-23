let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
let path = require('path');
let AddAssetsPlugin = require('add-asset-html-webpack-plugin');
module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
    },
    optimization:{
        usedExports:true,
       
        // minimizer:[]
        splitChunks:{
            chunks:'all',
            minSize:0,
            minChunks:1,
            cacheGroups:{
                vendor:{
                    test:/node_modules/,
                    filename:'vendor.js',
                    priority:20
                },
                default:{
                    filename:'common.js',
                    minChunks:1,
                    priority:-20
                }
            }
        }
    },
    module:{
        rules:[
            {
                test:/\.(svg|woff|woff2|eot|ttf)$/,
                use:'file-loader',
            },
            {
                test:/\.js$/,
                use:'babel-loader',
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },
    resolve:{ //  解析 解析查找的规则
        alias:{ // 别名
            '_c':path.resolve(__dirname,'src','components'),
            '_x':path.resolve(__dirname,'src','xxx'),
        },
        modules:[path.resolve(__dirname,'node_modules')], // 第三方 会先找自己家的node_modules
        extensions:['.js','.css'], // 查找顺序 先找js 在找css
        // mainFiles:[], // 引入第三方模块 package.json -> main :index.js
        mainFields:['style','main'], // main
    },
    plugins:[
        new webpack.IgnorePlugin(/\.\/locale/),
        new webpack.DllReferencePlugin({ // 引用dllplugin
            manifest:path.resolve(__dirname,'dist','react.manifest.json')
        }),
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        }),
        new AddAssetsPlugin({ // 添加资源插件
            filepath:path.resolve(__dirname,'dist','react.dll.js')
        })
    ]
}

// webpack webpack-cli babel-loader @babel/core @babel/preset-env @babel/preset-react style-loader css-loader
// webpack-dev-server html-webpack-plugin
let MiniCssExtreactPlugin = require('mini-css-extract-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let SyncPlugin = require('./plugins/SyncPlugin');
let InlineSourcePlugin = require('./plugins/InlineSourcePlugin');
let UploadPlugin = require('./plugins/UploadPlugin');

module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    MiniCssExtreactPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[
        // 记录文件的所有的文件的名字 和文件的大小
        new SyncPlugin({ // 这个插件需要等待html-webpack-plugin 完成后执行
            filename:'r.md'
        }),
        new MiniCssExtreactPlugin({
            filename:'main.css'
        }),
        new HtmlWebpackPlugin(),
        new InlineSourcePlugin({
            match:/\.(js|css)$/
        }),
        new UploadPlugin({
            bucket:'jwstatic',
            domain:'img.fullstackjavascript.cn',
            accessKey:'uimQ1Inof5KwcA5ETlLMnwoJzrIhigEEilWMpJtg',
            secretKey:'zNoP0z1XzHFGN0JMJsxSEvLRcFPXxAVaXEDWOwdH'
        })
    ],
}

// 内联 webpack插件
let webpack = require('webpack');
let path = require('path');
module.exports = {
    mode:'development',
    entry:{
        react:['react','react-dom'],
        // test: './src/test.js'
    },
    output:{
        library:'react', // 给倒出的内容 增加属性名
        // libraryTarget:'this', // 倒出的用出  var
        filename:'[name].dll.js'
    },
    plugins:[
        new webpack.DllPlugin({
            name:'react',
            path:path.resolve(__dirname,'dll','react.manifest.json')
        })
    ]
}
let path = require('path');
module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'bundle.js'
    },
    resolveLoader:{
        modules:[path.resolve(__dirname,'node_modules'),path.resolve(__dirname,'loaders')]
    },
    devtool:'source-map',
    module:{ 
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'banner-loader',
                    options:{
                        text:'/**make in 2019 4 20 by xxx**/',
                        filename:'name.txt'
                    }
                }
            }
        ]
    }
}
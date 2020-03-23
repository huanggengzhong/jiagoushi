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
    // devtool:'source-map',
    module:{ 
        rules:[
            {   
                test:/\.less$/,
                use:['style-loader','less-loader']
            },
            {
                test:/\.(jpg|gif)/,
                use:{
                    loader:'url-loader',
                    options:{
                        limit:20*1024*2014
                    }
                } // name.txt  create-react-app
            },
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
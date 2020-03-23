let express = require('express');
let config = require('./webpack.config'); // webpack的配置文件
let webpack = require('webpack');

let compiler = webpack(config); // webpack-dev-middleware
let middleware = require('webpack-dev-middleware')
let app = express();
app.use(middleware(compiler))
app.get('/api/user',function(req,res){
    res.json({name:'zf'});
})
app.listen(4000);


// webpack中解决跨域 1）proxy  2）before after 3） webpack-dev-middleware
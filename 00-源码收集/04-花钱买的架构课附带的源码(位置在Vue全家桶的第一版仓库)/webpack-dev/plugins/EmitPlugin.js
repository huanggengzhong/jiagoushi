class EmitPlugin {
    apply(compiler){ // 1) 哪个声明周期适合你 2） 你要知道这些声明周期的执行顺序
        compiler.hooks.emit.tap('EmitPlugin',function(){
            console.log('emit-plugin')
        })
    }
}
// clean-webpack-plugin 

// vue vue-skeleton 

// 在index.html 中  'baid.com/src'
// 'qq.com/s' (替换最后产生的资源比较多)

module.exports = EmitPlugin;

// loader / plugin
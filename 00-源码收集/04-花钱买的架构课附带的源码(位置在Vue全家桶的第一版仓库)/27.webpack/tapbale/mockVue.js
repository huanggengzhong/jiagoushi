let {SyncHook}  = require('tapable');

class MyLibrary {
    constructor(options){
        this.hook = {
            beforeCreate:new SyncHook(),
            mounted:new SyncHook()
        }
        if(options.beforeCreate){
            this.hook.beforeCreate.tap('传入的创建前',function(){
                options.beforeCreate();
            })
        }
        if(options.mounted){
            this.hook.mounted.tap('传入的mouted事件',function(){
                options.mounted();
            })
        }
    }
    start(){
        // 开始运行时 开始创建
        this.hook.beforeCreate.call();
        // ......
        this.hook.mounted.call();

        // ....
    }
}
let mb = new MyLibrary({
    beforeCreate(){
        console.log('前')
    },
    mounted(){
        console.log('后')
    }
});
mb.hook.beforeCreate.tap('自定义扩展',function(){
    console.log('创建前')
})
mb.hook.beforeCreate.tap('自定义扩展',function(){
    console.log('创建前')
})
mb.hook.beforeCreate.tap('自定义扩展',function(){
    console.log('创建前')
})
mb.hook.beforeCreate.tap('自定义扩展',function(){
    console.log('创建前')
})
mb.hook.mounted.tap('自定义扩展',function(){
    console.log('创建后')
})
mb.start(); // tapable  流程控制

// add-assest-html-webpack-plugin

// tapable
// ast 抽象语法树
// 手写webpack 手写loader 手写plugin
// http 
// 周六
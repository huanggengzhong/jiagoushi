// 这个文件 用来通过配置文件进行打包的
let fs = require('fs');
let path = require('path');
let babylon = require('babylon'); // 把源代码转化成 ast  @babel/core transform =traverse+generate
let traverse = require('@babel/traverse').default; // 遍历树
let generator = require('@babel/generator').default; 
let {SyncHook} = require('tapable')

let template = fs.readFileSync(path.resolve(__dirname,'template.ejs'),'utf8');
class Compiler{
    constructor(config){
        this.config = config;
        this.entryName; // 我需要获取入口的名字
        this.modules = {}; // 需要的所有的模块
        this.entry = this.config.entry;
        // 获取当前运行命令时的路径
        this.root = process.cwd();
        this.template = template;
        this.hooks = {
            entryOption:new SyncHook(),
            run:new SyncHook(),
            emit:new SyncHook(), //发射文件前
            afterEmit:new SyncHook(),
            done:new SyncHook()
        }
    }
    readSource(p){ // ./a.js  ./index.less  
        let content = fs.readFileSync(p,'utf8');
        // 判断这个路径 是不是能匹配到loader  如果能匹配到
        let rules = this.config.module.rules
        for(let i = 0; i<rules.length; i++){
            // 获取当前loader的正则 和 对应的处理方法
            let {test,use} = rules[i];
            // 定位到最后的一个loader
            if(test.test(p)){ // loader 内部可能会有异步的情况
                let len = use.length-1
                function normalLoader(){
                    let loader = use[len]; // 取出最后一个loader
                    let fn = require(loader);
                    content = fn(content);
                    if(len-- > 0){ //必须保证还有loader才继续执行
                        normalLoader();  // 如果有loader就进行处理
                    }
                }
                normalLoader();
            }
        }
        return content;
    }
    parser(source,parentPath){
        // 对source进行ast语法解析
        // require('./a') => __webpack_require__('parentPath+./a.js')
        // 1) 把源代码转化成ast 语法树 2）遍历树 修改树  3） 生成新的代码
        let ast = babylon.parse(source); // webpack acron ast库
        let dependencies = []; // 存放所有的代码依赖
        traverse(ast,{ // visitor
            CallExpression(p){
                let node = p.node;
                if(node.callee.name === 'require'){
                    node.callee.name = "__webpack_require__";
                    // require('a') => require('a.js')
                    let refPath = node.arguments[0].value + (path.extname(node.arguments[0].value)?'':'.js');
                    // 当前require了某个模块
                    let modulePath = './'+path.join(parentPath,refPath);
                    dependencies.push(modulePath);
                    node.arguments[0].value = modulePath
                }
            }
        });
        let r = generator(ast)
        return {code:r.code,dependencies};
    }
    buildModule(modulePath,isMain){
        // 收集依赖关系
        let source = this.readSource(modulePath);
        let relativeModulePath = './'+path.relative(this.root,modulePath);
        if(isMain){
            this.entryName = relativeModulePath
        }
        // ./src/index.js 
        let {code,dependencies} = this.parser(source,path.dirname(relativeModulePath)); // 转化我们的源代码
        this.modules[relativeModulePath] = code;
        dependencies.forEach(dep=>{ // ./src/a.js 递归的收集每个模块的依赖
            this.buildModule(path.join(this.root,dep));
        });
    }
    emit(){
        // 通过数据渲染对应的模板
        let ejs = require('ejs');
        let renderStr = ejs.render(this.template,{
            entryName:this.entryName,
            modules:this.modules
        });
        // 输出的文件名
        this.assets = {}; // 所有要输出的文件
        // 获取输出的路径
        let filename = this.config.output.filename;
        // 将要输出的文件 放到assets 对象中
        this.assets[filename] = renderStr; // html-webpack-plugin
        
        let p = this.config.output.path || path.resolve('dist');

        // 最终的输出结果  循环对象 依次写入到文件中
        Object.keys(this.assets).forEach(filename=>{
            let outputPath = path.join(p,filename);
            // 把资源文件的内容 写入进去
            fs.writeFileSync(outputPath,this.assets[filename])
        })
      
    }
    run(){
        this.hooks.run.call();
        // 1) 打包 找到入口 和 所有的依赖
        // 从入口开始
        this.buildModule(path.join(this.root,this.entry),true);
        // require = __webpack_require__
        // 2） 使用模板 和 数据渲染一个打包后的文件
        this.hooks.emit.call();
        this.emit();
        this.hooks.afterEmit.call();
        this.hooks.done.call();
    }
}

module.exports = Compiler
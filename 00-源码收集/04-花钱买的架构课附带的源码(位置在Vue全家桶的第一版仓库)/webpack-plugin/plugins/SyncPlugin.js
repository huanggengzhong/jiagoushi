class SyncPlugin {
    constructor({filename}){
        this.filename = filename;
    }
    apply(compiler){
        // tap call 
        // tap callAsync
        // tapAsync callAsync
        // tapPromise promise
        // 测试 打包文件后的大小 webpack-anyliys
        compiler.hooks.emit.tap('SyncPlugin',(compilation)=>{
            let assets = compilation.assets;
            // {a:1,b:2} => [[a,1],[b,2]]
            let content = `# 文件名    文件大小`
            Object.entries(assets).forEach(([filename,fileObj])=>{
                content += `\r\n- ${filename}    ${fileObj.size()}b`
            });
            content += '\r\n\r\n> 文件总个数 '+Object.entries(assets).length +'个'
            compilation.assets[this.filename] = {
                source(){
                    return content;
                },
                size(){
                    return content.length;
                }
            };
        });
        compiler.hooks.emit.tapAsync('SyncPlugin',(compilation,cb)=>{
            setTimeout(()=>{
                console.log('串行等待中')
                cb();
            },1000);
        });
        compiler.hooks.emit.tapPromise('SyncPlugin',(compilation)=>{
            return new Promise((resolve,reject)=>{
                setTimeout(() => {
                    resolve();
                }, 1000);
            })
        })
    }
}

module.exports = SyncPlugin
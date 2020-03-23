class DonePlugin {
    apply(compiler){
        console.log(2);
        compiler.hooks.done.tap('DonePlugin',function(){
            console.log('done');
        })
    }
}
module.exports = DonePlugin
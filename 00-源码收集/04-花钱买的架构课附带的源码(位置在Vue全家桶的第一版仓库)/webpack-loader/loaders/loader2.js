function loader(source){
    // 要用到this
    console.log(2)
    return source;
}
loader.pitch = function(){
    console.log('loader2-pitch');
}
module.exports = loader;
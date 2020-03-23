function loader(source){
    // 要用到this
    console.log(1)
    return source;
}
loader.pitch = function(){
    console.log('loader1-pitch');
}
module.exports = loader;
function loader(source){
    // 创建一个style标签  
    let codeStr = `
        let style = document.createElement('style');
        style.innerHTML=${JSON.stringify(source)}
        document.head.appendChild(style)`;
    return codeStr.replace(/\\/g,'\\\\');
}
module.exports = loader
setTimeout(()=>{ // 标号 1号定时器
    console.log(1);
    Promise.resolve().then(data=>{
        console.log(2);
    })
},0)
Promise.resolve().then(data=>{
    console.log(3);  // 3
    setTimeout(()=>{ // 标号 2的定时机器
        console.log(4);
    },0);
});
console.log('start'); // 先执行同步代码
// start 3 1 2 4
// 执行属性 微任务会先执行


// 默认先执行主栈中的代码，执行后清空微任务，之后微任务执行完毕 取出第一个宏任务到主栈中执行，（如果有微任务会在次去清空微任务），在去取宏任务  形成了事件环  

// 浏览器的事件环 和 node事件环有什么区别（现在一样）

// 给方法 分类  
// 宏任务  (setImmediate ie支持) >  setTimeout  MessageChannel
// 微任务 then >  MutationObserver  
// Vue.nextTick 下一队列（异步的）

// 为什么js是单线程的（主线程）？ 多线程 同时干两件事  (webworker) 在工作线程中不能操作dom 也不能操作window




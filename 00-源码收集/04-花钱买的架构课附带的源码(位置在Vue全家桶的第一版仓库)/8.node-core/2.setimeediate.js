// 主栈执行时 默认已经超过 4ms  定时器已经到达了执行的时间
// 启动时间比较快 小于4s

// 比较代码运行到定时器的时候 有没有到达时间
// https://www.jianshu.com/p/ac64af22d775
console.time('start');
setTimeout(()=>{
    console.log('setImmediate');
    console.timeEnd('start');
},0);

// setTimeout(()=>{
//     console.log('timeout1')
//     process.nextTick(()=>{
//         console.log('nexttick1');
//     });
// },4);
// process.nextTick(()=>{
//     console.log('nexttick2');
//     setTimeout(()=>{
//         console.log('timeout2')
//     },4);
// });
// 主栈执行后 会执行微任务
// 和浏览器是一样的 ，不一样的是 每个阶段都有一个自己的队列


let fs = require('fs');
// https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/

// timer -> poll（走到poll是后 会等待着时间到达，如果有check则会走到check）  -> check  不同的阶段
fs.readFile('./note.md','utf8',(err,data)=>{
    process.nextTick(()=>{
        console.log('next')
    })
    setTimeout(() => {
        console.log('呵呵想')
    }, 0);
    setImmediate(()=>{
        console.log('setimmediate')
    });
});
// 和浏览器一样 ，但是在readFile中有check 会先走check

// commonjs 规范 内置模块 npm的应用
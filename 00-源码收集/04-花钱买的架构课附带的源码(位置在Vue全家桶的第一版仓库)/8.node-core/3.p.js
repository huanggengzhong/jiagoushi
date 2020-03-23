const p =Promise.resolve();
;(()=>{
    const implicit_promise = new Promise(resolve =>{
        // 在一个promise中resolve了一个新的promise
        const promise = new Promise(res=>res(p)); // 执行后又挂载了一个then方法 tick b
        promise.then(()=>{ // after:wait
            console.log('after:await');
            resolve()
        })
    });
    return implicit_promise
})();
p.then(()=>{ // 调用res(p) 会让这个promise的then方法执行
    console.log('tick:a');
}).then(()=>{
    console.log('tick:b');
}).then(()=>{
    console.log('tick:c');
});
// tick:a  

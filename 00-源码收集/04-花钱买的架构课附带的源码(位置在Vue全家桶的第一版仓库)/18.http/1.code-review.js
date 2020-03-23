
let Promise = () =>{

}
Promise.prototype.finally
console.log(Promise.prototype);


class Promise{
    finally(callback) { // finally 会等待这个callback中的内容都执行完 在继续执行,如果是promise要等待promise之行完 在执行 ，如果不是就把它包装成promise
        return this.then(val => Promise.resolve(callback()).then(() => val),
            reason => Promise.resolve(callback()).then(() => { throw reason }))
    }
}


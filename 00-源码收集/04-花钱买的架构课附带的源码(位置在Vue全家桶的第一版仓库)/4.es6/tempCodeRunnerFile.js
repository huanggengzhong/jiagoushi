let a = 1;
let obj = { // 对象
    a:2,
    fn:()=>{ // this=obj
        setTimeout(()=>{
            console.log(this.a);
        })
    }
}
obj.fn();
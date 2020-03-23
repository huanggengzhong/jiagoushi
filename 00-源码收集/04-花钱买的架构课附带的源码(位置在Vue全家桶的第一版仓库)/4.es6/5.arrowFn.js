// 箭头 没有this 没有arguments
function a(){
    
}

// let a = function(x,y){
//     return {total:x+y};
// }
// a(1,2)

// let a = (x,y) => ({total:x+y});


// let a = function(x){
//     return function(y){
//         return x+y;
//     }
// }
// a(1,2);
// let a = x=>y=>x+y;


// this的问题 看. 前面是谁 this就是谁
let a = 1;
let obj = { // 对象
    a:2,
    fn(){ // this=obj
        setTimeout(()=>{
            console.log(arguments);
        })
    }
}
obj.fn();
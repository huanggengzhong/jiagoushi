let fs = require('fs');
let path = require('path');
// function mkdirSync(paths){
//     let arr = paths.split('/');
//     for(let i = 0 ; i < arr.length;i++){
//         let currentPath = arr.slice(0,i+1).join('/');
//         // 如果 已经存在的目录
//         try{ // 如果路径存在 则不用创建
//             fs.accessSync(currentPath)
//         }catch(e){
//             fs.mkdirSync(currentPath);
//         }
//     }
// }

// mkdirSync('a/b/c/d'); // 默认创建目录 必须父级存在 才能创建子级


// function mkdir(paths,cb){
//     let arr = paths.split('/'); // next()
//     function next(index){
//        if(index >= arr.length) return cb();
//       let currentPath = arr.slice(0,index+1).join('/');
//       // fs.exists(())
//       fs.access(currentPath,(err)=>{
//           if(err){ // 如果不存在 则创建
//             fs.mkdir(currentPath,()=>next(index+1))
//           }else{
//             next(index+1);
//           }
//       })
//     }   
//     next(0);
// }
// mkdir('a/b/c/d/e/f/g',()=>console.log('创建完成'));


// 删除目录 rmdirSync  删除文件  unlinkSync
// fs.statSync 文件的状态 statObj.isDirectory()
// fs.readdirSync 读取目录 返回的是一个数组

// 1) 先序 深度 遍历 （同步）
// function removeDirSync(dir){
//     let statObj = fs.statSync(dir); // fs.accesssync
//     if(statObj.isDirectory()){
//         let dirs = fs.readdirSync(dir); // 拿到目录后 需要加上父级
//         // 把路径进行包装
//         for(let i = 0 ; i < dirs.length;i++){
//             let current = path.join(dir,dirs[i]);
//             removeDirSync(current); // 删除儿子节点 在将自己删除掉 
//         }
//         fs.rmdirSync(dir); // 把自己删掉
//     }else{
//         // 文件就删除跑路
//         fs.unlinkSync(dir);
//     }
// }
// removeDirSync('a');

// 2) 广度遍历（同步）
// function wideSync(dir){
//     let arr = [dir];
//     let index = 0;
//     let current; // 读取的当前项目
//     while(current = arr[index++]){
//         let statObj = fs.statSync(current);
//         if(statObj.isDirectory()){
//             let dirs = fs.readdirSync(current);
//             dirs = dirs.map(d=>path.join(current,d)); // 当前儿子文件夹的路径
//             arr = [...arr,...dirs]; // [a,a/d,'a/q.js','b','e']
//         }
//     }
//     // 倒序删除
//     for(let i =arr.length-1; i>=0 ;i-- ){
//         let current = arr[i];
//         let statObj = fs.statSync(current);
//         if(statObj.isDirectory()){
//             fs.rmdirSync(current);
//         }else{
//             fs.unlinkSync(current);
//         }
//     }
// }
// wideSync('a');

// 异步的分类  串行连在一起  并行 一起删除

// 先序 深度 串行

// function rmdirSeries(dir,callback){
//     fs.stat(dir,(err,statObj)=>{
//         if(statObj.isDirectory()){
//             // 读取文件中的内容
//             fs.readdir(dir,(err,dirs)=>{
//                 // [a/d,a/v];
//                 dirs = dirs.map(d=> path.join(dir,d))
//                 function next(index){
//                     if(index === dirs.length) return fs.rmdir(dir,callback);
//                     // 先取出数组中的第一个 第一个删除后 在删除第二个
//                     rmdirSeries(dirs[index],()=>next(index+1));
//                 }
//                 next(0);
//             })
//         }else{
//             fs.unlink(dir,callback);
//         }
//     });
// }
// rmdirSeries('a',()=>{
//     console.log('删除成功')
// });

// 异步 相序 并发 删除 

function removeDirParalle(dir,callback){ //a/c  done
    fs.stat(dir,(err,statObj)=>{
        if(statObj.isDirectory()){
            // 读取文件中的内容
            fs.readdir(dir,(err,dirs)=>{
                // [a/d,a/v];
                if(dirs.length == 0){ // 如果目录里面没东西
                    return fs.rmdir(dir,callback);
                }
                dirs = dirs.map(d=> {
                    let current = path.join(dir,d);// [a/b,a/c]
                    // 每个人删除后 就会调用done方法
                    removeDirParalle(current,done);
                    return current;
                })
                // 并发删除
                let index = 0; // 2
                function done(){// promise.all
                    if(++index === dirs.length){
                        fs.rmdir(dir,callback);
                    }
                }
            })
        }else{
            fs.unlink(dir,callback);
        }
    });
}
removeDirParalle('a',()=>{
    console.log('删除成功')
});
// 作业：1.把这个方法变成promise的形式 并发删除  2. 广度改成异步
// promise -> async + await
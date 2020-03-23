#! /usr/bin/env node

// 默认启动一个http-server port  ip地址 
// 定义 一个port属性 
let config = {
    port:3000,
    host:'127.0.0.1',
    dir: process.cwd() // 在哪里启动 路径就是哪里
}
// process.argv .slice(2)
// yargs comander
let commander = require('commander');
let json = require('../package.json');
commander.version(json.version)
    .option('-p, --port <n>','set http-server port')
    .option('-o, --host <n>','set http-server host')
    .option('-d, --dir <n>','set http-server directory')
    .on('--help',function(){
        console.log('Examples')
        console.log('  $ zf-http-server --port --host')
    })
    .parse(process.argv)

config = {...config,...commander}

// 解析用户传入的数据 根据数据启动一个http-server

let Server = require('../server.js');
let server = new Server(config);
server.start(); // 启动一个服务 根据我的配置

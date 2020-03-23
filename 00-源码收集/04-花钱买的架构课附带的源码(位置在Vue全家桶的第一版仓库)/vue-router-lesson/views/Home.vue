<template>
    <div>
        <el-button @click="login">登陆</el-button>
        <el-button @click="quit">退出</el-button>
    </div>
</template>


<style scoped="true">
</style>

<script>
export default {
    methods:{
        login(){
            localStorage.setItem('login',true)
        },
        quit(){
            localStorage.clear('login')
        }
    },
    activated(){
        // 激活时
        console.log('activead')
    },
    deactivated() {
        // 失活
        console.log('deactivated')
    },
    mounted(){
    },
    beforeRouteEnter (to, from, next) {
        console.log('enter')
        next(vm=>{
            console.log('last')
        });
    }
}
</script>
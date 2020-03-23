<template>
    <div>
        <button @click="showMessage">点我弹层</button>
        <Test></Test>    
    </div>
</template>

<script>
import Vue from 'vue';
import Message from './components/Message';
import Test from './Test.vue'
Vue.use(Message,{duration:1000}); // 使用一个插件，我们内部需要提供一个install方法
export default {
    components:{
        Test
    },
    name:'parent',
    mounted(){
        console.log(this._info)
    },
    methods:{
        showMessage(){
            this.$message.info({
                message:'我很帅1',
                duration:3000
            })
        }
    }
}
</script>
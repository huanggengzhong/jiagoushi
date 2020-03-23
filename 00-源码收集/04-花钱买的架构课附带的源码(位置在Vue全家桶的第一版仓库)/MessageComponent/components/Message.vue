<template>
    <div class="messages" v-if="messages.length" >
        <div v-for="m in messages" :key="m.id">
            {{m.message}}
        </div>
    </div>
</template>

<script>
export default {
    name:'child',
    data(){
        return {messages:[]}
    },
    mounted(){
        console.log(this._info);
        this.id = 0; // 表示当前弹层的唯一标示
    },
    methods:{
        add(options){
            let id = this.id++; // 这是每个弹层id号
            let layer = {...options,id};
            this.messages.push(layer); // 每增加一个就像数组中存放一个
            layer.timer = setTimeout(() => { // 时间到了 将自己移除
                this.remove(layer);
            }, options.duration);
        },
        remove(layer){
            clearTimeout(layer.timer);
            this.messages = this.messages.filter(message=>message.id !==  layer.id)
        }
    }
}
</script>
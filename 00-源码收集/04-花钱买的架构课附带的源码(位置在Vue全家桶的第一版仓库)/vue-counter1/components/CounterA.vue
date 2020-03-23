<template>
    <div>
        {{c}}  {{a}}
        <button @click="addTen">点击</button>
        {{this.$store.getters.multi}}
        {{multi}}
    </div>
</template>
<script>
import {mapState,mapGetters,mapMutations} from 'vuex';
export default {
    computed:{
        ...mapGetters(['multi']),
        // mapState更改名字用对象 如果不用更改名用数组即可
        ...mapState({a:state=>state.a.a}),
        ...mapState({'c':'count'})
        // ...mapState(['count']) 
        // count:function(){
        //     return this.$store.state.count
        // }
    },
    methods:{ // {addTen:fn}
        ...mapMutations({mutate:'addTen'}),
        addTen(){
            // 调用addTen这个mutation函数 并且传递参数10
            // this.$store.commit('addTen',10);
            this.mutate(10);
        }
    }
}
</script>
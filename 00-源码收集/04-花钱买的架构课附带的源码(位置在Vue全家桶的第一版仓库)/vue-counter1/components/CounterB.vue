<template>
    <div>
        {{this.$store.state.count}}
        <button @click="decrementTen">等待两秒后减少10</button>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    methods:{
        ...mapActions(['minusTen']),
        decrementTen(){
            // this.$store.dispatch('minusTen',10)
            this.minusTen(10);
        }
    }
}
</script>
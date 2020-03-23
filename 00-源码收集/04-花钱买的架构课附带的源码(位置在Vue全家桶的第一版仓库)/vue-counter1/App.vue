<template>
    <div>
        {{this.$store.state.count}}
        <CounterA></CounterA>   
        <CounterB></CounterB>    
    </div>
</template>
<script>
import CounterA from './components/CounterA';
import CounterB from './components/CounterB'
export default {
    components:{
        CounterA,
        CounterB
    },
    mounted(){
        console.log(this.$store)
    }
}
</script>
<template>
  <div id="app">
    <cube-tab-bar v-model="selectedLabelDefault" @click="clickHandler" >
      <cube-tab v-for="(item) in tabs" :label="item.value" :key="item.label" >
        <i slot="icon" :class="item.icon"></i>
        {{item.label}}
      </cube-tab>
    </cube-tab-bar>
    <router-view/>
  </div>
</template>
<script>
export default {
  watch:{
    $route(){
      this.selectedLabelDefault = this.$route.path
    }
  },
  data () {
    return {
      selectedLabelDefault: '/',
      tabs: [{
        label: '商品列表',
        value:'/',
        icon: 'cubeic-home'
      }, {
        label: '购物车',
        value:'/cart',
        icon: 'cubeic-mall'
      }]
    }
  },
  methods: {
    clickHandler (value) {
      this.$router.push(value);
    },
    changeHandler (label) {
     
    }
  }
}

</script>
<style>
</style>

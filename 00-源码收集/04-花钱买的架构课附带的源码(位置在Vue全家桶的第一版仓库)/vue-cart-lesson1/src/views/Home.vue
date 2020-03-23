<template>
  <div class="home">
    商品页面
    <ul>
      <li v-for="product in products" :key="product._id">
        <img :src="product.cartCover" alt="">
         {{product.cartName}}
      </li>
    </ul>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
let {mapActions,mapState} = createNamespacedHelpers('product')
import * as types from '../store/mutation-types'
export default {
  methods:{
    ...mapActions([types.GET_PRODUCT_LIST])
    //...mapActions('product',[types.GET_PRODUCT_LIST])
  },
  computed:{
    ...mapState(['products'])
  },
  mounted(){
    if(this.products.length == 0){
      this[types.GET_PRODUCT_LIST]()
    }
    
     //this.$store.dispatch('product/'+types.GET_PRODUCT_LIST)
  }
}
</script>

<style lang="stylus">
ul
  li
    display flex;
    img
      width 100px;
      height 100px;

</style>
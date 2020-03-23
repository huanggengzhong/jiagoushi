<template>
  <div id="app">
    <MyTitle :type="1" :fn="say">xxxx</MyTitle>
    <List :list="arr" :render="render"></List>

     <MyTable :columns="columns1" :data="data1"></MyTable>
  </div>
</template>
<script>
// 组件 第一步 声明  引用   注册
// import MyTitle from './components/MyTitle.vue'
import MyTitle from './components/MyTitle.js'
import List from './components/List.vue'
import MyTable from './components/MyTable'
export default {
  name: 'app',
  data(){
    return {
      arr:[1,2,3],
      columns1: [
                    {
                        title: 'Name',
                        key: 'name',
                        edit:true,
                    },
                    {
                        title: 'Age',
                        key: 'age',
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
      }
  },
  components:{
    MyTitle,
    List,
    MyTable
  },
  methods:{
    say(){},
    render(h,a){
      return <div>{a}</div>
    },
  }
}
</script>

<style lang="less">

</style>

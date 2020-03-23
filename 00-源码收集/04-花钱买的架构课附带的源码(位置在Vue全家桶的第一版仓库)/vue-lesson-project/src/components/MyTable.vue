<template>
    <Table :columns="c" :data="data"></Table>
</template>

<script>
export default {
    data(){
        return {
            c:[],
            index:-1
        }
    },
    props:['columns','data'],
    methods:{
        edit(i){
            this.index = i;
        },
        save(column,row,index){
            this.index = -1;
        },
        change(val,column,row,index){
            row[column.key] = val;
        }
    },
    mounted(){
        this.c = this.columns.map(column=>{
            if(column.edit){
                column.render = (h,{column,row,index})=>{
                    return <div>
                        {index === this.index?<div>
                            <i-input type="text" value={row[column.key]} on-input={(e)=>this.change(e,column,row,index)}/>
                            <i-button on-click={()=>this.save(column,row,index)}>保存</i-button>
                        </div>:<div>
                            {row[column.key]}
                            <i-button on-click={()=>this.edit(index)}>编辑</i-button>
                        </div>}
                    </div>
                }
            }
            return column
        });
    }
}
// 日历组件 组件传递 组件设计 怎么获取日期列表  new Date()
</script>

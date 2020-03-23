<template>
    <div>
        添加用户
        <el-form :model="ruleForm" :rules="rules" ref="form">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"  placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
export default {
    beforeRouteEnter (to, from, next) { // 页面的权限
        next(vm=>{
            console.log(vm); // 这个方法会在组件渲染完毕后调用
        });
    },
    beforeRouteLeave (to, from, next) {
        if(this.ruleForm.username && !this.flag){
            this.$confirm('确认关闭？')
            .then(_ => {
                next();
            })
            .catch(_ => {});
        }else{
            next(); //是否继续向下执行
        }
    },
    methods:{
        submit(){
            this.$refs.form.validate(valid=>{
                if(valid){
                    this.flag = true;
                    let lists = JSON.parse(localStorage.getItem('lists'))|| [];
                    lists.push({id:Math.random(),username:this.ruleForm.username})
                    localStorage.setItem('lists',JSON.stringify(lists));
                    this.$router.push('/user/list');
                }
            })
        }
    },
    data(){
        return {
            flag:false,
            ruleForm:{
                username:''
            },
            rules:{
                  username:[
                      {required:true,trigger:'blur',message:'请输入内容'}
                  ]
            }
        }
    }
}
</script>


// vuex + 路由
// cascader 组件的封装   tree 二次封装 
// vue-srr
// mvvm
// vuex
// 表单组件
<template>
    <div>
        <el-table :data="tableData">
            <el-table-column
                prop="id"
                label="id号"
            >
            </el-table-column>
            <el-table-column
                prop="username"
                label="用户名"
            >
                <template slot-scope="scope">
                    <router-link :to="`/user/detail/${scope.row.id}`">{{scope.row.username}}</router-link>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>


<script>
export  default {
    data(){
        let data = JSON.parse(localStorage.getItem('lists'))
        return {
            tableData:data
        }
    }
}

</script>
<template>
    <el-container>
        <el-aside width="200px">
            <el-menu 
                :router="true"
                :default-index="$route.path"
            >
                <el-menu-item index="/user/add">用户添加</el-menu-item>
                <el-menu-item index="/user/list">用户列表</el-menu-item>
            </el-menu>

        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

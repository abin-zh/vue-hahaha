<template>
    <el-container>
        <el-header class="header">
            <el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false" router v-if="isLogginIn">
                <el-menu-item>
                    <div>
                        <font-awesome-icon icon="fa-regular fa-face-dizzy" size="xl" />
                    </div>
                </el-menu-item>
                <div class="flex-grow" />
                <el-menu-item index="/">首页</el-menu-item>
                <!-- 切换主题 -->
                <el-menu-item>
                    <div>
                        <el-switch v-model="swiDark" size="small" @click="switchThemes">
                        </el-switch>
                    </div>
                </el-menu-item>
                <el-sub-menu index="/user">
                    <template #title>
                        <el-avatar size="small" src="https://q.qlogo.cn/g?b=qq&nk=863030357&s=640"></el-avatar>
                    </template>
                    <el-menu-item index="/user/mine">我的</el-menu-item>
                    <el-menu-item index="logout" @click="logout">登出</el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-header>
        <router-view></router-view>
    </el-container>
</template>

<script>
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { useUserStore } from '@/stores/user'

const isDark = useDark()

export default {
    name: 'App',
    created() {
        this.activeIndex = '/';
    },
    computed: {
        isLogginIn() {
            const userStore = useUserStore();
            return userStore.getUserToken == "" ? false : true;
        }
    },
    data() {
        return {
            swiDark: ref(isDark.value),
            activeIndex: '/',
        }
    },
    methods: {
        switchThemes() {
            //参考https://www.cnblogs.com/libaiyun/p/16462465.html
            const toggleDark = useToggle(isDark)
            toggleDark()
        },
        logout() {
            const userStore = useUserStore();
            userStore.$reset();
            this.$router.push('/user/login');
        }
    }
}
</script>

<style>
@import '@/assets/base.css';
</style>

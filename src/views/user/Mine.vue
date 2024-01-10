<template>
    <div class="container">
        <div class="mine-info">
            <el-avatar class="mine-avatar" src="https://q.qlogo.cn/g?b=qq&nk=863030357&s=640"></el-avatar>
            <el-text class="mine-text-bold">{{ user.userName }}</el-text>
            <el-text size="small">普通用户</el-text>
        </div>
        <div class="mine-data">
            <div class="mine-data-group">
                <el-text class="mine-text-blue">0</el-text>
                <el-text size="small">待支付</el-text>
            </div>
            <div class="mine-data-group">
                <el-text class="mine-text-blue">0</el-text>
                <el-text size="small">待收货</el-text>
            </div>
            <div class="mine-data-group">
                <el-text class="mine-text-blue">0.00</el-text>
                <el-text size="small">账户余额</el-text>
            </div>
        </div>
        <div class="mine-nav">
            <div class="mine-nav-group">
                <div class="mine-nav-lgroup">
                    <el-icon class="mine-nav-icon">
                        <font-awesome-icon icon="fa-solid fa-receipt" />
                    </el-icon>
                    <el-text>我的订单</el-text>
                </div>
                <div class="mine-nav-rgroup">
                    <el-icon>
                        <font-awesome-icon icon="fa-solid fa-arrow-right" />
                    </el-icon>
                </div>
            </div>
            <el-divider class="mine-divider" />
            <div class="mine-nav-group">
                <div class="mine-nav-lgroup">
                    <el-icon class="mine-nav-icon">
                        <font-awesome-icon icon="fa-solid fa-address-book" />
                    </el-icon>
                    <el-text>收货地址</el-text>
                </div>
                <div class="mine-nav-rgroup">
                    <el-icon>
                        <font-awesome-icon icon="fa-solid fa-arrow-right" />
                    </el-icon>
                </div>
            </div>
            <el-divider class="mine-divider" />
            <div class="mine-nav-group">
                <div class="mine-nav-lgroup">
                    <el-icon class="mine-nav-icon">
                        <font-awesome-icon icon="fa-solid fa-circle-info" />
                    </el-icon>
                    <el-text>个人信息</el-text>
                </div>
                <div class="mine-nav-rgroup">
                    <el-icon>
                        <font-awesome-icon icon="fa-solid fa-arrow-right" />
                    </el-icon>
                </div>
            </div>
            <el-divider class="mine-divider" />
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
export default {
    setup() {
        const userStore = useUserStore();
        const user = ref(userStore.getUser);
        return { user }
    },
}
</script>

<style>
.mine-info {
    width: 100%;
    height: 125px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--el-color-primary-light-3);
    margin-bottom: 20px;
    border-radius: 8px;
}

.mine-avatar {
    margin-bottom: 8px;
}

.mine-data {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}

.mine-data-group {
    display: flex;
    flex-direction: column;
}

.mine-text-bold {
    font-weight: bold;
}

.mine-text-blue {
    color: var(--el-color-primary-dark-2);
}

.mine-nav {
    width: 100%;
}

.mine-nav-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 16px;
    margin-bottom: 8px;
}

.mine-nav-lgroup {
    display: flex;
    align-items: center;
}



.mine-nav-icon {
    margin-right: 4px;
}

.mine-divider {
    margin: 12px 0;
}
</style>
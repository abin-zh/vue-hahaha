<script>
    import { useCounterStore } from '@/stores/counter';
    import { login } from '@/http'
    export default{
        setup(){
            const mainStore = useCounterStore();
            
            return {
                mainStore
            }
        },
        methods:{
            async testAxios(){
                const testlogin = await login({
                    "email": "414090297@qq.com",
                    "password": "12345678"
                });
                console.log(testlogin);
            }
        }
    }
</script>

<template>
    <div @click="mainStore.increment()">{{ mainStore.count }}</div>
    <el-button @click="testAxios"></el-button>
</template>

<style scoped>

</style>
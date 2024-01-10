<template>
    <el-tag :class="{'cat': true,'cat-clicked': showInNav}" size="large" @click="changeCatId"> 
        <el-text>{{ title }}</el-text>
    </el-tag>
</template>

<script>
import { useArticleStore } from '@/stores/article';
export default{
    props:{
        id:{
            type:Number,
            required:true
        },
        title:{
            type:String,
            required:true
        },
        showInNav:{
            type:Boolean,
            required:true,
            default:false
        }
    },
    methods:{
        changeCatId(){
            const articleStore = useArticleStore();
            articleStore.setCurCatId(this.id);
        }
    }
}
</script>

<style>
    .cat{
        margin-bottom: 8px;
    }
    .cat-clicked{
        background-color: var(--el-color-primary);
    }
</style>
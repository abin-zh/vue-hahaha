<template>
    <el-card class="cjb-article" @click="$emit('toArticle',id)">
        <div class="article-header">
            <el-text tag="b" size="large" truncated>{{ title }}</el-text>
        </div>
        <div class="article-body">
            <el-text line-clamp="2" size="default" type="info">{{ content }}</el-text>
        </div>
        <div class="article-footer">
            <el-tag>{{ userName }}</el-tag>
        </div>
    </el-card>
</template>

<script>
import { getUserInfo } from "@/http/user";

export default {
    async mounted() {
        await getUserInfo(this.userinfoId).then((res) => {
            if(res.success && res.code == 1){
                this.userName = res.data.userinfo.userName;
            }   
        });
    },
    props: {
        id: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        userinfoId: {
            type: Number,
            required: true,
        },
        createTime: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            userName: " "
        }
    },
}
</script>

<style>
.cjb-article {
    margin-bottom: 8px;
}

.article-body {
    margin-top: 6px;
    margin-bottom: 8px;
}
</style>
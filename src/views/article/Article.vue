<template>
    <div class="aside-menu-hr">
        <el-affix :offset="0">
            <el-button @click="back">
                <font-awesome-icon icon="fa-solid fa-chevron-left" />
            </el-button>
        </el-affix>
    </div>
    <el-container>
        <el-aside class="aside-menu-vt">

        </el-aside>
        <el-container>
            <el-main class="content">
                <div class="article-title">
                    <el-text tag="b">{{ article.title }}</el-text>
                </div>
                <div class="article-userinfo">
                    <el-tag>{{ user.userName }}</el-tag>
                </div>
                <div class="article-info">
                    <el-text type="info" size="small">{{ createTime }}</el-text>
                </div>
                <div class="article-content">
                    <div id="preview" class="vditor-reset"></div>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>


<script>
import { getArticleById } from "@/http/article";
import { getUserInfo } from "@/http/user";
import VditorPreview from "vditor/dist/method.min";
import "vditor/src/assets/less/index.less"

 export default {
    async mounted() {
        this.id = this.$route.params.id;
        await getArticleById(this.id).then(res => {
            this.article = res.data.article;
            console.log(this.article.content)
            VditorPreview.preview(document.getElementById("preview"),this.article.content,{
                theme: "light",
                hljs: {
                    enable: true,
                    style: "dracula", 
                }
            });
        });

        await getUserInfo(this.article.userinfoId).then(res => {
            this.user = res.data.userinfo;

            const backendTime = this.article.createTime;
        });
    },
    data() {
        return {
            id: 0,
            user: {},
            article: {
                title: "",
                content: "",
                createTime: "",
                userinfoId: 0,
            },
        }
    },
    computed: {
        createTime() {
            console.log(this.article.createTime)
            const backendTime = this.article.createTime;

            const year = backendTime.slice(0, 4);
            const month = backendTime.slice(5, 7);
            const day = backendTime.slice(8, 10);
            const hours = backendTime.slice(11, 13);
            const minutes = backendTime.slice(14, 16);
            const seconds = backendTime.slice(17, 19);
            const formattedTime = year + '年' + month + '月' + day + '日 ' + hours + ':' + minutes + ':' + seconds;

            // 输出: 2023-11-07 03:37:43
            return formattedTime;
        }
    },
    methods: {
        back() {
            this.$router.back();
        }
    }
}
</script>




<style>
.vditor-reset{
    color: var(--el-text-color);
}
.article-title {
    text-align: left;
}

.article-title .el-text {
    font-size: 22px;
}

.article-userinfo {
    margin-top: 16px;
    margin-bottom: 8px;
}

.article-info {
    margin-bottom: 16px;
}
</style>
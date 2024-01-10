<template>
    <div class="aside-menu-hr">
        <el-affix :offset="0">
            <!-- <el-dropdown>
                <font-awesome-icon icon="fa-solid fa-bars" size="xl"/>
                <template #dropdown>
                    <el-dropdown-menu width="100%">
                        <el-dropdown-item :index="index" v-for="(item, index) in articles" @click="changeContent(item, index)">{{ item.shortTitle }}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown> -->
            <el-button @click="openCatDrawer">
                <font-awesome-icon icon="fa-solid fa-bars" />
            </el-button>
            <el-drawer class="cat-list" v-model="catDrawer" title="文章分类" size="40%">
                <cjb-cats :catList="catList"></cjb-cats>
            </el-drawer>
        </el-affix>
    </div>
    <el-container>
        <el-aside class="aside-menu-vt">
            <!-- <el-menu mode="vertical" :default-active="currenIndex">
                <el-menu-item :index="index" v-for="(item, index) in articles" @click="changeContent(item, index)">
                    {{ item.shortTitle }}
                </el-menu-item>
            </el-menu> -->
        </el-aside>
        <el-container>
            <el-main class="content" v-loading.fullscreen.lock="loading">
                <!-- <el-text>{{ content }}</el-text> -->
                <cjb-articles v-if="haveArticles" :articles="articles" @toArticle="toArticle"></cjb-articles>
                
                <el-result v-if="!haveArticles" icon="warning" title="OH,抱歉" sub-title="这个分类里还没有文章T-T" />
                
            </el-main>
            <!-- <el-footer>
                <el-space>
                    <el-button @click="doLike" circle>
                        <font-awesome-icon v-if="!isLike" icon="fa-regular fa-thumbs-up" />
                        <font-awesome-icon v-else icon="fa-solid fa-thumbs-up" />
                    </el-button>
                    <el-text>{{ like }}</el-text>
                </el-space>
            </el-footer> -->
        </el-container>
    </el-container>
</template>

<script>
import CjbCats from "@/components/CjbCats.vue";
import CjbArticles from "@/components/CjbArticles.vue";
import { getAllCat, getArticlesByCateId } from "@/http/article";
import { useArticleStore } from "@/stores/article";

export default {
    watch: {
        changeCatId() {
            this.changeArticles();
        }
    },
    created() {
        // this.currenIndex = 0;
        // let article = this.articles[this.currenIndex];
        // this.content = article.content;
        // this.like = article.like;
        // this.isLike = article.isLike;
    },
    mounted() {
        this.initArticle();
    },
    data() {
        return {
            content: "",
            like: 0,
            isLike: false,
            currenIndex: 0,
            catDrawer: false,
            catList: [],
            articles: [],
            articleStore: useArticleStore(),
            loading: false
            // articles: [
            //     {
            //         shortTitle: "Button 按钮",
            //         title: "Button 按钮",
            //         content: "使用 type、plain、round 和 circle 来定义按钮的样式。",
            //         like: 0,
            //         isLike: false
            //     },
            //     {
            //         shortTitle: "Border 边框",
            //         title: "Border 边框",
            //         content: "我们对边框进行统一规范，可用于按钮、卡片、弹窗等组件里。",
            //         like: 0,
            //         isLike: false
            //     },
            //     {
            //         shortTitle: "Color 色彩",
            //         title: "Color 色彩",
            //         content: "Element Plus 为了避免视觉传达差异，使用一套特定的调色板来规定颜色，为你所搭建的产品提供一致的外观视觉感受。",
            //         like: 0,
            //         isLike: false
            //     }
            // ]
        }
    },
    //computed和data中的数据其实是一样的,都具有响应式。
    //只不过computed是基于它的依赖缓存的，只有相关依赖发生改变时才会重新取值。
    computed: {
        changeCatId() {
            return this.articleStore.getCurCatId;
        },
        haveArticles() {
            return this.articles.length > 0;
        }
    },
    methods: {
        // changeContent(item, index) {
        //     //更改当前所在文章索引
        //     this.currenIndex = index;
        //     //切换页面文章数据
        //     this.content = item.content;
        //     this.like = item.like;
        //     this.isLike = item.isLike;
        // },
        // doLike() {
        //     let article = this.articles[this.currenIndex];
        //     //更新点赞数
        //     if (article.isLike) {
        //         article.like--;
        //         article.isLike = false;
        //     } else {
        //         article.like++;
        //         article.isLike = true;
        //     }
        //     //切换页面文章数据
        //     this.like = article.like;
        //     this.isLike = article.isLike;
        // },
        openCatDrawer() {
            this.catDrawer = true;
        },
        initArticle() {
            getAllCat().then(res => {
                this.catList = res.data.articleCats;
            });
            this.changeArticles();
        },
        changeArticles() {
            //重置文章列表
            this.loading = true;
            this.articles = [];
            getArticlesByCateId(this.articleStore.getCurCatId).then(res => {
                if (res.success && res.code == 1) {
                    this.articles = res.data.articles;
                }
                this.loading = false;
            });
        },
        toArticle(id) {
            this.$router.push({ path: `/article/${id}` });
        }
    }
}
</script>


<style scoped>
.el-aside {
    padding: 48px 32px 0 0;
}

.el-aside,
.el-menu {
    border: 0;
}
</style>

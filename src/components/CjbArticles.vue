<template>
    <div @click="$emit('toArticle',id)">
        <cjb-article v-for="(item) in articles" :id="item.id" :title="item.title" :content="item.content"
            :userinfoId="item.userinfoId" :createTime="item.createTime" @toArticle="toArticle"></cjb-article>
    </div>
</template>

<script>
import CjbArticle from "@/components/CjbArticle.vue";
export default {
    props: {
        articles: {
            type: Array,
            required: true,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            id: 0
        }
    },
    methods:{
        toArticle(id){
            this.id = id;
        }
    }
}
</script>

<style></style>
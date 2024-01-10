<template>
    <div class="cjb-cat-list">
        <cjb-cat v-for="(item) in catList" :title="item.catName" :id="item.id" :showInNav="item.id == curCatid"></cjb-cat>
    </div>
</template>

<script>
import CjbCat from "@/components/CjbCat.vue";
import { useArticleStore } from "@/stores/article";
export default {
    props: {
        catList: {
            type: Array,
            required: true,
            default() {
                return [];
            }
        },
    },
    computed: {
        curCatid() {
            const articleStore = useArticleStore();
            return articleStore.getCurCatId;
        }
    },
}
</script>

<style>
    .cjb-cat-list{
        display: flex;
        flex-direction: column;
    }
</style>
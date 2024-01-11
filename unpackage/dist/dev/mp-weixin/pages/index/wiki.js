"use strict";
const common_vendor = require("../../common/vendor.js");
const http_index = require("../../http/index.js");
require("../../http/request.js");
require("../../store/user.js");
require("../../http/config.js");
const _sfc_main = {
  data() {
    return {
      searchValue: "",
      bgcolor: "#1296db",
      frontColor: "#ffffff",
      type: "bottom",
      articleCats: [],
      articles: [],
      cur: 0
    };
  },
  onLoad() {
    common_vendor.index.setNavigationBarColor({
      backgroundColor: this.bgcolor,
      frontColor: this.fontColor
    });
    this.init();
  },
  methods: {
    init() {
      http_index.getRequest("api/articleCat/all").then((res) => {
        const articleCats = res.data.articleCats;
        this.articleCats.push({});
        articleCats.forEach((item) => {
          if (item.catName != "推荐")
            this.articleCats.push(item);
          else
            this.articleCats[0] = item;
        });
      }).catch((err) => {
        console.error(err);
      });
    },
    moveIndex(i) {
      this.cur = i;
      const cateId = this.articleCats[i].id;
      this.getArticles(cateId);
    },
    getArticles(cateId) {
      this.articles = [];
      http_index.getRequest(`api/article/${cateId}`).then((res) => {
        const articles = res.data.articles;
        articles.forEach((item) => {
          this.articles.push(item);
        });
      });
    },
    search(e) {
      console.log(e);
    },
    scroll(e) {
    }
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_search_bar2 + _easycom_uni_icons2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.bgcolor,
    b: common_vendor.o($options.search),
    c: common_vendor.o(($event) => $data.searchValue = $event),
    d: common_vendor.p({
      ["cancel-button"]: "none",
      focus: true,
      modelValue: $data.searchValue
    }),
    e: common_vendor.f($data.articleCats, (item, index, i0) => {
      return {
        a: common_vendor.t(item.catName),
        b: common_vendor.n($data.cur == index ? "cur-item" : ""),
        c: common_vendor.o(($event) => $options.moveIndex(index))
      };
    }),
    f: common_vendor.o((...args) => $options.scroll && $options.scroll(...args)),
    g: common_vendor.p({
      type: $data.type
    }),
    h: common_vendor.f($data.articles, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.t(item.content)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/code/work-2022/vue/dead/vue-hahaha/pages/index/wiki.vue"]]);
wx.createPage(MiniProgramPage);

"use strict";
const common_vendor = require("../../common/vendor.js");
const store_user = require("../../store/user.js");
const http_index = require("../../http/index.js");
require("../../http/request.js");
require("../../http/config.js");
const _sfc_main = {
  data() {
    return {
      msgs: [],
      userName: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const userStore = store_user.useUserStore();
      const { id, userName } = userStore.userinfo;
      this.userName = userName;
      this.getBigMsg(id);
    },
    getBigMsg(id) {
      http_index.getRequest(`api/memorabilia/${id}`).then((res) => {
        const { data, msg } = res;
        if (res.code == 1 && res.success) {
          this.msgs = [];
          data.memorabilias.forEach((item) => {
            this.msgs.push(item);
          });
        } else {
          common_vendor.index.showToast({
            title: msg,
            duration: 2e3,
            icon: "none"
          });
        }
      });
    },
    toMsg() {
      common_vendor.index.navigateTo({
        url: "/pages/index/msg"
      });
    }
  }
};
if (!Array) {
  const _easycom_bigmsg2 = common_vendor.resolveComponent("bigmsg");
  _easycom_bigmsg2();
}
const _easycom_bigmsg = () => "../../components/bigmsg/bigmsg.js";
if (!Math) {
  _easycom_bigmsg();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.toMsg && $options.toMsg(...args)),
    b: common_vendor.f($data.msgs, (item, index, i0) => {
      return {
        a: "38a0ed18-0-" + i0,
        b: common_vendor.p({
          user: $data.userName,
          content: item.content,
          happen: item.happenTime
        })
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/code/work-2022/vue/dead/vue-hahaha/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);

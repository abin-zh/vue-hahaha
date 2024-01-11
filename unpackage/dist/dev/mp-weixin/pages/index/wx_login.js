"use strict";
const common_vendor = require("../../common/vendor.js");
const store_user = require("../../store/user.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    login() {
      if (common_vendor.index.getUserProfile) {
        common_vendor.index.getUserProfile({
          lang: "zh_CN",
          desc: "用来授权登录该小程序！",
          success: (res) => {
            common_vendor.index.login({
              "provider": "weixin",
              "onlyAuthorize": true,
              success: function(event) {
                const { code } = event;
                const wxInfo = {
                  appid: "wxab0372ae0d1a08bb",
                  secret: "3b60715c9abf8d32c7d8b7286b0af8fa",
                  js_code: code,
                  grant_type: "authorization_code"
                };
                common_vendor.index.request({
                  url: "https://api.weixin.qq.com/sns/jscode2session",
                  method: "GET",
                  data: wxInfo,
                  success: (result) => {
                    const userStore = store_user.useUserStore();
                    const { data } = result;
                    console.log(result);
                    userStore.setOpenId(data.openid);
                    userStore.fillUserWx(res.userInfo);
                    common_vendor.index.showToast({ title: "登录成功" });
                    common_vendor.index.switchTab({ url: "/pages/my/my" });
                  }
                });
              },
              fail: function(err) {
                common_vendor.index.showToast({ title: "登录失败" });
              }
            });
          }
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.login && $options.login(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/code/work-2022/vue/dead/vue-hahaha/pages/index/wx_login.vue"]]);
wx.createPage(MiniProgramPage);

"use strict";
const common_vendor = require("../../common/vendor.js");
const store_user = require("../../store/user.js");
const http_index = require("../../http/index.js");
require("../../http/request.js");
require("../../http/config.js");
const _sfc_main = {
  data() {
    return {
      msg: {
        content: ""
      },
      rules: {
        content: {
          rules: [
            { required: true, errorMessage: "请输入大事件" }
          ]
        }
      }
    };
  },
  methods: {
    createMsg() {
      this.$refs.myform.validate().then((res) => {
        const userStore = store_user.useUserStore();
        const { id } = userStore.userinfo;
        const happenTime = Date.now();
        const data = {
          content: this.msg.content,
          happenTime,
          userId: id
        };
        http_index.postRequest("api/memorabilia/add", data).then((res2) => {
          const { code, msg, success } = res2;
          if (code == 1 && success) {
            common_vendor.index.switchTab({
              url: "/pages/index/index"
            });
            common_vendor.index.showToast({
              title: msg,
              duration: 2e3,
              icon: "none"
            });
          } else {
            common_vendor.index.showToast({
              title: msg,
              duration: 2e3,
              icon: "none"
            });
          }
        });
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.msg.content = $event),
    b: common_vendor.p({
      placeholder: "请输入大事件内容",
      required: true,
      modelValue: $data.msg.content
    }),
    c: common_vendor.p({
      name: "content"
    }),
    d: common_vendor.o((...args) => $options.createMsg && $options.createMsg(...args)),
    e: common_vendor.sr("myform", "1ae959ba-0"),
    f: common_vendor.p({
      modelValue: $data.msg,
      rules: $data.rules
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/code/work-2022/vue/dead/vue-hahaha/pages/index/msg.vue"]]);
wx.createPage(MiniProgramPage);

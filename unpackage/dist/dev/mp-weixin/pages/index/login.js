"use strict";
const common_vendor = require("../../common/vendor.js");
const http_index = require("../../http/index.js");
const store_user = require("../../store/user.js");
require("../../http/request.js");
require("../../http/config.js");
const _sfc_main = {
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      // 表单验证
      rules: {
        email: {
          rules: [
            { required: true, errorMessage: "请输入邮箱" },
            { format: "email", errorMessage: "邮箱格式不正确" }
          ]
        },
        password: {
          rules: [
            { required: true, errorMessage: "请输入密码" },
            { minLength: 8, maxLength: 20, errorMessage: "密码的长度在8到20之间" }
          ]
        }
      }
    };
  },
  methods: {
    toWxLogin() {
      common_vendor.index.navigateTo({
        url: "/pages/index/wx_login"
      });
    },
    login() {
      this.$refs.myform.validate().then((res) => {
        http_index.postRequest("api/mobile/elogin", this.user).then((res2) => {
          const { data, msg } = res2;
          if (res2.code == 1 && res2.success) {
            const userStore = store_user.useUserStore();
            userStore.setToken(data.userinfo.token);
            userStore.fillUser(data.userinfo);
            common_vendor.index.setStorage({
              key: "isLogin",
              data: 1
            });
            common_vendor.index.switchTab({
              url: "/pages/my/my"
            });
          } else {
            common_vendor.index.showToast({
              title: msg,
              duration: 2e3,
              icon: "none"
            });
          }
        }).catch((err) => {
        });
      });
    },
    toRegister() {
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
    a: common_vendor.o(($event) => $data.user.email = $event),
    b: common_vendor.p({
      placeholder: "请输入邮箱",
      required: true,
      modelValue: $data.user.email
    }),
    c: common_vendor.p({
      name: "email"
    }),
    d: common_vendor.o(($event) => $data.user.password = $event),
    e: common_vendor.p({
      placeholder: "请输入密码",
      required: true,
      modelValue: $data.user.password
    }),
    f: common_vendor.p({
      name: "password"
    }),
    g: common_vendor.o((...args) => $options.login && $options.login(...args)),
    h: common_vendor.o((...args) => $options.toWxLogin && $options.toWxLogin(...args)),
    i: common_vendor.o((...args) => $options.toRegister && $options.toRegister(...args)),
    j: common_vendor.sr("myform", "fa14255b-0"),
    k: common_vendor.p({
      modelValue: $data.user,
      rules: $data.rules
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fa14255b"], ["__file", "E:/code/work-2022/vue/dead/vue-hahaha/pages/index/login.vue"]]);
wx.createPage(MiniProgramPage);

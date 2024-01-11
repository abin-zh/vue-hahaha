"use strict";
const common_vendor = require("../../common/vendor.js");
const store_user = require("../../store/user.js");
const _sfc_main = {
  data() {
    return {
      bgColor: "#2979ff",
      fontColor: "#ffffff",
      //只能设置白色和黑色
      value: 9,
      nickName: "",
      avatarUrl: ""
    };
  },
  onLoad() {
    common_vendor.index.setNavigationBarColor({
      backgroundColor: this.bgColor,
      frontColor: this.fontColor
    });
    const userStore = store_user.useUserStore();
    const { nickName, avatarUrl } = userStore.wxinfo;
    this.nickName = nickName;
    this.avatarUrl = avatarUrl;
  },
  methods: {
    toLogin() {
      common_vendor.index.navigateTo({
        url: "/pages/index/login"
      });
    },
    btnScanCode() {
      common_vendor.index.scanCode({
        scanType: ["qrCode", "barCode"],
        success(res) {
          console.log("success", res);
        },
        fail(err) {
          console.log("fail", err);
        }
      });
    },
    btnMyPic() {
      common_vendor.index.chooseImage({
        extension: ["png", "jpg"],
        crop: {
          width: 100,
          height: 100
        },
        success(res) {
          console.log("success", res);
        },
        fail(err) {
          console.log("fail", err);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  (_easycom_uni_icons2 + _easycom_uni_nav_bar2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_nav_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.btnScanCode),
    b: common_vendor.p({
      type: "scan",
      size: "24",
      color: "#d4e4ff"
    }),
    c: common_vendor.p({
      type: "settings",
      size: "24",
      color: "#d4e4ff"
    }),
    d: $data.bgColor,
    e: $data.avatarUrl == ""
  }, $data.avatarUrl == "" ? {
    f: common_vendor.p({
      type: "person",
      size: "60",
      color: "white"
    })
  } : {
    g: $data.avatarUrl
  }, {
    h: common_vendor.o($options.btnMyPic),
    i: common_vendor.p({
      type: "cloud-upload",
      size: "18",
      color: "#d4e4ff"
    }),
    j: common_vendor.t($data.nickName),
    k: $data.bgColor,
    l: common_vendor.p({
      shadow: true,
      ["right-icon"]: "right",
      title: "开启阴影"
    }),
    m: common_vendor.p({
      shadow: true,
      ["right-icon"]: "right",
      title: "开启阴影"
    }),
    n: common_vendor.p({
      shadow: true,
      ["right-icon"]: "right",
      title: "开启阴影"
    }),
    o: common_vendor.o((...args) => $options.toLogin && $options.toLogin(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/code/work-2022/vue/dead/vue-hahaha/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);

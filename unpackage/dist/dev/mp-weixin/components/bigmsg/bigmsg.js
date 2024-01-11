"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "bigmsg",
  props: {
    user: "",
    content: "",
    happen: ""
  },
  computed: {
    happenTime() {
      const time = this.happen;
      const date = new Date(time);
      const options = {
        timeZone: "Asia/Shanghai",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      };
      const formatter = new Intl.DateTimeFormat("zh-CN", options);
      const formattedDate = formatter.format(date);
      return formattedDate;
    }
  },
  data() {
    return {};
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.user),
    b: common_vendor.t($props.content),
    c: common_vendor.t($options.happenTime)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/code/work-2022/vue/dead/vue-hahaha/components/bigmsg/bigmsg.vue"]]);
wx.createComponent(Component);

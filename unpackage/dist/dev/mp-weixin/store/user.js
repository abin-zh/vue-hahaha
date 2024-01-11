"use strict";
const common_vendor = require("../common/vendor.js");
const useUserStore = common_vendor.defineStore("user", {
  state: () => ({
    token: "",
    openid: "",
    userinfo: {
      id: 0,
      state: 0,
      userName: "",
      userType: "",
      token: "",
      binding: 0,
      email: "",
      mobile: ""
    },
    wxinfo: {
      avatarUrl: "",
      city: "",
      country: "",
      gender: 0,
      language: "",
      nickName: "",
      province: ""
    }
  }),
  actions: {
    setToken(token) {
      this.token = token;
    },
    setOpenId(openid) {
      this.openid = openid;
    },
    fillUser(userinfo) {
      this.userinfo = userinfo;
    },
    fillUserWx(wxinfo) {
      this.wxinfo = wxinfo;
    }
  },
  persist: {
    enabled: true,
    H5Storage: window == null ? void 0 : window.localStorage
  }
});
exports.useUserStore = useUserStore;

"use strict";
const common_vendor = require("../common/vendor.js");
const whiteList = [
  "/",
  "/pages/index/index",
  "/pages/my/my",
  "/pages/index/login",
  "/pages/index/register",
  "/pages/index/wiki",
  "/pages/index/crop",
  "/pages/index/wx_login"
];
function hasPermission(url) {
  let islogin = common_vendor.index.getStorageSync("isLogin");
  islogin = Boolean(Number(islogin));
  console.log(islogin);
  if (whiteList.indexOf(url) !== -1 || islogin) {
    return true;
  }
  return false;
}
async function routingIntercept() {
  const list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
  list.forEach((item) => {
    common_vendor.index.addInterceptor(item, {
      invoke(e) {
        const url = e.url.split("?")[0];
        if (whiteList.includes(url) || hasPermission()) {
          console.log("url", url, e);
          return true;
        } else {
          common_vendor.index.showToast({
            title: "用户没有权限...",
            duration: 2e3,
            icon: "none"
          });
          return false;
        }
      },
      success(res) {
        console.log(res);
      },
      fail(res) {
        console.log(res);
        return false;
      }
    });
  });
}
exports.routingIntercept = routingIntercept;

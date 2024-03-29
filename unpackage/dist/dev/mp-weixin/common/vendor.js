"use strict";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*.*?\*\//gs;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject$1(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$1(val) && !isArray(val) && !isPlainObject$1(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$3 = Object.prototype.hasOwnProperty;
const hasOwn$1 = (val, key) => hasOwnProperty$3.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
const LINEFEED = "\n";
const SLOT_DEFAULT_NAME = "d";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_EXIT = "onExit";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_UNLOAD = "onUnload";
const ON_INIT = "onInit";
const ON_SAVE_EXIT_STATE = "onSaveExitState";
const ON_RESIZE = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
const customizeRE = /:/g;
function customizeEvent(str) {
  return camelize(str.replace(customizeRE, "-"));
}
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i = 0; i < fns.length; i++) {
    ret = fns[i](arg);
  }
  return ret;
};
function once(fn, ctx = null) {
  let res;
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx, args);
      fn = null;
    }
    return res;
  };
}
function getValueByDataPath(obj, path) {
  if (!isString(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = path.split(".");
  let key = parts[0];
  if (!obj) {
    obj = {};
  }
  if (parts.length === 1) {
    return obj[key];
  }
  return getValueByDataPath(obj[key], parts.slice(1).join("."));
}
function sortObject(obj) {
  let sortObj = {};
  if (isPlainObject$1(obj)) {
    Object.keys(obj).sort().forEach((key) => {
      const _key = key;
      sortObj[_key] = obj[_key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
const encode = encodeURIComponent;
function stringifyQuery(obj, encodeStr = encode) {
  const res = obj ? Object.keys(obj).map((key) => {
    let val = obj[key];
    if (typeof val === void 0 || val === null) {
      val = "";
    } else if (isPlainObject$1(val)) {
      val = JSON.stringify(val);
    }
    return encodeStr(key) + "=" + encodeStr(val);
  }).filter((x) => x.length > 0).join("&") : null;
  return res ? `?${res}` : "";
}
const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_ADD_TO_FAVORITES,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW,
  ON_HIDE,
  ON_LAUNCH,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
  ON_EXIT,
  ON_INIT,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES,
  ON_SHARE_APP_MESSAGE,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /* @__PURE__ */ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2
  };
})();
function isUniLifecycleHook(name, value, checkType = true) {
  if (checkType && !isFunction(value)) {
    return false;
  }
  if (UniLifecycleHooks.indexOf(name) > -1) {
    return true;
  } else if (name.indexOf("on") === 0) {
    return true;
  }
  return false;
}
let vueApp;
const createVueAppHooks = [];
function onCreateVueApp(hook) {
  if (vueApp) {
    return hook(vueApp);
  }
  createVueAppHooks.push(hook);
}
function invokeCreateVueAppHook(app) {
  vueApp = app;
  createVueAppHooks.forEach((hook) => hook(app));
}
const invokeCreateErrorHandler = once((app, createErrorHandler2) => {
  if (isFunction(app._component.onError)) {
    return createErrorHandler2(app);
  }
});
const E = function() {
};
E.prototype = {
  on: function(name, callback, ctx) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback,
      ctx
    });
    return this;
  },
  once: function(name, callback, ctx) {
    var self2 = this;
    function listener() {
      self2.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;
    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }
    return this;
  },
  off: function(name, callback) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
var E$1 = E;
const isObject = (val) => val !== null && typeof val === "object";
const defaultDelimiters = ["{", "}"];
class BaseFormatter {
  constructor() {
    this._caches = /* @__PURE__ */ Object.create(null);
  }
  interpolate(message, values, delimiters = defaultDelimiters) {
    if (!values) {
      return [message];
    }
    let tokens = this._caches[message];
    if (!tokens) {
      tokens = parse(message, delimiters);
      this._caches[message] = tokens;
    }
    return compile$1(tokens, values);
  }
}
const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, [startDelimiter, endDelimiter]) {
  const tokens = [];
  let position = 0;
  let text = "";
  while (position < format.length) {
    let char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: "text", value: text });
      }
      text = "";
      let sub = "";
      char = format[position++];
      while (char !== void 0 && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      const isClosed = char === endDelimiter;
      const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
      tokens.push({ value: sub, type });
    } else {
      text += char;
    }
  }
  text && tokens.push({ type: "text", value: text });
  return tokens;
}
function compile$1(tokens, values) {
  const compiled = [];
  let index2 = 0;
  const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
  if (mode === "unknown") {
    return compiled;
  }
  while (index2 < tokens.length) {
    const token = tokens[index2];
    switch (token.type) {
      case "text":
        compiled.push(token.value);
        break;
      case "list":
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case "named":
        if (mode === "named") {
          compiled.push(values[token.value]);
        } else {
          {
            console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
          }
        }
        break;
      case "unknown":
        {
          console.warn(`Detect 'unknown' type of token!`);
        }
        break;
    }
    index2++;
  }
  return compiled;
}
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
const hasOwnProperty$2 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$2.call(val, key);
const defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, "-");
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf("zh") === 0) {
    if (locale.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  const lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
class I18n {
  constructor({ locale, fallbackLocale, messages, watcher, formater }) {
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  setLocale(locale) {
    const oldLocale = this.locale;
    this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
    if (!this.messages[this.locale]) {
      this.messages[this.locale] = {};
    }
    this.message = this.messages[this.locale];
    if (oldLocale !== this.locale) {
      this.watchers.forEach((watcher) => {
        watcher(this.locale, oldLocale);
      });
    }
  }
  getLocale() {
    return this.locale;
  }
  watchLocale(fn) {
    const index2 = this.watchers.push(fn) - 1;
    return () => {
      this.watchers.splice(index2, 1);
    };
  }
  add(locale, message, override = true) {
    const curMessages = this.messages[locale];
    if (curMessages) {
      if (override) {
        Object.assign(curMessages, message);
      } else {
        Object.keys(message).forEach((key) => {
          if (!hasOwn(curMessages, key)) {
            curMessages[key] = message[key];
          }
        });
      }
    } else {
      this.messages[locale] = message;
    }
  }
  f(message, values, delimiters) {
    return this.formater.interpolate(message, values, delimiters).join("");
  }
  t(key, locale, values) {
    let message = this.message;
    if (typeof locale === "string") {
      locale = normalizeLocale(locale, this.messages);
      locale && (message = this.messages[locale]);
    } else {
      values = locale;
    }
    if (!hasOwn(message, key)) {
      console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
      return key;
    }
    return this.formater.interpolate(message[key], values).join("");
  }
}
function watchAppLocale(appVm, i18n) {
  if (appVm.$watchLocale) {
    appVm.$watchLocale((newLocale) => {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(() => appVm.$locale, (newLocale) => {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof index$1 !== "undefined" && index$1.getLocale) {
    return index$1.getLocale();
  }
  if (typeof global !== "undefined" && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale, messages = {}, fallbackLocale, watcher) {
  if (typeof locale !== "string") {
    [locale, messages] = [
      messages,
      locale
    ];
  }
  if (typeof locale !== "string") {
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== "string") {
    fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  const i18n = new I18n({
    locale,
    fallbackLocale,
    messages,
    watcher
  });
  let t2 = (key, values) => {
    if (typeof getApp !== "function") {
      t2 = function(key2, values2) {
        return i18n.t(key2, values2);
      };
    } else {
      let isWatchedAppLocale = false;
      t2 = function(key2, values2) {
        const appVm = getApp().$vm;
        if (appVm) {
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key2, values2);
      };
    }
    return t2(key, values);
  };
  return {
    i18n,
    f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t(key, values) {
      return t2(key, values);
    },
    add(locale2, message, override = true) {
      return i18n.add(locale2, message, override);
    },
    watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale() {
      return i18n.getLocale();
    },
    setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
function getBaseSystemInfo() {
  return wx.getSystemInfoSync();
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key in protocol) {
    const errMsg = validateProp$1(key, data[key], protocol[key], !hasOwn$1(data, key));
    if (isString(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i = 0; i < len; i++) {
    const opts = protocol[i];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i) {
      data[opts.name] = args[i];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp$1(name, value, prop, isAbsent) {
  if (!isPlainObject$1(prop)) {
    prop = { type: prop };
  }
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required) {
    return;
  }
  if (type != null) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType$1(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage$1(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol");
function assertType$1(value, type) {
  let valid;
  const expectedType = getType$1(type);
  if (isSimpleType$1(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else {
    {
      valid = value instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType$1(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue$1(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
let invokeCallbackId = 1;
const invokeCallbacks = {};
function addInvokeCallback(id, name, callback, keepAlive = false) {
  invokeCallbacks[id] = {
    name,
    keepAlive,
    callback
  };
  return id;
}
function invokeCallback(id, res, extras) {
  if (typeof id === "number") {
    const opts = invokeCallbacks[id];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg$1(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!isPlainObject$1(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction(success);
  const hasFail = isFunction(fail);
  const hasComplete = isFunction(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg$1(res.errMsg, name);
    isFunction(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook, params) {
  return function(data) {
    return hook(data, params) || data;
  };
}
function queue$1(hooks, data, params) {
  let promise = false;
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      const res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors2[name];
    if (!isArray(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue$1(hooks, res, options).then((res2) => {
        return isFunction(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options, params) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray(interceptor.invoke)) {
      const res = queue$1(interceptor.invoke, options);
      return res.then((options2) => {
        return api(wrapperOptions(getApiInterceptorHooks(method), options2), ...params);
      });
    } else {
      return api(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api(options, ...params);
}
function hasCallback(args) {
  if (isPlainObject$1(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  return promise;
}
function promisify$1(name, fn) {
  return (args = {}, ...rest) => {
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, fn, extend(args, { success: resolve2, fail: reject }), rest);
    })));
  };
}
function formatApiArgs(args, options) {
  const params = args[0];
  if (!options || !isPlainObject$1(options.formatArgs) && isPlainObject$1(params)) {
    return;
  }
  const formatArgs = options.formatArgs;
  const keys = Object.keys(formatArgs);
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    const formatterOrDefaultValue = formatArgs[name];
    if (isFunction(formatterOrDefaultValue)) {
      const errMsg = formatterOrDefaultValue(args[0][name], params);
      if (isString(errMsg)) {
        return errMsg;
      }
    } else {
      if (!hasOwn$1(params, name)) {
        params[name] = formatterOrDefaultValue;
      }
    }
  }
}
function invokeSuccess(id, name, res) {
  return invokeCallback(id, extend(res || {}, { errMsg: name + ":ok" }));
}
function invokeFail(id, name, errMsg, errRes) {
  return invokeCallback(id, extend({ errMsg: name + ":fail" + (errMsg ? " " + errMsg : "") }, errRes));
}
function beforeInvokeApi(name, args, protocol, options) {
  {
    validateProtocols(name, args, protocol);
  }
  if (options && options.beforeInvoke) {
    const errMsg2 = options.beforeInvoke(args);
    if (isString(errMsg2)) {
      return errMsg2;
    }
  }
  const errMsg = formatApiArgs(args, options);
  if (errMsg) {
    return errMsg;
  }
}
function normalizeErrMsg(errMsg) {
  if (!errMsg || isString(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    console.error(errMsg.message + LINEFEED + errMsg.stack);
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    const id = createAsyncApiCallback(name, args, options);
    const errMsg = beforeInvokeApi(name, [args], protocol, options);
    if (errMsg) {
      return invokeFail(id, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id, name, res),
      reject: (errMsg2, errRes) => invokeFail(id, name, normalizeErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options) {
  return wrapperTaskApi(name, fn, protocol, options);
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, protocol, options);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify$1(name, wrapperAsyncApi(name, fn, protocol, options));
}
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  const { platform, pixelRatio, windowWidth } = getBaseSystemInfo();
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  let width = newDeviceWidth || deviceWidth;
  let result = number / BASE_DEVICE_WIDTH * width;
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}, Upx2pxProtocol);
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors2, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction(interceptor[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor) {
  if (!interceptors2 || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks = interceptors2[name];
    const hook = interceptor[name];
    if (isArray(hooks) && isFunction(hook)) {
      remove(hooks, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  const res = [];
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (isString(method) && isPlainObject$1(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject$1(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (isString(method)) {
    if (isPlainObject$1(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject$1(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}, RemoveInterceptorProtocol);
const interceptors = {};
const API_ON = "$on";
const OnProtocol = [
  {
    name: "event",
    type: String,
    required: true
  },
  {
    name: "callback",
    type: Function,
    required: true
  }
];
const API_ONCE = "$once";
const OnceProtocol = OnProtocol;
const API_OFF = "$off";
const OffProtocol = [
  {
    name: "event",
    type: [String, Array]
  },
  {
    name: "callback",
    type: Function
  }
];
const API_EMIT = "$emit";
const EmitProtocol = [
  {
    name: "event",
    type: String,
    required: true
  }
];
const emitter = new E$1();
const $on = defineSyncApi(API_ON, (name, callback) => {
  emitter.on(name, callback);
  return () => emitter.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
  emitter.once(name, callback);
  return () => emitter.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
  if (!name) {
    emitter.e = {};
    return;
  }
  if (!isArray(name))
    name = [name];
  name.forEach((n2) => emitter.off(n2, callback));
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
  emitter.emit(name, ...args);
}, EmitProtocol);
let cid;
let cidErrMsg;
let enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e2) {
  }
  return message;
}
function invokePushCallback(args) {
  if (args.type === "enabled") {
    enabled = true;
  } else if (args.type === "clientId") {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === "pushMsg") {
    const message = {
      type: "receive",
      data: normalizePushMessage(args.message)
    };
    for (let i = 0; i < onPushMessageCallbacks.length; i++) {
      const callback = onPushMessageCallbacks[i];
      callback(message);
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === "click") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: "click",
        data: normalizePushMessage(args.message)
      });
    });
  }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid2, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid2, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
const API_GET_PUSH_CLIENT_ID = "getPushClientId";
const getPushClientId = defineAsyncApi(API_GET_PUSH_CLIENT_ID, (_, { resolve: resolve2, reject }) => {
  Promise.resolve().then(() => {
    if (typeof enabled === "undefined") {
      enabled = false;
      cid = "";
      cidErrMsg = "uniPush is not enabled";
    }
    getPushCidCallbacks.push((cid2, errMsg) => {
      if (cid2) {
        resolve2({ cid: cid2 });
      } else {
        reject(errMsg);
      }
    });
    if (typeof cid !== "undefined") {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
});
const onPushMessageCallbacks = [];
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index2 = onPushMessageCallbacks.indexOf(fn);
    if (index2 > -1) {
      onPushMessageCallbacks.splice(index2, 1);
    }
  }
};
const SYNC_API_RE = /^\$|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo|getSystemSetting|getAppAuthorizeSetting/;
const CONTEXT_API_RE = /^create|Manager$/;
const CONTEXT_API_RE_EXC = ["createBLEConnection"];
const ASYNC_API = ["createBLEConnection"];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== "onPush";
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(onfinally) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(onfinally && onfinally()).then(() => value), (reason) => promise.resolve(onfinally && onfinally()).then(() => {
      throw reason;
    }));
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  if (!isFunction(api)) {
    return api;
  }
  return function promiseApi(options = {}, ...rest) {
    if (isFunction(options.success) || isFunction(options.fail) || isFunction(options.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, options, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, api, extend({}, options, {
        success: resolve2,
        fail: reject
      }), rest);
    })));
  };
}
const CALLBACKS = ["success", "fail", "cancel", "complete"];
function initWrapper(protocols2) {
  function processCallback(methodName, method, returnValue) {
    return function(res) {
      return method(processReturnValue(methodName, res, returnValue));
    };
  }
  function processArgs(methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
    if (isPlainObject$1(fromArgs)) {
      const toArgs = keepFromArgs === true ? fromArgs : {};
      if (isFunction(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {};
      }
      for (const key in fromArgs) {
        if (hasOwn$1(argsOption, key)) {
          let keyOption = argsOption[key];
          if (isFunction(keyOption)) {
            keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
          }
          if (!keyOption) {
            console.warn(`微信小程序 ${methodName} 暂不支持 ${key}`);
          } else if (isString(keyOption)) {
            toArgs[keyOption] = fromArgs[key];
          } else if (isPlainObject$1(keyOption)) {
            toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
          }
        } else if (CALLBACKS.indexOf(key) !== -1) {
          const callback = fromArgs[key];
          if (isFunction(callback)) {
            toArgs[key] = processCallback(methodName, callback, returnValue);
          }
        } else {
          if (!keepFromArgs && !hasOwn$1(toArgs, key)) {
            toArgs[key] = fromArgs[key];
          }
        }
      }
      return toArgs;
    } else if (isFunction(fromArgs)) {
      fromArgs = processCallback(methodName, fromArgs, returnValue);
    }
    return fromArgs;
  }
  function processReturnValue(methodName, res, returnValue, keepReturnValue = false) {
    if (isFunction(protocols2.returnValue)) {
      res = protocols2.returnValue(methodName, res);
    }
    return processArgs(methodName, res, returnValue, {}, keepReturnValue);
  }
  return function wrapper(methodName, method) {
    if (!hasOwn$1(protocols2, methodName)) {
      return method;
    }
    const protocol = protocols2[methodName];
    if (!protocol) {
      return function() {
        console.error(`微信小程序 暂不支持${methodName}`);
      };
    }
    return function(arg1, arg2) {
      let options = protocol;
      if (isFunction(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      const args = [arg1];
      if (typeof arg2 !== "undefined") {
        args.push(arg2);
      }
      const returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  };
}
const getLocale = () => {
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
};
const setLocale = (locale) => {
  const app = isFunction(getApp) && getApp();
  if (!app) {
    return false;
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale }));
    return true;
  }
  return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
};
if (typeof global !== "undefined") {
  global.getLocale = getLocale;
}
const UUID_KEY = "__DC_STAT_UUID";
let deviceId;
function useDeviceId(global2 = wx) {
  return function addDeviceId(_, toRes) {
    deviceId = deviceId || global2.getStorageSync(UUID_KEY);
    if (!deviceId) {
      deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
      wx.setStorage({
        key: UUID_KEY,
        data: deviceId
      });
    }
    toRes.deviceId = deviceId;
  };
}
function addSafeAreaInsets(fromRes, toRes) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea;
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(fromRes, toRes) {
  const { brand = "", model = "", system = "", language = "", theme, version: version2, platform, fontSizeSetting, SDKVersion, pixelRatio, deviceOrientation } = fromRes;
  let osName = "";
  let osVersion = "";
  {
    osName = system.split(" ")[0] || "";
    osVersion = system.split(" ")[1] || "";
  }
  let hostVersion = version2;
  let deviceType = getGetDeviceType(fromRes, model);
  let deviceBrand = getDeviceBrand(brand);
  let _hostName = getHostName(fromRes);
  let _deviceOrientation = deviceOrientation;
  let _devicePixelRatio = pixelRatio;
  let _SDKVersion = SDKVersion;
  const hostLanguage = language.replace(/_/g, "-");
  const parameters = {
    appId: "__UNI__395D91E",
    appName: "uniapp-vue3-ui",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.98",
    uniRuntimeVersion: "3.98",
    uniPlatform: "mp-weixin",
    deviceBrand,
    deviceModel: model,
    deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion,
    hostTheme: theme,
    hostVersion,
    hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: void 0,
    osTheme: void 0,
    ua: void 0,
    hostPackageName: void 0,
    browserName: void 0,
    browserVersion: void 0
  };
  extend(toRes, parameters);
}
function getGetDeviceType(fromRes, model) {
  let deviceType = fromRes.deviceType || "phone";
  {
    const deviceTypeMaps = {
      ipad: "pad",
      windows: "pc",
      mac: "pc"
    };
    const deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    const _model = model.toLocaleLowerCase();
    for (let index2 = 0; index2 < deviceTypeMapsKeys.length; index2++) {
      const _m = deviceTypeMapsKeys[index2];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  let deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = deviceBrand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale ? getLocale() : defaultLanguage;
}
function getHostName(fromRes) {
  const _platform = "WeChat";
  let _hostName = fromRes.hostName || _platform;
  {
    if (fromRes.environment) {
      _hostName = fromRes.environment;
    } else if (fromRes.host && fromRes.host.env) {
      _hostName = fromRes.host.env;
    }
  }
  return _hostName;
}
const getSystemInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    useDeviceId()(fromRes, toRes);
    populateParameters(fromRes, toRes);
  }
};
const getSystemInfoSync = getSystemInfo;
const redirectTo = {};
const previewImage = {
  args(fromArgs, toArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    const urls = fromArgs.urls;
    if (!isArray(urls)) {
      return;
    }
    const len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex];
      toArgs.urls = urls.filter((item, index2) => index2 < currentIndex ? item !== urls[currentIndex] : true);
    } else {
      toArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
const showActionSheet = {
  args(fromArgs, toArgs) {
    toArgs.alertText = fromArgs.title;
  }
};
const getDeviceInfo = {
  returnValue: (fromRes, toRes) => {
    const { brand, model } = fromRes;
    let deviceType = getGetDeviceType(fromRes, model);
    let deviceBrand = getDeviceBrand(brand);
    useDeviceId()(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      deviceType,
      deviceBrand,
      deviceModel: model
    }));
  }
};
const getAppBaseInfo = {
  returnValue: (fromRes, toRes) => {
    const { version: version2, language, SDKVersion, theme } = fromRes;
    let _hostName = getHostName(fromRes);
    let hostLanguage = language.replace(/_/g, "-");
    toRes = sortObject(extend(toRes, {
      hostVersion: version2,
      hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      appId: "__UNI__395D91E",
      appName: "uniapp-vue3-ui",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage)
    }));
  }
};
const getWindowInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
const getAppAuthorizeSetting = {
  returnValue: function(fromRes, toRes) {
    const { locationReducedAccuracy } = fromRes;
    toRes.locationAccuracy = "unsupported";
    if (locationReducedAccuracy === true) {
      toRes.locationAccuracy = "reduced";
    } else if (locationReducedAccuracy === false) {
      toRes.locationAccuracy = "full";
    }
  }
};
const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale,
  setLocale,
  onLocaleChange,
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback
};
function initUni(api, protocols2, platform = wx) {
  const wrapper = initWrapper(protocols2);
  const UniProxyHandlers = {
    get(target, key) {
      if (hasOwn$1(target, key)) {
        return target[key];
      }
      if (hasOwn$1(api, key)) {
        return promisify(key, api[key]);
      }
      if (hasOwn$1(baseApis, key)) {
        return promisify(key, baseApis[key]);
      }
      return promisify(key, wrapper(key, platform[key]));
    }
  };
  return new Proxy({}, UniProxyHandlers);
}
function initGetProvider(providers) {
  return function getProvider2({ service, success, fail, complete }) {
    let res;
    if (providers[service]) {
      res = {
        errMsg: "getProvider:ok",
        service,
        provider: providers[service]
      };
      isFunction(success) && success(res);
    } else {
      res = {
        errMsg: "getProvider:fail:服务[" + service + "]不存在"
      };
      isFunction(fail) && fail(res);
    }
    isFunction(complete) && complete(res);
  };
}
const objectKeys = [
  "qy",
  "env",
  "error",
  "version",
  "lanDebug",
  "cloud",
  "serviceMarket",
  "router",
  "worklet",
  "__webpack_require_UNI_MP_PLUGIN__"
];
const singlePageDisableKey = ["lanDebug", "router", "worklet"];
const launchOption = wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof wx[key] === "function";
}
function initWx() {
  const newWx = {};
  for (const key in wx) {
    if (isWxKey(key)) {
      newWx[key] = wx[key];
    }
  }
  if (typeof globalThis !== "undefined" && typeof requireMiniProgram === "undefined") {
    globalThis.wx = newWx;
  }
  return newWx;
}
const mocks$1 = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
const getProvider = initGetProvider({
  oauth: ["weixin"],
  share: ["weixin"],
  payment: ["wxpay"],
  push: ["weixin"]
});
function initComponentMocks(component) {
  const res = /* @__PURE__ */ Object.create(null);
  mocks$1.forEach((name) => {
    res[name] = component[name];
  });
  return res;
}
function createSelectorQuery() {
  const query = wx$2.createSelectorQuery();
  const oldIn = query.in;
  query.in = function newIn(component) {
    return oldIn.call(this, initComponentMocks(component));
  };
  return query;
}
const wx$2 = initWx();
let baseInfo = wx$2.getAppBaseInfo && wx$2.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx$2.getSystemInfoSync();
}
const host = baseInfo ? baseInfo.host : null;
const shareVideoMessage = host && host.env === "SAAASDK" ? wx$2.miniapp.shareVideoMessage : wx$2.shareVideoMessage;
var shims = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createSelectorQuery,
  getProvider,
  shareVideoMessage
});
const compressImage = {
  args(fromArgs, toArgs) {
    if (fromArgs.compressedHeight && !toArgs.compressHeight) {
      toArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !toArgs.compressWidth) {
      toArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  compressImage,
  getAppAuthorizeSetting,
  getAppBaseInfo,
  getDeviceInfo,
  getSystemInfo,
  getSystemInfoSync,
  getWindowInfo,
  previewImage,
  redirectTo,
  showActionSheet
});
const wx$1 = initWx();
var index$1 = initUni(shims, protocols, wx$1);
function warn$1(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$1(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(fn) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  } else {
    warn$1(`onScopeDispose() is called when there is no active effect scope to be associated with.`);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    const eventInfo = { effect: activeEffect, target, type, key };
    trackEffects(dep, eventInfo);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.onTrack) {
      activeEffect.onTrack(Object.assign({ effect: activeEffect }, debuggerEventExtraInfo));
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const eventInfo = { target, type, key, newValue, oldValue, oldTarget };
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0], eventInfo);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects), eventInfo);
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray(dep) ? dep : [...dep];
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
}
function triggerEffect(effect, debuggerEventExtraInfo) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (effect.onTrigger) {
      effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
    }
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
function getDepFromReactive(object, key) {
  var _a2;
  return (_a2 = targetMap.get(object)) === null || _a2 === void 0 ? void 0 : _a2.get(key);
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const get$1 = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty$1(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn$1(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty$1;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set$1 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow) {
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn$1(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn$1(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function has$1(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get: get$1,
  set: set$1,
  deleteProperty,
  has: has$1,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    {
      warn$1(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key) {
    {
      warn$1(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const shallowReadonlyHandlers = /* @__PURE__ */ extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
});
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly2 = false) {
  const target = this[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$2(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set: set$2,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set: set$2,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn$1(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ] && !(isReadonly2 && target[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ]);
  }
  return !!(value && value[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ]);
}
function isReadonly(value) {
  return !!(value && value[
    "__v_isReadonly"
    /* ReactiveFlags.IS_READONLY */
  ]);
}
function isShallow(value) {
  return !!(value && value[
    "__v_isShallow"
    /* ReactiveFlags.IS_SHALLOW */
  ]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()), {
        target: ref2,
        type: "get",
        key: "value"
      });
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    {
      triggerEffects(dep, {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      });
    }
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
function toRefs(object) {
  if (!isProxy(object)) {
    console.warn(`toRefs() expects a reactive object but received a plain one.`);
  }
  const ret = isArray(object) ? new Array(object.length) : {};
  for (const key in object) {
    ret[key] = toRef(object, key);
  }
  return ret;
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }
  get value() {
    const val = this._object[this._key];
    return val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
  get dep() {
    return getDepFromReactive(toRaw(this._object), this._key);
  }
}
function toRef(object, key, defaultValue) {
  const val = object[key];
  return isRef(val) ? val : new ObjectRefImpl(object, key, defaultValue);
}
var _a;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this[_a] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this[
      "__v_isReadonly"
      /* ReactiveFlags.IS_READONLY */
    ] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
_a = "__v_isReadonly";
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      console.warn("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      msg + args.join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  [
    "sp"
    /* LifecycleHooks.SERVER_PREFETCH */
  ]: "serverPrefetch hook",
  [
    "bc"
    /* LifecycleHooks.BEFORE_CREATE */
  ]: "beforeCreate hook",
  [
    "c"
    /* LifecycleHooks.CREATED */
  ]: "created hook",
  [
    "bm"
    /* LifecycleHooks.BEFORE_MOUNT */
  ]: "beforeMount hook",
  [
    "m"
    /* LifecycleHooks.MOUNTED */
  ]: "mounted hook",
  [
    "bu"
    /* LifecycleHooks.BEFORE_UPDATE */
  ]: "beforeUpdate hook",
  [
    "u"
    /* LifecycleHooks.UPDATED */
  ]: "updated",
  [
    "bum"
    /* LifecycleHooks.BEFORE_UNMOUNT */
  ]: "beforeUnmount hook",
  [
    "um"
    /* LifecycleHooks.UNMOUNTED */
  ]: "unmounted hook",
  [
    "a"
    /* LifecycleHooks.ACTIVATED */
  ]: "activated hook",
  [
    "da"
    /* LifecycleHooks.DEACTIVATED */
  ]: "deactivated hook",
  [
    "ec"
    /* LifecycleHooks.ERROR_CAPTURED */
  ]: "errorCaptured hook",
  [
    "rtc"
    /* LifecycleHooks.RENDER_TRACKED */
  ]: "renderTracked hook",
  [
    "rtg"
    /* LifecycleHooks.RENDER_TRIGGERED */
  ]: "renderTriggered hook",
  [
    0
    /* ErrorCodes.SETUP_FUNCTION */
  ]: "setup function",
  [
    1
    /* ErrorCodes.RENDER_FUNCTION */
  ]: "render function",
  [
    2
    /* ErrorCodes.WATCH_GETTER */
  ]: "watcher getter",
  [
    3
    /* ErrorCodes.WATCH_CALLBACK */
  ]: "watcher callback",
  [
    4
    /* ErrorCodes.WATCH_CLEANUP */
  ]: "watcher cleanup function",
  [
    5
    /* ErrorCodes.NATIVE_EVENT_HANDLER */
  ]: "native event handler",
  [
    6
    /* ErrorCodes.COMPONENT_EVENT_HANDLER */
  ]: "component event handler",
  [
    7
    /* ErrorCodes.VNODE_HOOK */
  ]: "vnode hook",
  [
    8
    /* ErrorCodes.DIRECTIVE_HOOK */
  ]: "directive hook",
  [
    9
    /* ErrorCodes.TRANSITION_HOOK */
  ]: "transition hook",
  [
    10
    /* ErrorCodes.APP_ERROR_HANDLER */
  ]: "app errorHandler",
  [
    11
    /* ErrorCodes.APP_WARN_HANDLER */
  ]: "app warnHandler",
  [
    12
    /* ErrorCodes.FUNCTION_REF */
  ]: "ref function",
  [
    13
    /* ErrorCodes.ASYNC_COMPONENT_LOADER */
  ]: "async component loader",
  [
    14
    /* ErrorCodes.SCHEDULER */
  ]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type] || type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type] || type;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick$1(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function hasQueueJob(job) {
  return queue.indexOf(job) > -1;
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(seen, i = isFlushing ? flushIndex + 1 : 0) {
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.pre) {
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff2 = getId(a) - getId(b);
  if (diff2 === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff2;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue.sort(comparator);
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(
          job,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      warn(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
let devtools;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$1(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a2, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    // eslint-disable-next-line no-restricted-globals
    window.HTMLElement && // also exclude jsdom
    // eslint-disable-next-line no-restricted-globals
    !((_b = (_a2 = window.navigator) === null || _a2 === void 0 ? void 0 : _a2.userAgent) === null || _b === void 0 ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit$1("app:init", app, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* DevtoolsHooks.COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* DevtoolsHooks.COMPONENT_UPDATED */
);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* DevtoolsHooks.COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools && typeof devtools.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1(
      hook,
      component.appContext.app,
      component.uid,
      // fixed by xxxxxx
      // 为 0 是 App，无 parent 是 Page 指向 App
      component.uid === 0 ? void 0 : component.parent ? component.parent.uid : 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start"
  /* DevtoolsHooks.PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end"
  /* DevtoolsHooks.PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$1("component:emit", component.appContext.app, component, event, params);
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const { emitsOptions, propsOptions: [propsOptions] } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`);
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn(`Invalid event arguments: event validation failed for event "${event}".`);
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject$1(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn$1(options, key[0].toLowerCase() + key.slice(1)) || hasOwn$1(options, hyphenate(key)) || hasOwn$1(options, key);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  instance && instance.type.__scopeId || null;
  return prev;
}
function provide(key, value) {
  if (!currentInstance) {
    {
      warn(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key, value);
    }
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else {
      warn(`injection "${String(key)}" not found.`);
    }
  } else {
    warn(`inject() can only be used inside setup() or functional components.`);
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  if (!cb) {
    if (immediate !== void 0) {
      warn(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (deep !== void 0) {
      warn(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
    }
  }
  const warnInvalidSource = (s2) => {
    warn(`Invalid watch source: `, s2, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
  };
  const instance = getCurrentScope() === (currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.scope) ? currentInstance : null;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s2) => isReactive(s2) || isShallow(s2));
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return traverse(s2);
      } else if (isFunction(s2)) {
        return callWithErrorHandling(
          s2,
          instance,
          2
          /* ErrorCodes.WATCH_GETTER */
        );
      } else {
        warnInvalidSource(s2);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(
        source,
        instance,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(
        fn,
        instance,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  };
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect$1(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect = new ReactiveEffect(getter, scheduler);
  {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect$1(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  const unwatch = () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject$1(value) || value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject$1(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type)) {
      target = target.root;
    }
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey((ErrorTypeStrings[type] || type.replace(/^on/, "")).replace(/ hook$/, ""));
    warn(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().`);
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
);
const onMounted = createHook(
  "m"
  /* LifecycleHooks.MOUNTED */
);
const onBeforeUpdate = createHook(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
);
const onUpdated = createHook(
  "u"
  /* LifecycleHooks.UPDATED */
);
const onBeforeUnmount = createHook(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
);
const onUnmounted = createHook(
  "um"
  /* LifecycleHooks.UNMOUNTED */
);
const onServerPrefetch = createHook(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
);
const onRenderTriggered = createHook(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
);
const onRenderTracked = createHook(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn("Do not use built-in directive ids as custom directive id: " + name);
  }
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component2 = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component2,
        false
        /* do not include inferred name to avoid breaking existing code */
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component2;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component2[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component2;
    }
    if (warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn(`resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`);
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    // fixed by xxxxxx vue-i18n 在 dev 模式，访问了 $el，故模拟一个假的
    // $el: i => i.vnode.el,
    $el: (i) => i.__$el || (i.__$el = {}),
    $data: (i) => i.data,
    $props: (i) => shallowReadonly(i.props),
    $attrs: (i) => shallowReadonly(i.attrs),
    $slots: (i) => shallowReadonly(i.slots),
    $refs: (i) => shallowReadonly(i.refs),
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
    // $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy!)),// fixed by xxxxxx
    $watch: (i) => instanceWatch.bind(i)
  })
);
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn$1(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn$1(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn$1(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn$1(data, key)) {
        warn(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
      } else if (instance === currentRenderingInstance) {
        warn(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn$1(setupState, key)) {
      warn(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn$1(instance.props, key)) {
      warn(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`);
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn$1(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn$1(normalizedProps, key) || hasOwn$1(ctx, key) || hasOwn$1(publicPropertiesMap, key) || hasOwn$1(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn$1(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const { ctx, propsOptions: [propsOptions] } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(
      options.beforeCreate,
      instance,
      "bc"
      /* LifecycleHooks.BEFORE_CREATE */
    );
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn(`The data option must be a function. Plain object usage is no longer supported.`);
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
    }
    if (!isObject$1(data)) {
      warn(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn(`Write operation failed: computed property "${key}" is readonly.`);
      };
      const c = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  {
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
  }
  {
    if (created) {
      callHook$1(
        created,
        instance,
        "c"
        /* LifecycleHooks.CREATED */
      );
    }
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
  if (instance.ctx.$onApplyOptions) {
    instance.ctx.$onApplyOptions(options, instance, publicThis);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
          /* treat default function as factory */
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        {
          warn(`injected property "${key}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
        }
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else {
        warn(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject$1(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray$1(to[key], from[key]);
  }
  return merged;
}
function initProps$1(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
  while (instance) {
    if (instance.type.__hmrId)
      return true;
    instance = instance.parent;
  }
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn$1(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
              /* isAbsent */
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn$1(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn$1(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
              /* isAbsent */
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn$1(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn$1(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn$1(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn$1(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* BooleanFlags.shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* BooleanFlags.shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (!isString(raw[i])) {
        warn(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject$1(raw)) {
      warn(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : Object.assign({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* BooleanFlags.shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn$1(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$1(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  } else {
    warn(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
  return match ? match[2] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(key, resolvedValues[key], opt, !hasOwn$1(rawProps, key) && !hasOwn$1(rawProps, hyphenate(key)));
  }
}
function validateProp(name, value, prop, isAbsent) {
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    warn('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  if (type != null && type !== true) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value)) {
    warn('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      warn(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
        {
          warn(`app.config cannot be replaced. Modify individual options instead.`);
        }
      },
      use(plugin2, ...options) {
        if (installedPlugins.has(plugin2)) {
          warn(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options);
        } else if (isFunction(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options);
        } else {
          warn(`A plugin must either be a function or an object with an "install" function.`);
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      // fixed by xxxxxx
      mount() {
      },
      // fixed by xxxxxx
      unmount() {
      },
      provide(key, value) {
        if (key in context.provides) {
          warn(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
        }
        context.provides[key] = value;
        return app;
      }
    };
    return app;
  };
}
let supported;
let perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}
const queuePostRenderEffect$1 = queuePostFlushCb;
const Fragment = Symbol("Fragment");
const Text = Symbol("Text");
const Comment = Symbol("Comment");
const Static = Symbol("Static");
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const InternalObjectKey = `__vInternal`;
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, config) {
  const appIsNativeTag = config.isNativeTag || NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn("Do not use built-in or reserved HTML elements as component id: " + name);
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const {
    props
    /*, children*/
  } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps$1(instance, props, isStateful, isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component2 = instance.type;
  {
    if (Component2.name) {
      validateComponentName(Component2.name, instance.appContext.config);
    }
    if (Component2.components) {
      const names = Object.keys(Component2.components);
      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }
    if (Component2.directives) {
      const names = Object.keys(Component2.directives);
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i]);
      }
    }
    if (Component2.compilerOptions && isRuntimeOnly()) {
      warn(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component2;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [shallowReadonly(instance.props), setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      {
        warn(`setup() returned a Promise, but the version of Vue you are using does not support it yet.`);
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    if (isVNode(setupResult)) {
      warn(`setup() should not return VNodes directly - return a render function instead.`);
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component2 = instance.type;
  if (!instance.render) {
    instance.render = Component2.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions$1(instance);
    resetTracking();
    unsetCurrentInstance();
  }
  if (!Component2.render && instance.render === NOOP && !isSSR) {
    if (Component2.template) {
      warn(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
        /* should not happen */
      );
    } else {
      warn(`Component is missing template or render function.`);
    }
  }
}
function createAttrsProxy(instance) {
  return new Proxy(
    instance.attrs,
    {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  );
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    {
      if (instance.exposed) {
        warn(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray(exposed)) {
            exposedType = "array";
          } else if (isRef(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn(`expose() should be passed a plain object, received ${exposedType}.`);
        }
      }
    }
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return Object.freeze({
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      get slots() {
        return shallowReadonly(instance.slots);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        }
        return instance.proxy[key];
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component2, includeInferred = true) {
  return isFunction(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName(instance, Component2, isRoot = false) {
  let name = getComponentName(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component2) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
const version = "3.2.47";
function unwrapper(target) {
  return unref(target);
}
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
function diff(current, pre) {
  const result = {};
  syncKeys(current, pre);
  _diff(current, pre, "", result);
  return result;
}
function syncKeys(current, pre) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key in pre) {
      const currentValue = current[key];
      if (currentValue === void 0) {
        current[key] = null;
      } else {
        syncKeys(currentValue, pre[key]);
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index2) => {
        syncKeys(current[index2], item);
      });
    }
  }
}
function _diff(current, pre, path, result) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
      setResult(result, path, current);
    } else {
      for (let key in current) {
        const currentValue = unwrapper(current[key]);
        const preValue = pre[key];
        const currentType = toTypeString(currentValue);
        const preType = toTypeString(preValue);
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != preValue) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          } else {
            if (currentValue.length < preValue.length) {
              setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
            } else {
              currentValue.forEach((item, index2) => {
                _diff(item, preValue[index2], (path == "" ? "" : path + ".") + key + "[" + index2 + "]", result);
              });
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          } else {
            for (let subKey in currentValue) {
              _diff(currentValue[subKey], preValue[subKey], (path == "" ? "" : path + ".") + key + "." + subKey, result);
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current);
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current);
      } else {
        current.forEach((item, index2) => {
          _diff(item, pre[index2], path + "[" + index2 + "]", result);
        });
      }
    }
  } else {
    setResult(result, path, current);
  }
}
function setResult(result, k, v) {
  result[k] = v;
}
function hasComponentEffect(instance) {
  return queue.includes(instance.update);
}
function flushCallbacks(instance) {
  const ctx = instance.ctx;
  const callbacks = ctx.__next_tick_callbacks;
  if (callbacks && callbacks.length) {
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }
}
function nextTick(instance, fn) {
  const ctx = instance.ctx;
  if (!ctx.__next_tick_pending && !hasComponentEffect(instance)) {
    return nextTick$1(fn && fn.bind(instance.proxy));
  }
  let _resolve;
  if (!ctx.__next_tick_callbacks) {
    ctx.__next_tick_callbacks = [];
  }
  ctx.__next_tick_callbacks.push(() => {
    if (fn) {
      callWithErrorHandling(
        fn.bind(instance.proxy),
        instance,
        14
        /* ErrorCodes.SCHEDULER */
      );
    } else if (_resolve) {
      _resolve(instance.proxy);
    }
  });
  return new Promise((resolve2) => {
    _resolve = resolve2;
  });
}
function clone(src, seen) {
  src = unwrapper(src);
  const type = typeof src;
  if (type === "object" && src !== null) {
    let copy = seen.get(src);
    if (typeof copy !== "undefined") {
      return copy;
    }
    if (isArray(src)) {
      const len = src.length;
      copy = new Array(len);
      seen.set(src, copy);
      for (let i = 0; i < len; i++) {
        copy[i] = clone(src[i], seen);
      }
    } else {
      copy = {};
      seen.set(src, copy);
      for (const name in src) {
        if (hasOwn$1(src, name)) {
          copy[name] = clone(src[name], seen);
        }
      }
    }
    return copy;
  }
  if (type !== "symbol") {
    return src;
  }
}
function deepCopy(src) {
  return clone(src, typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map());
}
function getMPInstanceData(instance, keys) {
  const data = instance.data;
  const ret = /* @__PURE__ */ Object.create(null);
  keys.forEach((key) => {
    ret[key] = data[key];
  });
  return ret;
}
function patch(instance, data, oldData) {
  if (!data) {
    return;
  }
  data = deepCopy(data);
  const ctx = instance.ctx;
  const mpType = ctx.mpType;
  if (mpType === "page" || mpType === "component") {
    data.r0 = 1;
    const mpInstance = ctx.$scope;
    const keys = Object.keys(data);
    const diffData = diff(data, oldData || getMPInstanceData(mpInstance, keys));
    if (Object.keys(diffData).length) {
      ctx.__next_tick_pending = true;
      mpInstance.setData(diffData, () => {
        ctx.__next_tick_pending = false;
        flushCallbacks(instance);
      });
      flushPreFlushCbs();
    } else {
      flushCallbacks(instance);
    }
  }
}
function initAppConfig(appConfig) {
  appConfig.globalProperties.$nextTick = function $nextTick(fn) {
    return nextTick(this.$, fn);
  };
}
function onApplyOptions(options, instance, publicThis) {
  instance.appContext.config.globalProperties.$applyOptions(options, instance, publicThis);
  const computedOptions = options.computed;
  if (computedOptions) {
    const keys = Object.keys(computedOptions);
    if (keys.length) {
      const ctx = instance.ctx;
      if (!ctx.$computedKeys) {
        ctx.$computedKeys = [];
      }
      ctx.$computedKeys.push(...keys);
    }
  }
  delete instance.ctx.$onApplyOptions;
}
function setRef$1(instance, isUnmount = false) {
  const { setupState, $templateRefs, ctx: { $scope, $mpPlatform } } = instance;
  if ($mpPlatform === "mp-alipay") {
    return;
  }
  if (!$templateRefs || !$scope) {
    return;
  }
  if (isUnmount) {
    return $templateRefs.forEach((templateRef) => setTemplateRef(templateRef, null, setupState));
  }
  const check = $mpPlatform === "mp-baidu" || $mpPlatform === "mp-toutiao";
  const doSetByRefs = (refs) => {
    const mpComponents = (
      // 字节小程序 selectAllComponents 可能返回 null
      // https://github.com/dcloudio/uni-app/issues/3954
      ($scope.selectAllComponents(".r") || []).concat($scope.selectAllComponents(".r-i-f") || [])
    );
    return refs.filter((templateRef) => {
      const refValue = findComponentPublicInstance(mpComponents, templateRef.i);
      if (check && refValue === null) {
        return true;
      }
      setTemplateRef(templateRef, refValue, setupState);
      return false;
    });
  };
  const doSet = () => {
    const refs = doSetByRefs($templateRefs);
    if (refs.length && instance.proxy && instance.proxy.$scope) {
      instance.proxy.$scope.setData({ r1: 1 }, () => {
        doSetByRefs(refs);
      });
    }
  };
  if ($scope._$setRef) {
    $scope._$setRef(doSet);
  } else {
    nextTick(instance, doSet);
  }
}
function toSkip(value) {
  if (isObject$1(value)) {
    markRaw(value);
  }
  return value;
}
function findComponentPublicInstance(mpComponents, id) {
  const mpInstance = mpComponents.find((com) => com && (com.properties || com.props).uI === id);
  if (mpInstance) {
    const vm = mpInstance.$vm;
    if (vm) {
      return getExposeProxy(vm.$) || vm;
    }
    return toSkip(mpInstance);
  }
  return null;
}
function setTemplateRef({ r, f: f2 }, refValue, setupState) {
  if (isFunction(r)) {
    r(refValue, {});
  } else {
    const _isString = isString(r);
    const _isRef = isRef(r);
    if (_isString || _isRef) {
      if (f2) {
        if (!_isRef) {
          return;
        }
        if (!isArray(r.value)) {
          r.value = [];
        }
        const existing = r.value;
        if (existing.indexOf(refValue) === -1) {
          existing.push(refValue);
          if (!refValue) {
            return;
          }
          onBeforeUnmount(() => remove(existing, refValue), refValue.$);
        }
      } else if (_isString) {
        if (hasOwn$1(setupState, r)) {
          setupState[r] = refValue;
        }
      } else if (isRef(r)) {
        r.value = refValue;
      } else {
        warnRef(r);
      }
    } else {
      warnRef(r);
    }
  }
}
function warnRef(ref2) {
  warn("Invalid template ref type:", ref2, `(${typeof ref2})`);
}
var MPType;
(function(MPType2) {
  MPType2["APP"] = "app";
  MPType2["PAGE"] = "page";
  MPType2["COMPONENT"] = "component";
})(MPType || (MPType = {}));
const queuePostRenderEffect = queuePostFlushCb;
function mountComponent(initialVNode, options) {
  const instance = initialVNode.component = createComponentInstance(initialVNode, options.parentComponent, null);
  {
    instance.ctx.$onApplyOptions = onApplyOptions;
    instance.ctx.$children = [];
  }
  if (options.mpType === "app") {
    instance.render = NOOP;
  }
  if (options.onBeforeSetup) {
    options.onBeforeSetup(instance, options);
  }
  {
    pushWarningContext(initialVNode);
    startMeasure(instance, `mount`);
  }
  {
    startMeasure(instance, `init`);
  }
  setupComponent(instance);
  {
    endMeasure(instance, `init`);
  }
  {
    if (options.parentComponent && instance.proxy) {
      options.parentComponent.ctx.$children.push(getExposeProxy(instance) || instance.proxy);
    }
  }
  setupRenderEffect(instance);
  {
    popWarningContext();
    endMeasure(instance, `mount`);
  }
  return instance.proxy;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
function renderComponentRoot(instance) {
  const { type: Component2, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx, uid: uid2, appContext: { app: { config: { globalProperties: { pruneComponentPropsCache: pruneComponentPropsCache2 } } } }, inheritAttrs } = instance;
  instance.$templateRefs = [];
  instance.$ei = 0;
  pruneComponentPropsCache2(uid2);
  instance.__counter = instance.__counter === 0 ? 1 : 0;
  let result;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      fallthroughAttrs(inheritAttrs, props, propsOptions, attrs);
      const proxyToUse = withProxy || proxy;
      result = render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx);
    } else {
      fallthroughAttrs(inheritAttrs, props, propsOptions, Component2.props ? attrs : getFunctionalFallthrough(attrs));
      const render2 = Component2;
      result = render2.length > 1 ? render2(props, { attrs, slots, emit: emit2 }) : render2(
        props,
        null
        /* we know it doesn't need it */
      );
    }
  } catch (err) {
    handleError(
      err,
      instance,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    );
    result = false;
  }
  setRef$1(instance);
  setCurrentRenderingInstance(prev);
  return result;
}
function fallthroughAttrs(inheritAttrs, props, propsOptions, fallthroughAttrs2) {
  if (props && fallthroughAttrs2 && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs2).filter((key) => key !== "class" && key !== "style");
    if (!keys.length) {
      return;
    }
    if (propsOptions && keys.some(isModelListener)) {
      keys.forEach((key) => {
        if (!isModelListener(key) || !(key.slice(9) in propsOptions)) {
          props[key] = fallthroughAttrs2[key];
        }
      });
    } else {
      keys.forEach((key) => props[key] = fallthroughAttrs2[key]);
    }
  }
}
const updateComponentPreRender = (instance) => {
  pauseTracking();
  flushPreFlushCbs();
  resetTracking();
};
function componentUpdateScopedSlotsFn() {
  const scopedSlotsData = this.$scopedSlotsData;
  if (!scopedSlotsData || scopedSlotsData.length === 0) {
    return;
  }
  const mpInstance = this.ctx.$scope;
  const oldData = mpInstance.data;
  const diffData = /* @__PURE__ */ Object.create(null);
  scopedSlotsData.forEach(({ path, index: index2, data }) => {
    const oldScopedSlotData = getValueByDataPath(oldData, path);
    const diffPath = isString(index2) ? `${path}.${index2}` : `${path}[${index2}]`;
    if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
      diffData[diffPath] = data;
    } else {
      const diffScopedSlotData = diff(data, oldScopedSlotData[index2]);
      Object.keys(diffScopedSlotData).forEach((name) => {
        diffData[diffPath + "." + name] = diffScopedSlotData[name];
      });
    }
  });
  scopedSlotsData.length = 0;
  if (Object.keys(diffData).length) {
    mpInstance.setData(diffData);
  }
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function setupRenderEffect(instance) {
  const updateScopedSlots = componentUpdateScopedSlotsFn.bind(instance);
  instance.$updateScopedSlots = () => nextTick$1(() => queueJob(updateScopedSlots));
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      onBeforeUnmount(() => {
        setRef$1(instance, true);
      }, instance);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      {
        devtoolsComponentAdded(instance);
      }
    } else {
      const { next, bu, u } = instance;
      {
        pushWarningContext(next || instance.vnode);
      }
      toggleRecurse(instance, false);
      updateComponentPreRender();
      if (bu) {
        invokeArrayFns$1(bu);
      }
      toggleRecurse(instance, true);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      if (u) {
        queuePostRenderEffect(u);
      }
      {
        devtoolsComponentUpdated(instance);
      }
      {
        popWarningContext();
      }
    }
  };
  const effect = instance.effect = new ReactiveEffect(
    componentUpdateFn,
    () => queueJob(instance.update),
    instance.scope
    // track it in component's effect scope
  );
  const update = instance.update = effect.run.bind(effect);
  update.id = instance.uid;
  toggleRecurse(instance, true);
  {
    effect.onTrack = instance.rtc ? (e2) => invokeArrayFns$1(instance.rtc, e2) : void 0;
    effect.onTrigger = instance.rtg ? (e2) => invokeArrayFns$1(instance.rtg, e2) : void 0;
    update.ownerInstance = instance;
  }
  update();
}
function unmountComponent(instance) {
  const { bum, scope, update, um } = instance;
  if (bum) {
    invokeArrayFns$1(bum);
  }
  scope.stop();
  if (update) {
    update.active = false;
  }
  if (um) {
    queuePostRenderEffect(um);
  }
  queuePostRenderEffect(() => {
    instance.isUnmounted = true;
  });
  {
    devtoolsComponentRemoved(instance);
  }
}
const oldCreateApp = createAppAPI();
function getTarget() {
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof my !== "undefined") {
    return my;
  }
}
function createVueApp(rootComponent, rootProps = null) {
  const target = getTarget();
  target.__VUE__ = true;
  {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const app = oldCreateApp(rootComponent, rootProps);
  const appContext = app._context;
  initAppConfig(appContext.config);
  const createVNode = (initialVNode) => {
    initialVNode.appContext = appContext;
    initialVNode.shapeFlag = 6;
    return initialVNode;
  };
  const createComponent2 = function createComponent3(initialVNode, options) {
    return mountComponent(createVNode(initialVNode), options);
  };
  const destroyComponent = function destroyComponent2(component) {
    return component && unmountComponent(component.$);
  };
  app.mount = function mount() {
    rootComponent.render = NOOP;
    const instance = mountComponent(createVNode({ type: rootComponent }), {
      mpType: MPType.APP,
      mpInstance: null,
      parentComponent: null,
      slots: [],
      props: null
    });
    app._instance = instance.$;
    {
      devtoolsInitApp(app, version);
    }
    instance.$app = app;
    instance.$createComponent = createComponent2;
    instance.$destroyComponent = destroyComponent;
    appContext.$appInstance = instance;
    return instance;
  };
  app.unmount = function unmount() {
    warn(`Cannot unmount an app.`);
  };
  return app;
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (isFunction(hook)) {
    injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks$1(options, instance, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType || mpType === "component") {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (isUniLifecycleHook(name, options[name], false)) {
      const hooks = options[name];
      if (isArray(hooks)) {
        hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance);
      }
    }
  });
}
function applyOptions$2(options, instance, publicThis) {
  initHooks$1(options, instance, publicThis);
}
function set$3(target, key, val) {
  return target[key] = val;
}
function $callMethod(method, ...args) {
  const fn = this[method];
  if (fn) {
    return fn(...args);
  }
  console.error(`method ${method} not found`);
  return null;
}
function createErrorHandler(app) {
  return function errorHandler(err, instance, _info) {
    if (!instance) {
      throw err;
    }
    const appInstance = app._instance;
    if (!appInstance || !appInstance.proxy) {
      throw err;
    }
    {
      appInstance.proxy.$callHook(ON_ERROR, err);
    }
  };
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function getCurrentUserInfo() {
  const token = index$1.getStorageSync("uni_id_token") || "";
  const tokenArr = token.split(".");
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app._context.config;
  appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler);
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    uniIdMixin(globalProperties);
  }
  {
    globalProperties.$set = set$3;
    globalProperties.$applyOptions = applyOptions$2;
    globalProperties.$callMethod = $callMethod;
  }
  {
    index$1.invokeCreateVueAppHook(app);
  }
}
const propsCaches = /* @__PURE__ */ Object.create(null);
function renderProps(props) {
  const { uid: uid2, __counter } = getCurrentInstance();
  const propsId = (propsCaches[uid2] || (propsCaches[uid2] = [])).push(guardReactiveProps(props)) - 1;
  return uid2 + "," + propsId + "," + __counter;
}
function pruneComponentPropsCache(uid2) {
  delete propsCaches[uid2];
}
function findComponentPropsData(up) {
  if (!up) {
    return;
  }
  const [uid2, propsId] = up.split(",");
  if (!propsCaches[uid2]) {
    return;
  }
  return propsCaches[uid2][parseInt(propsId)];
}
var plugin = {
  install(app) {
    initApp(app);
    app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
    const oldMount = app.mount;
    app.mount = function mount(rootContainer) {
      const instance = oldMount.call(app, rootContainer);
      const createApp2 = getCreateApp();
      if (createApp2) {
        createApp2(instance);
      } else {
        if (typeof createMiniProgramApp !== "undefined") {
          createMiniProgramApp(instance);
        }
      }
      return instance;
    };
  }
};
function getCreateApp() {
  const method = "createApp";
  if (typeof global !== "undefined") {
    return global[method];
  } else if (typeof my !== "undefined") {
    return my[method];
  }
}
function vOn(value, key) {
  const instance = getCurrentInstance();
  const ctx = instance.ctx;
  const extraKey = typeof key !== "undefined" && (ctx.$mpPlatform === "mp-weixin" || ctx.$mpPlatform === "mp-qq") && (isString(key) || typeof key === "number") ? "_" + key : "";
  const name = "e" + instance.$ei++ + extraKey;
  const mpInstance = ctx.$scope;
  if (!value) {
    delete mpInstance[name];
    return name;
  }
  const existingInvoker = mpInstance[name];
  if (existingInvoker) {
    existingInvoker.value = value;
  } else {
    mpInstance[name] = createInvoker(value, instance);
  }
  return name;
}
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    patchMPEvent(e2);
    let args = [e2];
    if (e2.detail && e2.detail.__args__) {
      args = e2.detail.__args__;
    }
    const eventValue = invoker.value;
    const invoke = () => callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, eventValue), instance, 5, args);
    const eventTarget = e2.target;
    const eventSync = eventTarget ? eventTarget.dataset ? String(eventTarget.dataset.eventsync) === "true" : false : false;
    if (bubbles.includes(e2.type) && !eventSync) {
      setTimeout(invoke);
    } else {
      const res = invoke();
      if (e2.type === "input" && (isArray(res) || isPromise(res))) {
        return;
      }
      return res;
    }
  };
  invoker.value = initialValue;
  return invoker;
}
const bubbles = [
  // touch事件暂不做延迟，否则在 Android 上会影响性能，比如一些拖拽跟手手势等
  // 'touchstart',
  // 'touchmove',
  // 'touchcancel',
  // 'touchend',
  "tap",
  "longpress",
  "longtap",
  "transitionend",
  "animationstart",
  "animationiteration",
  "animationend",
  "touchforcechange"
];
function patchMPEvent(event) {
  if (event.type && event.target) {
    event.preventDefault = NOOP;
    event.stopPropagation = NOOP;
    event.stopImmediatePropagation = NOOP;
    if (!hasOwn$1(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn$1(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject$1(event.detail) && hasOwn$1(event.detail, "checked") && !hasOwn$1(event.detail, "value")) {
      event.detail.value = event.detail.checked;
    }
    if (isPlainObject$1(event.detail)) {
      event.target = extend({}, event.target, event.detail);
    }
  }
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn(e3));
  } else {
    return value;
  }
}
function vFor(source, renderItem) {
  let ret;
  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, i);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn(`The v-for range expect an integer value but got ${source}.`);
      return [];
    }
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, i);
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) => renderItem(item, i, i));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
function stringifyStyle(value) {
  if (isString(value)) {
    return value;
  }
  return stringify(normalizeStyle(value));
}
function stringify(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    ret += `${key.startsWith(`--`) ? key : hyphenate(key)}:${styles[key]};`;
  }
  return ret;
}
function setRef(ref2, id, opts = {}) {
  const { $templateRefs } = getCurrentInstance();
  $templateRefs.push({ i: id, r: ref2, k: opts.k, f: opts.f });
}
const o = (value, key) => vOn(value, key);
const f = (source, renderItem) => vFor(source, renderItem);
const s = (value) => stringifyStyle(value);
const e = (target, ...sources) => extend(target, ...sources);
const n = (value) => normalizeClass(value);
const t = (val) => toDisplayString(val);
const p = (props) => renderProps(props);
const sr = (ref2, id, opts) => setRef(ref2, id, opts);
function createApp$1(rootComponent, rootProps = null) {
  rootComponent && (rootComponent.mpType = "app");
  return createVueApp(rootComponent, rootProps).use(plugin);
}
const createSSRApp = createApp$1;
const MP_METHODS = [
  "createSelectorQuery",
  "createIntersectionObserver",
  "selectAllComponents",
  "selectComponent"
];
function createEmitFn(oldEmit, ctx) {
  return function emit2(event, ...args) {
    const scope = ctx.$scope;
    if (scope && event) {
      const detail = { __args__: args };
      {
        scope.triggerEvent(event, detail);
      }
    }
    return oldEmit.apply(this, [event, ...args]);
  };
}
function initBaseInstance(instance, options) {
  const ctx = instance.ctx;
  ctx.mpType = options.mpType;
  ctx.$mpType = options.mpType;
  ctx.$mpPlatform = "mp-weixin";
  ctx.$scope = options.mpInstance;
  ctx.$mp = {};
  {
    ctx._self = {};
  }
  instance.slots = {};
  if (isArray(options.slots) && options.slots.length) {
    options.slots.forEach((name) => {
      instance.slots[name] = true;
    });
    if (instance.slots[SLOT_DEFAULT_NAME]) {
      instance.slots.default = true;
    }
  }
  ctx.getOpenerEventChannel = function() {
    {
      return options.mpInstance.getOpenerEventChannel();
    }
  };
  ctx.$hasHook = hasHook;
  ctx.$callHook = callHook;
  instance.emit = createEmitFn(instance.emit, ctx);
}
function initComponentInstance(instance, options) {
  initBaseInstance(instance, options);
  const ctx = instance.ctx;
  MP_METHODS.forEach((method) => {
    ctx[method] = function(...args) {
      const mpInstance = ctx.$scope;
      if (mpInstance && mpInstance[method]) {
        return mpInstance[method].apply(mpInstance, args);
      }
    };
  });
}
function initMocks(instance, mpInstance, mocks2) {
  const ctx = instance.ctx;
  mocks2.forEach((mock) => {
    if (hasOwn$1(mpInstance, mock)) {
      instance[mock] = ctx[mock] = mpInstance[mock];
    }
  });
}
function hasHook(name) {
  const hooks = this.$[name];
  if (hooks && hooks.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  if (name === "mounted") {
    callHook.call(this, "bm");
    this.$.isMounted = true;
    name = "m";
  }
  const hooks = this.$[name];
  return hooks && invokeArrayFns(hooks, args);
}
const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES
  // 'onReady', // lifetimes.ready
  // 'onPageScroll', // 影响性能，开发者手动注册
  // 'onShareTimeline', // 右上角菜单，开发者手动注册
  // 'onShareAppMessage' // 右上角菜单，开发者手动注册
];
function findHooks(vueOptions, hooks = /* @__PURE__ */ new Set()) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (isUniLifecycleHook(name, vueOptions[name])) {
        hooks.add(name);
      }
    });
    {
      const { extends: extendsOptions, mixins } = vueOptions;
      if (mixins) {
        mixins.forEach((mixin) => findHooks(mixin, hooks));
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks);
      }
    }
  }
  return hooks;
}
function initHook(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn$1(mpOptions, hook)) {
    mpOptions[hook] = function(args) {
      return this.$vm && this.$vm.$callHook(hook, args);
    };
  }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
  hooks.forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
  findHooks(vueOptions).forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initRuntimeHooks(mpOptions, runtimeHooks) {
  if (!runtimeHooks) {
    return;
  }
  const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
  hooks.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook(mpOptions, hook, []);
    }
  });
}
const findMixinRuntimeHooks = /* @__PURE__ */ once(() => {
  const runtimeHooks = [];
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm && app.$vm.$) {
    const mixins = app.$vm.$.appContext.mixins;
    if (isArray(mixins)) {
      const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
      mixins.forEach((mixin) => {
        hooks.forEach((hook) => {
          if (hasOwn$1(mixin, hook) && !runtimeHooks.includes(hook)) {
            runtimeHooks.push(hook);
          }
        });
      });
    }
  }
  return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
  initHooks(mpOptions, findMixinRuntimeHooks());
}
const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION
];
function parseApp(instance, parseAppOptions) {
  const internalInstance = instance.$;
  const appOptions = {
    globalData: instance.$options && instance.$options.globalData || {},
    $vm: instance,
    onLaunch(options) {
      this.$vm = instance;
      const ctx = internalInstance.ctx;
      if (this.$vm && ctx.$scope) {
        return;
      }
      initBaseInstance(internalInstance, {
        mpType: "app",
        mpInstance: this,
        slots: []
      });
      ctx.globalData = this.globalData;
      instance.$callHook(ON_LAUNCH, options);
    }
  };
  const { onError } = internalInstance;
  if (onError) {
    internalInstance.appContext.config.errorHandler = (err) => {
      instance.$callHook(ON_ERROR, err);
    };
  }
  initLocale(instance);
  const vueOptions = instance.$.type;
  initHooks(appOptions, HOOKS);
  initUnknownHooks(appOptions, vueOptions);
  {
    const methods = vueOptions.methods;
    methods && extend(appOptions, methods);
  }
  if (parseAppOptions) {
    parseAppOptions.parse(appOptions);
  }
  return appOptions;
}
function initCreateApp(parseAppOptions) {
  return function createApp2(vm) {
    return App(parseApp(vm, parseAppOptions));
  };
}
function initCreateSubpackageApp(parseAppOptions) {
  return function createApp2(vm) {
    const appOptions = parseApp(vm, parseAppOptions);
    const app = isFunction(getApp) && getApp({
      allowDefault: true
    });
    if (!app)
      return;
    vm.$.ctx.$scope = app;
    const globalData = app.globalData;
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn$1(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn$1(app, name)) {
        app[name] = appOptions[name];
      }
    });
    initAppLifecycle(appOptions, vm);
  };
}
function initAppLifecycle(appOptions, vm) {
  if (isFunction(appOptions.onLaunch)) {
    const args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch(args);
  }
  if (isFunction(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow((args) => {
      vm.$callHook("onShow", args);
    });
  }
  if (isFunction(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide((args) => {
      vm.$callHook("onHide", args);
    });
  }
}
function initLocale(appVm) {
  const locale = ref(normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  Object.defineProperty(appVm, "$locale", {
    get() {
      return locale.value;
    },
    set(v) {
      locale.value = v;
    }
  });
}
function initVueIds(vueIds, mpInstance) {
  if (!vueIds) {
    return;
  }
  const ids = vueIds.split(",");
  const len = ids.length;
  if (len === 1) {
    mpInstance._$vueId = ids[0];
  } else if (len === 2) {
    mpInstance._$vueId = ids[0];
    mpInstance._$vuePid = ids[1];
  }
}
const EXTRAS = ["externalClasses"];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
  EXTRAS.forEach((name) => {
    if (hasOwn$1(vueOptions, name)) {
      miniProgramComponentOptions[name] = vueOptions[name];
    }
  });
}
const WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach((name) => {
      const matches = name.match(WORKLET_RE);
      if (matches) {
        const workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
function initWxsCallMethods(methods, wxsCallMethods) {
  if (!isArray(wxsCallMethods)) {
    return;
  }
  wxsCallMethods.forEach((callMethod) => {
    methods[callMethod] = function(args) {
      return this.$vm[callMethod](args);
    };
  });
}
function selectAllComponents(mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector);
  components.forEach((component) => {
    const ref2 = component.properties.uR;
    $refs[ref2] = component.$vm || component;
  });
}
function initRefs(instance, mpInstance) {
  Object.defineProperty(instance, "refs", {
    get() {
      const $refs = {};
      selectAllComponents(mpInstance, ".r", $refs);
      const forComponents = mpInstance.selectAllComponents(".r-i-f");
      forComponents.forEach((component) => {
        const ref2 = component.properties.uR;
        if (!ref2) {
          return;
        }
        if (!$refs[ref2]) {
          $refs[ref2] = [];
        }
        $refs[ref2].push(component.$vm || component);
      });
      return $refs;
    }
  });
}
function findVmByVueId(instance, vuePid) {
  const $children = instance.$children;
  for (let i = $children.length - 1; i >= 0; i--) {
    const childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  let parentVm;
  for (let i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
const builtInProps = [
  // 百度小程序,快手小程序自定义组件不支持绑定动态事件，动态dataset，故通过props传递事件信息
  // event-opts
  "eO",
  // 组件 ref
  "uR",
  // 组件 ref-in-for
  "uRIF",
  // 组件 id
  "uI",
  // 组件类型 m: 小程序组件
  "uT",
  // 组件 props
  "uP",
  // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
  "uS"
];
function initDefaultProps(options, isBehavior = false) {
  const properties = {};
  if (!isBehavior) {
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: ""
      };
    });
    properties.uS = {
      type: null,
      value: [],
      observer: function(newVal) {
        const $slots = /* @__PURE__ */ Object.create(null);
        newVal && newVal.forEach((slotName) => {
          $slots[slotName] = true;
        });
        this.setData({
          $slots
        });
      }
    };
  }
  if (options.behaviors) {
    if (options.behaviors.includes("wx://form-field")) {
      if (!options.properties || !options.properties.name) {
        properties.name = {
          type: null,
          value: ""
        };
      }
      if (!options.properties || !options.properties.value) {
        properties.value = {
          type: null,
          value: ""
        };
      }
    }
  }
  return properties;
}
function initVirtualHostProps(options) {
  const properties = {};
  {
    if (options && options.virtualHost) {
      properties.virtualHostStyle = {
        type: null,
        value: ""
      };
      properties.virtualHostClass = {
        type: null,
        value: ""
      };
    }
  }
  return properties;
}
function initProps(mpComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {};
  }
  extend(mpComponentOptions.properties, initDefaultProps(mpComponentOptions), initVirtualHostProps(mpComponentOptions.options));
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type, defaultValue) {
  if (isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function normalizePropType(type, defaultValue) {
  const res = parsePropType(type);
  return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}
function initPageProps({ properties }, rawProps) {
  if (isArray(rawProps)) {
    rawProps.forEach((key) => {
      properties[key] = {
        type: String,
        value: ""
      };
    });
  } else if (isPlainObject$1(rawProps)) {
    Object.keys(rawProps).forEach((key) => {
      const opts = rawProps[key];
      if (isPlainObject$1(opts)) {
        let value = opts.default;
        if (isFunction(value)) {
          value = value();
        }
        const type = opts.type;
        opts.type = normalizePropType(type);
        properties[key] = {
          type: opts.type,
          value
        };
      } else {
        properties[key] = {
          type: normalizePropType(opts)
        };
      }
    });
  }
}
function findPropsData(properties, isPage2) {
  return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(properties.uP)) || {};
}
function findPagePropsData(properties) {
  const propsData = {};
  if (isPlainObject$1(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = properties[name];
      }
    });
  }
  return propsData;
}
function initFormField(vm) {
  const vueOptions = vm.$options;
  if (isArray(vueOptions.behaviors) && vueOptions.behaviors.includes("uni://form-field")) {
    vm.$watch("modelValue", () => {
      vm.$scope && vm.$scope.setData({
        name: vm.name,
        value: vm.modelValue
      });
    }, {
      immediate: true
    });
  }
}
function initData(_) {
  return {};
}
function initPropsObserver(componentOptions) {
  const observe = function observe2() {
    const up = this.properties.uP;
    if (!up) {
      return;
    }
    if (this.$vm) {
      updateComponentProps(up, this.$vm.$);
    } else if (this.properties.uT === "m") {
      updateMiniProgramComponentProperties(up, this);
    }
  };
  {
    if (!componentOptions.observers) {
      componentOptions.observers = {};
    }
    componentOptions.observers.uP = observe;
  }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
  const prevProps = mpInstance.properties;
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps);
  }
}
function updateComponentProps(up, instance) {
  const prevProps = toRaw(instance.props);
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance, nextProps, prevProps, false);
    if (hasQueueJob(instance.update)) {
      invalidateJob(instance.update);
    }
    {
      instance.update();
    }
  }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
  const nextKeys = Object.keys(nextProps);
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
function initBehaviors(vueOptions) {
  const vueBehaviors = vueOptions.behaviors;
  let vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  const behaviors = [];
  if (isArray(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace("uni://", "wx://"));
      if (behavior === "uni://form-field") {
        if (isArray(vueProps)) {
          vueProps.push("name");
          vueProps.push("modelValue");
        } else {
          vueProps.name = {
            type: String,
            default: ""
          };
          vueProps.modelValue = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ""
          };
        }
      }
    });
  }
  return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
  componentOptions.data = initData();
  componentOptions.behaviors = initBehaviors(vueOptions);
}
function parseComponent(vueOptions, { parse: parse2, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options = {
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (isArray(vueOptions.mixins)) {
    vueOptions.mixins.forEach((item) => {
      if (isObject$1(item.options)) {
        extend(options, item.options);
      }
    });
  }
  if (vueOptions.options) {
    extend(options, vueOptions.options);
  }
  const mpComponentOptions = {
    options,
    lifetimes: initLifetimes2({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }),
    pageLifetimes: {
      show() {
        this.$vm && this.$vm.$callHook("onPageShow");
      },
      hide() {
        this.$vm && this.$vm.$callHook("onPageHide");
      },
      resize(size2) {
        this.$vm && this.$vm.$callHook("onPageResize", size2);
      }
    },
    methods: {
      __l: handleLink2
    }
  };
  {
    applyOptions(mpComponentOptions, vueOptions);
  }
  initProps(mpComponentOptions);
  initPropsObserver(mpComponentOptions);
  initExtraOptions(mpComponentOptions, vueOptions);
  initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
  {
    initWorkletMethods(mpComponentOptions.methods, vueOptions.methods);
  }
  if (parse2) {
    parse2(mpComponentOptions, { handleLink: handleLink2 });
  }
  return mpComponentOptions;
}
function initCreateComponent(parseOptions2) {
  return function createComponent2(vueComponentOptions) {
    return Component(parseComponent(vueComponentOptions, parseOptions2));
  };
}
let $createComponentFn;
let $destroyComponentFn;
function getAppVm() {
  return getApp().$vm;
}
function $createComponent(initialVNode, options) {
  if (!$createComponentFn) {
    $createComponentFn = getAppVm().$createComponent;
  }
  const proxy = $createComponentFn(initialVNode, options);
  return getExposeProxy(proxy.$) || proxy;
}
function $destroyComponent(instance) {
  if (!$destroyComponentFn) {
    $destroyComponentFn = getAppVm().$destroyComponent;
  }
  return $destroyComponentFn(instance);
}
function parsePage(vueOptions, parseOptions2) {
  const { parse: parse2, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks: mocks2,
    isPage: isPage2,
    initRelation: initRelation2,
    handleLink: handleLink2,
    initLifetimes: initLifetimes2
  });
  initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
  const methods = miniProgramPageOptions.methods;
  methods.onLoad = function(query) {
    this.options = query;
    this.$page = {
      fullPath: addLeadingSlash(this.route + stringifyQuery(query))
    };
    return this.$vm && this.$vm.$callHook(ON_LOAD, query);
  };
  initHooks(methods, PAGE_INIT_HOOKS);
  {
    initUnknownHooks(methods, vueOptions);
  }
  initRuntimeHooks(methods, vueOptions.__runtimeHooks);
  initMixinRuntimeHooks(methods);
  parse2 && parse2(miniProgramPageOptions, { handleLink: handleLink2 });
  return miniProgramPageOptions;
}
function initCreatePage(parseOptions2) {
  return function createPage2(vuePageOptions) {
    return Component(parsePage(vuePageOptions, parseOptions2));
  };
}
function initCreatePluginApp(parseAppOptions) {
  return function createApp2(vm) {
    initAppLifecycle(parseApp(vm, parseAppOptions), vm);
  };
}
const MPPage = Page;
const MPComponent = Component;
function initTriggerEvent(mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  const newTriggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [customizeEvent(event), ...args]);
  };
  try {
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initMiniProgramHook(name, options, isComponent) {
  const oldHook = options[name];
  if (!oldHook) {
    options[name] = function() {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function(...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args);
    };
  }
}
Page = function(options) {
  initMiniProgramHook(ON_LOAD, options);
  return MPPage(options);
};
Component = function(options) {
  initMiniProgramHook("created", options);
  const isVueComponent = options.properties && options.properties.uP;
  if (!isVueComponent) {
    initProps(options);
    initPropsObserver(options);
  }
  return MPComponent(options);
};
function initLifetimes({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }) {
  return {
    attached() {
      let properties = this.properties;
      initVueIds(properties.uI, this);
      const relationOptions = {
        vuePid: this._$vuePid
      };
      initRelation2(this, relationOptions);
      const mpInstance = this;
      const isMiniProgramPage = isPage2(mpInstance);
      let propsData = properties;
      this.$vm = $createComponent({
        type: vueOptions,
        props: findPropsData(propsData, isMiniProgramPage)
      }, {
        mpType: isMiniProgramPage ? "page" : "component",
        mpInstance,
        slots: properties.uS || {},
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(instance, options) {
          initRefs(instance, mpInstance);
          initMocks(instance, mpInstance, mocks2);
          initComponentInstance(instance, options);
        }
      });
      if (!isMiniProgramPage) {
        initFormField(this.$vm);
      }
    },
    ready() {
      if (this.$vm) {
        {
          this.$vm.$callHook("mounted");
          this.$vm.$callHook(ON_READY);
        }
      }
    },
    detached() {
      if (this.$vm) {
        pruneComponentPropsCache(this.$vm.$.uid);
        $destroyComponent(this.$vm);
      }
    }
  };
}
const mocks = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
function isPage(mpInstance) {
  return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
  mpInstance.triggerEvent("__l", detail);
}
function handleLink(event) {
  const detail = event.detail || event.value;
  const vuePid = detail.vuePid;
  let parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  detail.parent = parentVm;
}
var parseOptions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  handleLink,
  initLifetimes,
  initRelation,
  isPage,
  mocks
});
const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
const createPluginApp = initCreatePluginApp();
const createSubpackageApp = initCreateSubpackageApp();
{
  wx.createApp = global.createApp = createApp;
  wx.createPage = createPage;
  wx.createComponent = createComponent;
  wx.createPluginApp = global.createPluginApp = createPluginApp;
  wx.createSubpackageApp = global.createSubpackageApp = createSubpackageApp;
}
var isVue2 = false;
function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  target[key] = val;
  return val;
}
function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  delete target[key];
}
/*!
  * pinia v2.0.33
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = Symbol("pinia");
function isPlainObject(o2) {
  return o2 && typeof o2 === "object" && Object.prototype.toString.call(o2) === "[object Object]" && typeof o2.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
const IS_CLIENT = typeof window !== "undefined";
const USE_DEVTOOLS = IS_CLIENT;
const componentStateTypes = [];
const getStoreType = (id) => "🍍 " + id;
function addStoreToDevtools(app, store) {
  if (!componentStateTypes.includes(getStoreType(store.$id))) {
    componentStateTypes.push(getStoreType(store.$id));
  }
}
function patchActionForGrouping(store, actionNames) {
  const actions = actionNames.reduce((storeActions, actionName) => {
    storeActions[actionName] = toRaw(store)[actionName];
    return storeActions;
  }, {});
  for (const actionName in actions) {
    store[actionName] = function() {
      const trackedStore = new Proxy(store, {
        get(...args) {
          return Reflect.get(...args);
        },
        set(...args) {
          return Reflect.set(...args);
        }
      });
      return actions[actionName].apply(trackedStore, arguments);
    };
  }
}
function devtoolsPlugin({ app, store, options }) {
  if (store.$id.startsWith("__hot:")) {
    return;
  }
  if (options.state) {
    store._isOptionsAPI = true;
  }
  if (typeof options.state === "function") {
    patchActionForGrouping(
      // @ts-expect-error: can cast the store...
      store,
      Object.keys(options.actions)
    );
    const originalHotUpdate = store._hotUpdate;
    toRaw(store)._hotUpdate = function(newStore) {
      originalHotUpdate.apply(this, arguments);
      patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions));
    };
  }
  addStoreToDevtools(
    app,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    store
  );
}
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
    pinia.use(devtoolsPlugin);
  }
  return pinia;
}
function patchObject(newState, oldState) {
  for (const key in oldState) {
    const subPatch = oldState[key];
    if (!(key in newState)) {
      continue;
    }
    const targetValue = newState[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && !isRef(subPatch) && !isReactive(subPatch)) {
      newState[key] = patchObject(targetValue, subPatch);
    } else {
      {
        newState[key] = subPatch;
      }
    }
  }
  return newState;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  }
  if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = Symbol("pinia:skipHydration");
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o2) {
  return !!(isRef(o2) && o2.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && !hot) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = hot ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      toRefs(ref(state ? state() : {}).value)
    ) : toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      if (name in localState) {
        console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
      }
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  if (!pinia._e.active) {
    throw new Error("Pinia destroyed");
  }
  const $subscribeOptions = {
    deep: true
    // flush: 'post',
  };
  {
    $subscribeOptions.onTrigger = (event) => {
      if (isListening) {
        debuggerEvents = event;
      } else if (isListening == false && !store._hotUpdating) {
        if (Array.isArray(debuggerEvents)) {
          debuggerEvents.push(event);
        } else {
          console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
        }
      }
    };
  }
  let isListening;
  let isSyncListening;
  let subscriptions = markRaw([]);
  let actionSubscriptions = markRaw([]);
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && !hot) {
    {
      pinia.state.value[$id] = {};
    }
  }
  const hotState = ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    {
      debuggerEvents = [];
    }
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick$1().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  } : (
    /* istanbul ignore next */
    () => {
      throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
    }
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const _hmrPayload = /* @__PURE__ */ markRaw({
    actions: {},
    getters: {},
    state: [],
    hotState
  });
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(
    assign(
      {
        _hmrPayload,
        _customProperties: markRaw(/* @__PURE__ */ new Set())
        // devtools custom properties
      },
      partialStore
      // must be added later
      // setupStore
    )
  );
  pinia._s.set($id, store);
  const setupStore = pinia._e.run(() => {
    scope = effectScope();
    return scope.run(() => setup());
  });
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (hot) {
        set(hotState.value, key, toRef(setupStore, key));
      } else if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
      {
        _hmrPayload.state.push(key);
      }
    } else if (typeof prop === "function") {
      const actionValue = hot ? prop : wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      {
        _hmrPayload.actions[key] = prop;
      }
      optionsForPlugin.actions[key] = prop;
    } else {
      if (isComputed(prop)) {
        _hmrPayload.getters[key] = isOptionsStore ? (
          // @ts-expect-error
          options.getters[key]
        ) : prop;
        if (IS_CLIENT) {
          const getters = setupStore._getters || // @ts-expect-error: same
          (setupStore._getters = markRaw([]));
          getters.push(key);
        }
      }
    }
  }
  {
    assign(store, setupStore);
    assign(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => hot ? hotState.value : pinia.state.value[$id],
    set: (state) => {
      if (hot) {
        throw new Error("cannot set hotState");
      }
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  {
    store._hotUpdate = markRaw((newStore) => {
      store._hotUpdating = true;
      newStore._hmrPayload.state.forEach((stateKey) => {
        if (stateKey in store.$state) {
          const newStateTarget = newStore.$state[stateKey];
          const oldStateSource = store.$state[stateKey];
          if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
            patchObject(newStateTarget, oldStateSource);
          } else {
            newStore.$state[stateKey] = oldStateSource;
          }
        }
        set(store, stateKey, toRef(newStore.$state, stateKey));
      });
      Object.keys(store.$state).forEach((stateKey) => {
        if (!(stateKey in newStore.$state)) {
          del(store, stateKey);
        }
      });
      isListening = false;
      isSyncListening = false;
      pinia.state.value[$id] = toRef(newStore._hmrPayload, "hotState");
      isSyncListening = true;
      nextTick$1().then(() => {
        isListening = true;
      });
      for (const actionName in newStore._hmrPayload.actions) {
        const action = newStore[actionName];
        set(store, actionName, wrapAction(actionName, action));
      }
      for (const getterName in newStore._hmrPayload.getters) {
        const getter = newStore._hmrPayload.getters[getterName];
        const getterValue = isOptionsStore ? (
          // special handling of options api
          computed(() => {
            setActivePinia(pinia);
            return getter.call(store, store);
          })
        ) : getter;
        set(store, getterName, getterValue);
      }
      Object.keys(store._hmrPayload.getters).forEach((key) => {
        if (!(key in newStore._hmrPayload.getters)) {
          del(store, key);
        }
      });
      Object.keys(store._hmrPayload.actions).forEach((key) => {
        if (!(key in newStore._hmrPayload.actions)) {
          del(store, key);
        }
      });
      store._hmrPayload = newStore._hmrPayload;
      store._getters = newStore._getters;
      store._hotUpdating = false;
    });
  }
  if (USE_DEVTOOLS) {
    const nonEnumerable = {
      writable: true,
      configurable: true,
      // avoid warning on devtools trying to display this property
      enumerable: false
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p2) => {
      Object.defineProperty(store, p2, assign({ value: store[p2] }, nonEnumerable));
    });
  }
  pinia._p.forEach((extender) => {
    if (USE_DEVTOOLS) {
      const extensions = scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      }));
      Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
      assign(store, extensions);
    } else {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
    console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
  }
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    const currentInstance2 = getCurrentInstance();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    pinia || currentInstance2 && inject(piniaSymbol, null);
    if (pinia)
      setActivePinia(pinia);
    if (!activePinia) {
      throw new Error(`[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
    }
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
      {
        useStore._pinia = pinia;
      }
    }
    const store = pinia._s.get(id);
    if (hot) {
      const hotId = "__hot:" + id;
      const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
      hot._hotUpdate(newStore);
      delete pinia.state.value[hotId];
      pinia._s.delete(hotId);
    }
    if (IS_CLIENT && currentInstance2 && currentInstance2.proxy && // avoid adding stores that are just built for hot module replacement
    !hot) {
      const vm = currentInstance2.proxy;
      const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
      cache[id] = store;
    }
    return store;
  }
  useStore.$id = id;
  return useStore;
}
const isH5 = typeof alert === "function";
const updateStorage = (strategy, store, options) => {
  const storage = strategy.storage;
  const storeKey = strategy.key || store.$id;
  const isCustomStorage = isH5 || (options == null ? void 0 : options.enforceCustomStorage);
  if (strategy.paths) {
    const partialState = strategy.paths.reduce((finalObj, key) => {
      finalObj[key] = store.$state[key];
      return finalObj;
    }, {});
    if (isCustomStorage && storage) {
      storage.setItem(storeKey, JSON.stringify(partialState));
    } else {
      index$1.setStorage({ key: storeKey, data: JSON.stringify(partialState) });
    }
  } else if (isCustomStorage && storage) {
    storage.setItem(storeKey, JSON.stringify(store.$state));
  } else {
    index$1.setStorage({ key: storeKey, data: JSON.stringify(store.$state) });
  }
};
var index = ({ options, store }) => {
  var _a2, _b, _c, _d, _e, _f;
  if ((_a2 = options.persist) == null ? void 0 : _a2.enabled) {
    const defaultStrat = [
      {
        key: store.$id,
        storage: ((_b = options.persist) == null ? void 0 : _b.H5Storage) || (window == null ? void 0 : window.sessionStorage)
      }
    ];
    const strategies = ((_d = (_c = options.persist) == null ? void 0 : _c.strategies) == null ? void 0 : _d.length) ? (_e = options.persist) == null ? void 0 : _e.strategies : defaultStrat;
    strategies.forEach((strategy) => {
      var _a22, _b2;
      const storage = strategy.storage || ((_a22 = options.persist) == null ? void 0 : _a22.H5Storage) || (window == null ? void 0 : window.sessionStorage);
      const storeKey = strategy.key || store.$id;
      let storageResult;
      if (isH5 || ((_b2 = options.persist) == null ? void 0 : _b2.enforceCustomStorage)) {
        storageResult = storage.getItem(storeKey);
      } else {
        storageResult = index$1.getStorageSync(storeKey);
      }
      if (storageResult) {
        store.$patch(JSON.parse(storageResult));
        updateStorage(strategy, store, options.persist);
      }
    });
    store.$subscribe(() => {
      strategies.forEach((strategy) => {
        updateStorage(strategy, store, options.persist);
      });
    }, { detached: ((_f = options.persist) == null ? void 0 : _f.detached) ? true : false });
  }
};
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function commonjsRequire(path) {
  throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var mqttExports = {};
var mqtt$1 = {
  get exports() {
    return mqttExports;
  },
  set exports(v) {
    mqttExports = v;
  }
};
(function(module2, exports2) {
  (function(f2) {
    {
      module2.exports = f2();
    }
  })(function() {
    return function() {
      function r(e2, n2, t2) {
        function o2(i2, f2) {
          if (!n2[i2]) {
            if (!e2[i2]) {
              var c = "function" == typeof commonjsRequire && commonjsRequire;
              if (!f2 && c)
                return c(i2, true);
              if (u)
                return u(i2, true);
              var a = new Error("Cannot find module '" + i2 + "'");
              throw a.code = "MODULE_NOT_FOUND", a;
            }
            var p2 = n2[i2] = { exports: {} };
            e2[i2][0].call(p2.exports, function(r2) {
              var n3 = e2[i2][1][r2];
              return o2(n3 || r2);
            }, p2, p2.exports, r, e2, n2, t2);
          }
          return n2[i2].exports;
        }
        for (var u = "function" == typeof commonjsRequire && commonjsRequire, i = 0; i < t2.length; i++)
          o2(t2[i]);
        return o2;
      }
      return r;
    }()({ 1: [function(require2, module3, exports3) {
      (function(process, global2) {
        var EventEmitter = require2("events").EventEmitter;
        var Store = require2("./store");
        var mqttPacket = require2("mqtt-packet");
        var Writable = require2("readable-stream").Writable;
        var inherits = require2("inherits");
        var reInterval = require2("reinterval");
        var validations = require2("./validations");
        var xtend = require2("xtend");
        var debug = require2("debug")("mqttjs:client");
        var nextTick2 = process ? process.nextTick : function(callback) {
          setTimeout(callback, 0);
        };
        var setImmediate = global2.setImmediate || function(callback) {
          nextTick2(callback);
        };
        var defaultConnectOptions = {
          keepalive: 60,
          reschedulePings: true,
          protocolId: "MQTT",
          protocolVersion: 4,
          reconnectPeriod: 1e3,
          connectTimeout: 30 * 1e3,
          clean: true,
          resubscribe: true
        };
        var socketErrors = [
          "ECONNREFUSED",
          "EADDRINUSE",
          "ECONNRESET",
          "ENOTFOUND"
        ];
        var errors = {
          0: "",
          1: "Unacceptable protocol version",
          2: "Identifier rejected",
          3: "Server unavailable",
          4: "Bad username or password",
          5: "Not authorized",
          16: "No matching subscribers",
          17: "No subscription existed",
          128: "Unspecified error",
          129: "Malformed Packet",
          130: "Protocol Error",
          131: "Implementation specific error",
          132: "Unsupported Protocol Version",
          133: "Client Identifier not valid",
          134: "Bad User Name or Password",
          135: "Not authorized",
          136: "Server unavailable",
          137: "Server busy",
          138: "Banned",
          139: "Server shutting down",
          140: "Bad authentication method",
          141: "Keep Alive timeout",
          142: "Session taken over",
          143: "Topic Filter invalid",
          144: "Topic Name invalid",
          145: "Packet identifier in use",
          146: "Packet Identifier not found",
          147: "Receive Maximum exceeded",
          148: "Topic Alias invalid",
          149: "Packet too large",
          150: "Message rate too high",
          151: "Quota exceeded",
          152: "Administrative action",
          153: "Payload format invalid",
          154: "Retain not supported",
          155: "QoS not supported",
          156: "Use another server",
          157: "Server moved",
          158: "Shared Subscriptions not supported",
          159: "Connection rate exceeded",
          160: "Maximum connect time",
          161: "Subscription Identifiers not supported",
          162: "Wildcard Subscriptions not supported"
        };
        function defaultId() {
          return "mqttjs_" + Math.random().toString(16).substr(2, 8);
        }
        function sendPacket(client, packet, cb) {
          debug("sendPacket :: packet: %O", packet);
          debug("sendPacket :: emitting `packetsend`");
          client.emit("packetsend", packet);
          debug("sendPacket :: writing to stream");
          var result = mqttPacket.writeToStream(packet, client.stream, client.options);
          debug("sendPacket :: writeToStream result %s", result);
          if (!result && cb) {
            debug("sendPacket :: handle events on `drain` once through callback.");
            client.stream.once("drain", cb);
          } else if (cb) {
            debug("sendPacket :: invoking cb");
            cb();
          }
        }
        function flush(queue2) {
          if (queue2) {
            debug("flush: queue exists? %b", !!queue2);
            Object.keys(queue2).forEach(function(messageId) {
              if (typeof queue2[messageId].cb === "function") {
                queue2[messageId].cb(new Error("Connection closed"));
                delete queue2[messageId];
              }
            });
          }
        }
        function flushVolatile(queue2) {
          if (queue2) {
            debug("flushVolatile :: deleting volatile messages from the queue and setting their callbacks as error function");
            Object.keys(queue2).forEach(function(messageId) {
              if (queue2[messageId].volatile && typeof queue2[messageId].cb === "function") {
                queue2[messageId].cb(new Error("Connection closed"));
                delete queue2[messageId];
              }
            });
          }
        }
        function storeAndSend(client, packet, cb, cbStorePut) {
          debug("storeAndSend :: store packet with cmd %s to outgoingStore", packet.cmd);
          client.outgoingStore.put(packet, function storedPacket(err) {
            if (err) {
              return cb && cb(err);
            }
            cbStorePut();
            sendPacket(client, packet, cb);
          });
        }
        function nop(error) {
          debug("nop ::", error);
        }
        function MqttClient(streamBuilder, options) {
          var k;
          var that = this;
          if (!(this instanceof MqttClient)) {
            return new MqttClient(streamBuilder, options);
          }
          this.options = options || {};
          for (k in defaultConnectOptions) {
            if (typeof this.options[k] === "undefined") {
              this.options[k] = defaultConnectOptions[k];
            } else {
              this.options[k] = options[k];
            }
          }
          debug("MqttClient :: options.protocol", options.protocol);
          debug("MqttClient :: options.protocolVersion", options.protocolVersion);
          debug("MqttClient :: options.username", options.username);
          debug("MqttClient :: options.keepalive", options.keepalive);
          debug("MqttClient :: options.reconnectPeriod", options.reconnectPeriod);
          debug("MqttClient :: options.rejectUnauthorized", options.rejectUnauthorized);
          this.options.clientId = typeof options.clientId === "string" ? options.clientId : defaultId();
          debug("MqttClient :: clientId", this.options.clientId);
          this.options.customHandleAcks = options.protocolVersion === 5 && options.customHandleAcks ? options.customHandleAcks : function() {
            arguments[3](0);
          };
          this.streamBuilder = streamBuilder;
          this.outgoingStore = options.outgoingStore || new Store();
          this.incomingStore = options.incomingStore || new Store();
          this.queueQoSZero = options.queueQoSZero === void 0 ? true : options.queueQoSZero;
          this._resubscribeTopics = {};
          this.messageIdToTopic = {};
          this.pingTimer = null;
          this.connected = false;
          this.disconnecting = false;
          this.queue = [];
          this.connackTimer = null;
          this.reconnectTimer = null;
          this._storeProcessing = false;
          this._packetIdsDuringStoreProcessing = {};
          this.nextId = Math.max(1, Math.floor(Math.random() * 65535));
          this.outgoing = {};
          this._firstConnection = true;
          this.on("connect", function() {
            var queue2 = this.queue;
            function deliver() {
              var entry = queue2.shift();
              debug("deliver :: entry %o", entry);
              var packet = null;
              if (!entry) {
                return;
              }
              packet = entry.packet;
              debug("deliver :: call _sendPacket for %o", packet);
              that._sendPacket(
                packet,
                function(err) {
                  if (entry.cb) {
                    entry.cb(err);
                  }
                  deliver();
                }
              );
            }
            debug("connect :: sending queued packets");
            deliver();
          });
          this.on("close", function() {
            debug("close :: connected set to `false`");
            this.connected = false;
            debug("close :: clearing connackTimer");
            clearTimeout(this.connackTimer);
            debug("close :: clearing ping timer");
            if (that.pingTimer !== null) {
              that.pingTimer.clear();
              that.pingTimer = null;
            }
            debug("close :: calling _setupReconnect");
            this._setupReconnect();
          });
          EventEmitter.call(this);
          debug("MqttClient :: setting up stream");
          this._setupStream();
        }
        inherits(MqttClient, EventEmitter);
        MqttClient.prototype._setupStream = function() {
          var connectPacket;
          var that = this;
          var writable = new Writable();
          var parser = mqttPacket.parser(this.options);
          var completeParse = null;
          var packets = [];
          debug("_setupStream :: calling method to clear reconnect");
          this._clearReconnect();
          debug("_setupStream :: using streamBuilder provided to client to create stream");
          this.stream = this.streamBuilder(this);
          parser.on("packet", function(packet) {
            debug("parser :: on packet push to packets array.");
            packets.push(packet);
          });
          function nextTickWork() {
            if (packets.length) {
              nextTick2(work);
            } else {
              var done = completeParse;
              completeParse = null;
              done();
            }
          }
          function work() {
            debug("work :: getting next packet in queue");
            var packet = packets.shift();
            if (packet) {
              debug("work :: packet pulled from queue");
              that._handlePacket(packet, nextTickWork);
            } else {
              debug("work :: no packets in queue");
              var done = completeParse;
              completeParse = null;
              debug("work :: done flag is %s", !!done);
              if (done)
                done();
            }
          }
          writable._write = function(buf, enc, done) {
            completeParse = done;
            debug("writable stream :: parsing buffer");
            parser.parse(buf);
            work();
          };
          function streamErrorHandler(error) {
            debug("streamErrorHandler :: error", error.message);
            if (socketErrors.includes(error.code)) {
              debug("streamErrorHandler :: emitting error");
              that.emit("error", error);
            } else {
              nop(error);
            }
          }
          debug("_setupStream :: pipe stream to writable stream");
          this.stream.pipe(writable);
          this.stream.on("error", streamErrorHandler);
          this.stream.on("close", function() {
            debug("(%s)stream :: on close", that.options.clientId);
            flushVolatile(that.outgoing);
            debug("stream: emit close to MqttClient");
            that.emit("close");
          });
          debug("_setupStream: sending packet `connect`");
          connectPacket = Object.create(this.options);
          connectPacket.cmd = "connect";
          sendPacket(this, connectPacket);
          parser.on("error", this.emit.bind(this, "error"));
          if (this.options.properties) {
            if (!this.options.properties.authenticationMethod && this.options.properties.authenticationData) {
              that.end(() => this.emit(
                "error",
                new Error("Packet has no Authentication Method")
              ));
              return this;
            }
            if (this.options.properties.authenticationMethod && this.options.authPacket && typeof this.options.authPacket === "object") {
              var authPacket = xtend({ cmd: "auth", reasonCode: 0 }, this.options.authPacket);
              sendPacket(this, authPacket);
            }
          }
          this.stream.setMaxListeners(1e3);
          clearTimeout(this.connackTimer);
          this.connackTimer = setTimeout(function() {
            debug("!!connectTimeout hit!! Calling _cleanUp with force `true`");
            that._cleanUp(true);
          }, this.options.connectTimeout);
        };
        MqttClient.prototype._handlePacket = function(packet, done) {
          var options = this.options;
          if (options.protocolVersion === 5 && options.properties && options.properties.maximumPacketSize && options.properties.maximumPacketSize < packet.length) {
            this.emit("error", new Error("exceeding packets size " + packet.cmd));
            this.end({ reasonCode: 149, properties: { reasonString: "Maximum packet size was exceeded" } });
            return this;
          }
          debug("_handlePacket :: emitting packetreceive");
          this.emit("packetreceive", packet);
          switch (packet.cmd) {
            case "publish":
              this._handlePublish(packet, done);
              break;
            case "puback":
            case "pubrec":
            case "pubcomp":
            case "suback":
            case "unsuback":
              this._handleAck(packet);
              done();
              break;
            case "pubrel":
              this._handlePubrel(packet, done);
              break;
            case "connack":
              this._handleConnack(packet);
              done();
              break;
            case "pingresp":
              this._handlePingresp(packet);
              done();
              break;
            case "disconnect":
              this._handleDisconnect(packet);
              done();
              break;
          }
        };
        MqttClient.prototype._checkDisconnecting = function(callback) {
          if (this.disconnecting) {
            if (callback) {
              callback(new Error("client disconnecting"));
            } else {
              this.emit("error", new Error("client disconnecting"));
            }
          }
          return this.disconnecting;
        };
        MqttClient.prototype.publish = function(topic, message, opts, callback) {
          debug("publish :: message `%s` to topic `%s`", message, topic);
          var packet;
          var options = this.options;
          if (typeof opts === "function") {
            callback = opts;
            opts = null;
          }
          var defaultOpts = { qos: 0, retain: false, dup: false };
          opts = xtend(defaultOpts, opts);
          if (this._checkDisconnecting(callback)) {
            return this;
          }
          packet = {
            cmd: "publish",
            topic,
            payload: message,
            qos: opts.qos,
            retain: opts.retain,
            messageId: this._nextId(),
            dup: opts.dup
          };
          if (options.protocolVersion === 5) {
            packet.properties = opts.properties;
            if (!options.properties && packet.properties && packet.properties.topicAlias || opts.properties && options.properties && (opts.properties.topicAlias && options.properties.topicAliasMaximum && opts.properties.topicAlias > options.properties.topicAliasMaximum || !options.properties.topicAliasMaximum && opts.properties.topicAlias)) {
              delete packet.properties.topicAlias;
            }
          }
          debug("publish :: qos", opts.qos);
          switch (opts.qos) {
            case 1:
            case 2:
              this.outgoing[packet.messageId] = {
                volatile: false,
                cb: callback || nop
              };
              if (this._storeProcessing) {
                debug("_storeProcessing enabled");
                this._packetIdsDuringStoreProcessing[packet.messageId] = false;
                this._storePacket(packet, void 0, opts.cbStorePut);
              } else {
                debug("MqttClient:publish: packet cmd: %s", packet.cmd);
                this._sendPacket(packet, void 0, opts.cbStorePut);
              }
              break;
            default:
              if (this._storeProcessing) {
                debug("_storeProcessing enabled");
                this._storePacket(packet, callback, opts.cbStorePut);
              } else {
                debug("MqttClient:publish: packet cmd: %s", packet.cmd);
                this._sendPacket(packet, callback, opts.cbStorePut);
              }
              break;
          }
          return this;
        };
        MqttClient.prototype.subscribe = function() {
          var packet;
          var args = new Array(arguments.length);
          for (var i = 0; i < arguments.length; i++) {
            args[i] = arguments[i];
          }
          var subs = [];
          var obj = args.shift();
          var resubscribe = obj.resubscribe;
          var callback = args.pop() || nop;
          var opts = args.pop();
          var invalidTopic;
          var that = this;
          var version2 = this.options.protocolVersion;
          delete obj.resubscribe;
          if (typeof obj === "string") {
            obj = [obj];
          }
          if (typeof callback !== "function") {
            opts = callback;
            callback = nop;
          }
          invalidTopic = validations.validateTopics(obj);
          if (invalidTopic !== null) {
            setImmediate(callback, new Error("Invalid topic " + invalidTopic));
            return this;
          }
          if (this._checkDisconnecting(callback)) {
            debug("subscribe: discconecting true");
            return this;
          }
          var defaultOpts = {
            qos: 0
          };
          if (version2 === 5) {
            defaultOpts.nl = false;
            defaultOpts.rap = false;
            defaultOpts.rh = 0;
          }
          opts = xtend(defaultOpts, opts);
          if (Array.isArray(obj)) {
            obj.forEach(function(topic) {
              debug("subscribe: array topic %s", topic);
              if (!that._resubscribeTopics.hasOwnProperty(topic) || that._resubscribeTopics[topic].qos < opts.qos || resubscribe) {
                var currentOpts = {
                  topic,
                  qos: opts.qos
                };
                if (version2 === 5) {
                  currentOpts.nl = opts.nl;
                  currentOpts.rap = opts.rap;
                  currentOpts.rh = opts.rh;
                  currentOpts.properties = opts.properties;
                }
                debug("subscribe: pushing topic `%s` and qos `%s` to subs list", currentOpts.topic, currentOpts.qos);
                subs.push(currentOpts);
              }
            });
          } else {
            Object.keys(obj).forEach(function(k) {
              debug("subscribe: object topic %s", k);
              if (!that._resubscribeTopics.hasOwnProperty(k) || that._resubscribeTopics[k].qos < obj[k].qos || resubscribe) {
                var currentOpts = {
                  topic: k,
                  qos: obj[k].qos
                };
                if (version2 === 5) {
                  currentOpts.nl = obj[k].nl;
                  currentOpts.rap = obj[k].rap;
                  currentOpts.rh = obj[k].rh;
                  currentOpts.properties = opts.properties;
                }
                debug("subscribe: pushing `%s` to subs list", currentOpts);
                subs.push(currentOpts);
              }
            });
          }
          packet = {
            cmd: "subscribe",
            subscriptions: subs,
            qos: 1,
            retain: false,
            dup: false,
            messageId: this._nextId()
          };
          if (opts.properties) {
            packet.properties = opts.properties;
          }
          if (!subs.length) {
            callback(null, []);
            return;
          }
          if (this.options.resubscribe) {
            debug("subscribe :: resubscribe true");
            var topics = [];
            subs.forEach(function(sub) {
              if (that.options.reconnectPeriod > 0) {
                var topic = { qos: sub.qos };
                if (version2 === 5) {
                  topic.nl = sub.nl || false;
                  topic.rap = sub.rap || false;
                  topic.rh = sub.rh || 0;
                  topic.properties = sub.properties;
                }
                that._resubscribeTopics[sub.topic] = topic;
                topics.push(sub.topic);
              }
            });
            that.messageIdToTopic[packet.messageId] = topics;
          }
          this.outgoing[packet.messageId] = {
            volatile: true,
            cb: function(err, packet2) {
              if (!err) {
                var granted = packet2.granted;
                for (var i2 = 0; i2 < granted.length; i2 += 1) {
                  subs[i2].qos = granted[i2];
                }
              }
              callback(err, subs);
            }
          };
          debug("subscribe :: call _sendPacket");
          this._sendPacket(packet);
          return this;
        };
        MqttClient.prototype.unsubscribe = function() {
          var packet = {
            cmd: "unsubscribe",
            qos: 1,
            messageId: this._nextId()
          };
          var that = this;
          var args = new Array(arguments.length);
          for (var i = 0; i < arguments.length; i++) {
            args[i] = arguments[i];
          }
          var topic = args.shift();
          var callback = args.pop() || nop;
          var opts = args.pop();
          if (typeof topic === "string") {
            topic = [topic];
          }
          if (typeof callback !== "function") {
            opts = callback;
            callback = nop;
          }
          if (this._checkDisconnecting(callback)) {
            return this;
          }
          if (typeof topic === "string") {
            packet.unsubscriptions = [topic];
          } else if (Array.isArray(topic)) {
            packet.unsubscriptions = topic;
          }
          if (this.options.resubscribe) {
            packet.unsubscriptions.forEach(function(topic2) {
              delete that._resubscribeTopics[topic2];
            });
          }
          if (typeof opts === "object" && opts.properties) {
            packet.properties = opts.properties;
          }
          this.outgoing[packet.messageId] = {
            volatile: true,
            cb: callback
          };
          debug("unsubscribe: call _sendPacket");
          this._sendPacket(packet);
          return this;
        };
        MqttClient.prototype.end = function(force, opts, cb) {
          var that = this;
          debug("end :: (%s)", this.options.clientId);
          if (force == null || typeof force !== "boolean") {
            cb = opts || nop;
            opts = force;
            force = false;
            if (typeof opts !== "object") {
              cb = opts;
              opts = null;
              if (typeof cb !== "function") {
                cb = nop;
              }
            }
          }
          if (typeof opts !== "object") {
            cb = opts;
            opts = null;
          }
          debug("end :: cb? %s", !!cb);
          cb = cb || nop;
          function closeStores() {
            debug("end :: closeStores: closing incoming and outgoing stores");
            that.disconnected = true;
            that.incomingStore.close(function(e1) {
              that.outgoingStore.close(function(e2) {
                debug("end :: closeStores: emitting end");
                that.emit("end");
                if (cb) {
                  let err = e1 || e2;
                  debug("end :: closeStores: invoking callback with args");
                  cb(err);
                }
              });
            });
            if (that._deferredReconnect) {
              that._deferredReconnect();
            }
          }
          function finish() {
            debug("end :: (%s) :: finish :: calling _cleanUp with force %s", that.options.clientId, force);
            that._cleanUp(force, () => {
              debug("end :: finish :: calling process.nextTick on closeStores");
              nextTick2(closeStores.bind(that));
            }, opts);
          }
          if (this.disconnecting) {
            cb();
            return this;
          }
          this._clearReconnect();
          this.disconnecting = true;
          if (!force && Object.keys(this.outgoing).length > 0) {
            debug("end :: (%s) :: calling finish in 10ms once outgoing is empty", that.options.clientId);
            this.once("outgoingEmpty", setTimeout.bind(null, finish, 10));
          } else {
            debug("end :: (%s) :: immediately calling finish", that.options.clientId);
            finish();
          }
          return this;
        };
        MqttClient.prototype.removeOutgoingMessage = function(messageId) {
          var cb = this.outgoing[messageId] ? this.outgoing[messageId].cb : null;
          delete this.outgoing[messageId];
          this.outgoingStore.del({ messageId }, function() {
            cb(new Error("Message removed"));
          });
          return this;
        };
        MqttClient.prototype.reconnect = function(opts) {
          debug("client reconnect");
          var that = this;
          var f2 = function() {
            if (opts) {
              that.options.incomingStore = opts.incomingStore;
              that.options.outgoingStore = opts.outgoingStore;
            } else {
              that.options.incomingStore = null;
              that.options.outgoingStore = null;
            }
            that.incomingStore = that.options.incomingStore || new Store();
            that.outgoingStore = that.options.outgoingStore || new Store();
            that.disconnecting = false;
            that.disconnected = false;
            that._deferredReconnect = null;
            that._reconnect();
          };
          if (this.disconnecting && !this.disconnected) {
            this._deferredReconnect = f2;
          } else {
            f2();
          }
          return this;
        };
        MqttClient.prototype._reconnect = function() {
          debug("_reconnect: emitting reconnect to client");
          this.emit("reconnect");
          debug("_reconnect: calling _setupStream");
          this._setupStream();
        };
        MqttClient.prototype._setupReconnect = function() {
          var that = this;
          if (!that.disconnecting && !that.reconnectTimer && that.options.reconnectPeriod > 0) {
            if (!this.reconnecting) {
              debug("_setupReconnect :: emit `offline` state");
              this.emit("offline");
              debug("_setupReconnect :: set `reconnecting` to `true`");
              this.reconnecting = true;
            }
            debug("_setupReconnect :: setting reconnectTimer for %d ms", that.options.reconnectPeriod);
            that.reconnectTimer = setInterval(function() {
              debug("reconnectTimer :: reconnect triggered!");
              that._reconnect();
            }, that.options.reconnectPeriod);
          } else {
            debug("_setupReconnect :: doing nothing...");
          }
        };
        MqttClient.prototype._clearReconnect = function() {
          debug("_clearReconnect : clearing reconnect timer");
          if (this.reconnectTimer) {
            clearInterval(this.reconnectTimer);
            this.reconnectTimer = null;
          }
        };
        MqttClient.prototype._cleanUp = function(forced, done) {
          var opts = arguments[2];
          if (done) {
            debug("_cleanUp :: done callback provided for on stream close");
            this.stream.on("close", done);
          }
          debug("_cleanUp :: forced? %s", forced);
          if (forced) {
            if (this.options.reconnectPeriod === 0 && this.options.clean) {
              flush(this.outgoing);
            }
            debug("_cleanUp :: (%s) :: destroying stream", this.options.clientId);
            this.stream.destroy();
          } else {
            var packet = xtend({ cmd: "disconnect" }, opts);
            debug("_cleanUp :: (%s) :: call _sendPacket with disconnect packet", this.options.clientId);
            this._sendPacket(
              packet,
              setImmediate.bind(
                null,
                this.stream.end.bind(this.stream)
              )
            );
          }
          if (!this.disconnecting) {
            debug("_cleanUp :: client not disconnecting. Clearing and resetting reconnect.");
            this._clearReconnect();
            this._setupReconnect();
          }
          if (this.pingTimer !== null) {
            debug("_cleanUp :: clearing pingTimer");
            this.pingTimer.clear();
            this.pingTimer = null;
          }
          if (done && !this.connected) {
            debug("_cleanUp :: (%s) :: removing stream `done` callback `close` listener", this.options.clientId);
            this.stream.removeListener("close", done);
            done();
          }
        };
        MqttClient.prototype._sendPacket = function(packet, cb, cbStorePut) {
          debug("_sendPacket :: (%s) ::  start", this.options.clientId);
          cbStorePut = cbStorePut || nop;
          if (!this.connected) {
            debug("_sendPacket :: client not connected. Storing packet offline.");
            this._storePacket(packet, cb, cbStorePut);
            return;
          }
          this._shiftPingInterval();
          switch (packet.cmd) {
            case "publish":
              break;
            case "pubrel":
              storeAndSend(this, packet, cb, cbStorePut);
              return;
            default:
              sendPacket(this, packet, cb);
              return;
          }
          switch (packet.qos) {
            case 2:
            case 1:
              storeAndSend(this, packet, cb, cbStorePut);
              break;
            case 0:
            default:
              sendPacket(this, packet, cb);
              break;
          }
          debug("_sendPacket :: (%s) ::  end", this.options.clientId);
        };
        MqttClient.prototype._storePacket = function(packet, cb, cbStorePut) {
          debug("_storePacket :: packet: %o", packet);
          debug("_storePacket :: cb? %s", !!cb);
          cbStorePut = cbStorePut || nop;
          if ((packet.qos || 0) === 0 && this.queueQoSZero || packet.cmd !== "publish") {
            this.queue.push({ packet, cb });
          } else if (packet.qos > 0) {
            cb = this.outgoing[packet.messageId] ? this.outgoing[packet.messageId].cb : null;
            this.outgoingStore.put(packet, function(err) {
              if (err) {
                return cb && cb(err);
              }
              cbStorePut();
            });
          } else if (cb) {
            cb(new Error("No connection to broker"));
          }
        };
        MqttClient.prototype._setupPingTimer = function() {
          debug("_setupPingTimer :: keepalive %d (seconds)", this.options.keepalive);
          var that = this;
          if (!this.pingTimer && this.options.keepalive) {
            this.pingResp = true;
            this.pingTimer = reInterval(function() {
              that._checkPing();
            }, this.options.keepalive * 1e3);
          }
        };
        MqttClient.prototype._shiftPingInterval = function() {
          if (this.pingTimer && this.options.keepalive && this.options.reschedulePings) {
            this.pingTimer.reschedule(this.options.keepalive * 1e3);
          }
        };
        MqttClient.prototype._checkPing = function() {
          debug("_checkPing :: checking ping...");
          if (this.pingResp) {
            debug("_checkPing :: ping response received. Clearing flag and sending `pingreq`");
            this.pingResp = false;
            this._sendPacket({ cmd: "pingreq" });
          } else {
            debug("_checkPing :: calling _cleanUp with force true");
            this._cleanUp(true);
          }
        };
        MqttClient.prototype._handlePingresp = function() {
          this.pingResp = true;
        };
        MqttClient.prototype._handleConnack = function(packet) {
          debug("_handleConnack");
          var options = this.options;
          var version2 = options.protocolVersion;
          var rc = version2 === 5 ? packet.reasonCode : packet.returnCode;
          clearTimeout(this.connackTimer);
          if (packet.properties) {
            if (packet.properties.topicAliasMaximum) {
              if (!options.properties) {
                options.properties = {};
              }
              options.properties.topicAliasMaximum = packet.properties.topicAliasMaximum;
            }
            if (packet.properties.serverKeepAlive && options.keepalive) {
              options.keepalive = packet.properties.serverKeepAlive;
              this._shiftPingInterval();
            }
            if (packet.properties.maximumPacketSize) {
              if (!options.properties) {
                options.properties = {};
              }
              options.properties.maximumPacketSize = packet.properties.maximumPacketSize;
            }
          }
          if (rc === 0) {
            this.reconnecting = false;
            this._onConnect(packet);
          } else if (rc > 0) {
            var err = new Error("Connection refused: " + errors[rc]);
            err.code = rc;
            this.emit("error", err);
          }
        };
        MqttClient.prototype._handlePublish = function(packet, done) {
          debug("_handlePublish: packet %o", packet);
          done = typeof done !== "undefined" ? done : nop;
          var topic = packet.topic.toString();
          var message = packet.payload;
          var qos = packet.qos;
          var messageId = packet.messageId;
          var that = this;
          var options = this.options;
          var validReasonCodes = [0, 16, 128, 131, 135, 144, 145, 151, 153];
          debug("_handlePublish: qos %d", qos);
          switch (qos) {
            case 2: {
              options.customHandleAcks(topic, message, packet, function(error, code) {
                if (!(error instanceof Error)) {
                  code = error;
                  error = null;
                }
                if (error) {
                  return that.emit("error", error);
                }
                if (validReasonCodes.indexOf(code) === -1) {
                  return that.emit("error", new Error("Wrong reason code for pubrec"));
                }
                if (code) {
                  that._sendPacket({ cmd: "pubrec", messageId, reasonCode: code }, done);
                } else {
                  that.incomingStore.put(packet, function() {
                    that._sendPacket({ cmd: "pubrec", messageId }, done);
                  });
                }
              });
              break;
            }
            case 1: {
              options.customHandleAcks(topic, message, packet, function(error, code) {
                if (!(error instanceof Error)) {
                  code = error;
                  error = null;
                }
                if (error) {
                  return that.emit("error", error);
                }
                if (validReasonCodes.indexOf(code) === -1) {
                  return that.emit("error", new Error("Wrong reason code for puback"));
                }
                if (!code) {
                  that.emit("message", topic, message, packet);
                }
                that.handleMessage(packet, function(err) {
                  if (err) {
                    return done && done(err);
                  }
                  that._sendPacket({ cmd: "puback", messageId, reasonCode: code }, done);
                });
              });
              break;
            }
            case 0:
              this.emit("message", topic, message, packet);
              this.handleMessage(packet, done);
              break;
            default:
              debug("_handlePublish: unknown QoS. Doing nothing.");
              break;
          }
        };
        MqttClient.prototype.handleMessage = function(packet, callback) {
          callback();
        };
        MqttClient.prototype._handleAck = function(packet) {
          var messageId = packet.messageId;
          var type = packet.cmd;
          var response = null;
          var cb = this.outgoing[messageId] ? this.outgoing[messageId].cb : null;
          var that = this;
          var err;
          if (!cb) {
            debug("_handleAck :: Server sent an ack in error. Ignoring.");
            return;
          }
          debug("_handleAck :: packet type", type);
          switch (type) {
            case "pubcomp":
            case "puback":
              var pubackRC = packet.reasonCode;
              if (pubackRC && pubackRC > 0 && pubackRC !== 16) {
                err = new Error("Publish error: " + errors[pubackRC]);
                err.code = pubackRC;
                cb(err, packet);
              }
              delete this.outgoing[messageId];
              this.outgoingStore.del(packet, cb);
              break;
            case "pubrec":
              response = {
                cmd: "pubrel",
                qos: 2,
                messageId
              };
              var pubrecRC = packet.reasonCode;
              if (pubrecRC && pubrecRC > 0 && pubrecRC !== 16) {
                err = new Error("Publish error: " + errors[pubrecRC]);
                err.code = pubrecRC;
                cb(err, packet);
              } else {
                this._sendPacket(response);
              }
              break;
            case "suback":
              delete this.outgoing[messageId];
              for (var grantedI = 0; grantedI < packet.granted.length; grantedI++) {
                if ((packet.granted[grantedI] & 128) !== 0) {
                  var topics = this.messageIdToTopic[messageId];
                  if (topics) {
                    topics.forEach(function(topic) {
                      delete that._resubscribeTopics[topic];
                    });
                  }
                }
              }
              cb(null, packet);
              break;
            case "unsuback":
              delete this.outgoing[messageId];
              cb(null);
              break;
            default:
              that.emit("error", new Error("unrecognized packet type"));
          }
          if (this.disconnecting && Object.keys(this.outgoing).length === 0) {
            this.emit("outgoingEmpty");
          }
        };
        MqttClient.prototype._handlePubrel = function(packet, callback) {
          debug("handling pubrel packet");
          callback = typeof callback !== "undefined" ? callback : nop;
          var messageId = packet.messageId;
          var that = this;
          var comp = { cmd: "pubcomp", messageId };
          that.incomingStore.get(packet, function(err, pub) {
            if (!err) {
              that.emit("message", pub.topic, pub.payload, pub);
              that.handleMessage(pub, function(err2) {
                if (err2) {
                  return callback(err2);
                }
                that.incomingStore.del(pub, nop);
                that._sendPacket(comp, callback);
              });
            } else {
              that._sendPacket(comp, callback);
            }
          });
        };
        MqttClient.prototype._handleDisconnect = function(packet) {
          this.emit("disconnect", packet);
        };
        MqttClient.prototype._nextId = function() {
          var id = this.nextId++;
          if (this.nextId === 65536) {
            this.nextId = 1;
          }
          return id;
        };
        MqttClient.prototype.getLastMessageId = function() {
          return this.nextId === 1 ? 65535 : this.nextId - 1;
        };
        MqttClient.prototype._resubscribe = function(connack) {
          debug("_resubscribe");
          var _resubscribeTopicsKeys = Object.keys(this._resubscribeTopics);
          if (!this._firstConnection && (this.options.clean || this.options.protocolVersion === 5 && !connack.sessionPresent) && _resubscribeTopicsKeys.length > 0) {
            if (this.options.resubscribe) {
              if (this.options.protocolVersion === 5) {
                debug("_resubscribe: protocolVersion 5");
                for (var topicI = 0; topicI < _resubscribeTopicsKeys.length; topicI++) {
                  var resubscribeTopic = {};
                  resubscribeTopic[_resubscribeTopicsKeys[topicI]] = this._resubscribeTopics[_resubscribeTopicsKeys[topicI]];
                  resubscribeTopic.resubscribe = true;
                  this.subscribe(resubscribeTopic, { properties: resubscribeTopic[_resubscribeTopicsKeys[topicI]].properties });
                }
              } else {
                this._resubscribeTopics.resubscribe = true;
                this.subscribe(this._resubscribeTopics);
              }
            } else {
              this._resubscribeTopics = {};
            }
          }
          this._firstConnection = false;
        };
        MqttClient.prototype._onConnect = function(packet) {
          if (this.disconnected) {
            this.emit("connect", packet);
            return;
          }
          var that = this;
          this._setupPingTimer();
          this._resubscribe(packet);
          this.connected = true;
          function startStreamProcess() {
            var outStore = that.outgoingStore.createStream();
            function clearStoreProcessing() {
              that._storeProcessing = false;
              that._packetIdsDuringStoreProcessing = {};
            }
            that.once("close", remove2);
            outStore.on("error", function(err) {
              clearStoreProcessing();
              that.removeListener("close", remove2);
              that.emit("error", err);
            });
            function remove2() {
              outStore.destroy();
              outStore = null;
              clearStoreProcessing();
            }
            function storeDeliver() {
              if (!outStore) {
                return;
              }
              that._storeProcessing = true;
              var packet2 = outStore.read(1);
              var cb;
              if (!packet2) {
                outStore.once("readable", storeDeliver);
                return;
              }
              if (that._packetIdsDuringStoreProcessing[packet2.messageId]) {
                storeDeliver();
                return;
              }
              if (!that.disconnecting && !that.reconnectTimer) {
                cb = that.outgoing[packet2.messageId] ? that.outgoing[packet2.messageId].cb : null;
                that.outgoing[packet2.messageId] = {
                  volatile: false,
                  cb: function(err, status) {
                    if (cb) {
                      cb(err, status);
                    }
                    storeDeliver();
                  }
                };
                that._packetIdsDuringStoreProcessing[packet2.messageId] = true;
                that._sendPacket(packet2);
              } else if (outStore.destroy) {
                outStore.destroy();
              }
            }
            outStore.on("end", function() {
              var allProcessed = true;
              for (var id in that._packetIdsDuringStoreProcessing) {
                if (!that._packetIdsDuringStoreProcessing[id]) {
                  allProcessed = false;
                  break;
                }
              }
              if (allProcessed) {
                clearStoreProcessing();
                that.removeListener("close", remove2);
                that.emit("connect", packet);
              } else {
                startStreamProcess();
              }
            });
            storeDeliver();
          }
          startStreamProcess();
        };
        module3.exports = MqttClient;
      }).call(this, require2("_process"), typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, { "./store": 7, "./validations": 8, "_process": 101, "debug": 17, "events": 83, "inherits": 88, "mqtt-packet": 93, "readable-stream": 115, "reinterval": 116, "xtend": 140 }], 2: [function(require2, module3, exports3) {
      (function(Buffer) {
        var Transform = require2("readable-stream").Transform;
        var duplexify = require2("duplexify");
        var base64 = require2("base64-js");
        var my2;
        var proxy;
        var stream;
        var isInitialized = false;
        function buildProxy() {
          var proxy2 = new Transform();
          proxy2._write = function(chunk, encoding, next) {
            my2.sendSocketMessage({
              data: chunk.buffer,
              success: function() {
                next();
              },
              fail: function() {
                next(new Error());
              }
            });
          };
          proxy2._flush = function socketEnd(done) {
            my2.closeSocket({
              success: function() {
                done();
              }
            });
          };
          return proxy2;
        }
        function setDefaultOpts(opts) {
          if (!opts.hostname) {
            opts.hostname = "localhost";
          }
          if (!opts.path) {
            opts.path = "/";
          }
          if (!opts.wsOptions) {
            opts.wsOptions = {};
          }
        }
        function buildUrl(opts, client) {
          var protocol = opts.protocol === "alis" ? "wss" : "ws";
          var url = protocol + "://" + opts.hostname + opts.path;
          if (opts.port && opts.port !== 80 && opts.port !== 443) {
            url = protocol + "://" + opts.hostname + ":" + opts.port + opts.path;
          }
          if (typeof opts.transformWsUrl === "function") {
            url = opts.transformWsUrl(url, opts, client);
          }
          return url;
        }
        function bindEventHandler() {
          if (isInitialized)
            return;
          isInitialized = true;
          my2.onSocketOpen(function() {
            stream.setReadable(proxy);
            stream.setWritable(proxy);
            stream.emit("connect");
          });
          my2.onSocketMessage(function(res) {
            if (typeof res.data === "string") {
              var array = base64.toByteArray(res.data);
              var buffer2 = Buffer.from(array);
              proxy.push(buffer2);
            } else {
              var reader = new FileReader();
              reader.addEventListener("load", function() {
                var data = reader.result;
                if (data instanceof ArrayBuffer)
                  data = Buffer.from(data);
                else
                  data = Buffer.from(data, "utf8");
                proxy.push(data);
              });
              reader.readAsArrayBuffer(res.data);
            }
          });
          my2.onSocketClose(function() {
            stream.end();
            stream.destroy();
          });
          my2.onSocketError(function(res) {
            stream.destroy(res);
          });
        }
        function buildStream(client, opts) {
          opts.hostname = opts.hostname || opts.host;
          if (!opts.hostname) {
            throw new Error("Could not determine host. Specify host manually.");
          }
          var websocketSubProtocol = opts.protocolId === "MQIsdp" && opts.protocolVersion === 3 ? "mqttv3.1" : "mqtt";
          setDefaultOpts(opts);
          var url = buildUrl(opts, client);
          my2 = opts.my;
          my2.connectSocket({
            url,
            protocols: websocketSubProtocol
          });
          proxy = buildProxy();
          stream = duplexify.obj();
          bindEventHandler();
          return stream;
        }
        module3.exports = buildStream;
      }).call(this, require2("buffer").Buffer);
    }, { "base64-js": 10, "buffer": 13, "duplexify": 19, "readable-stream": 115 }], 3: [function(require2, module3, exports3) {
      var net = require2("net");
      var debug = require2("debug")("mqttjs:tcp");
      function streamBuilder(client, opts) {
        var port, host2;
        opts.port = opts.port || 1883;
        opts.hostname = opts.hostname || opts.host || "localhost";
        port = opts.port;
        host2 = opts.hostname;
        debug("port %d and host %s", port, host2);
        return net.createConnection(port, host2);
      }
      module3.exports = streamBuilder;
    }, { "debug": 17, "net": 12 }], 4: [function(require2, module3, exports3) {
      var tls = require2("tls");
      var debug = require2("debug")("mqttjs:tls");
      function buildBuilder(mqttClient, opts) {
        var connection;
        opts.port = opts.port || 8883;
        opts.host = opts.hostname || opts.host || "localhost";
        opts.servername = opts.host;
        opts.rejectUnauthorized = opts.rejectUnauthorized !== false;
        delete opts.path;
        debug("port %d host %s rejectUnauthorized %b", opts.port, opts.host, opts.rejectUnauthorized);
        connection = tls.connect(opts);
        connection.on("secureConnect", function() {
          if (opts.rejectUnauthorized && !connection.authorized) {
            connection.emit("error", new Error("TLS not authorized"));
          } else {
            connection.removeListener("error", handleTLSerrors);
          }
        });
        function handleTLSerrors(err) {
          if (opts.rejectUnauthorized) {
            mqttClient.emit("error", err);
          }
          connection.end();
        }
        connection.on("error", handleTLSerrors);
        return connection;
      }
      module3.exports = buildBuilder;
    }, { "debug": 17, "tls": 12 }], 5: [function(require2, module3, exports3) {
      (function(process) {
        const WS = require2("ws");
        const debug = require2("debug")("mqttjs:ws");
        const duplexify = require2("duplexify");
        const Buffer = require2("safe-buffer").Buffer;
        const urlModule = require2("url");
        const Transform = require2("readable-stream").Transform;
        let WSS_OPTIONS = [
          "rejectUnauthorized",
          "ca",
          "cert",
          "key",
          "pfx",
          "passphrase"
        ];
        const IS_BROWSER = typeof process !== "undefined" && process.title === "browser" || typeof __webpack_require__ === "function";
        function buildUrl(opts, client) {
          let url = opts.protocol + "://" + opts.hostname + ":" + opts.port + opts.path;
          if (typeof opts.transformWsUrl === "function") {
            url = opts.transformWsUrl(url, opts, client);
          }
          return url;
        }
        function setDefaultOpts(opts) {
          let options = opts;
          if (!opts.hostname) {
            options.hostname = "localhost";
          }
          if (!opts.port) {
            if (opts.protocol === "wss") {
              options.port = 443;
            } else {
              options.port = 80;
            }
          }
          if (!opts.path) {
            options.path = "/";
          }
          if (!opts.wsOptions) {
            options.wsOptions = {};
          }
          if (!IS_BROWSER && opts.protocol === "wss") {
            WSS_OPTIONS.forEach(function(prop) {
              if (opts.hasOwnProperty(prop) && !opts.wsOptions.hasOwnProperty(prop)) {
                options.wsOptions[prop] = opts[prop];
              }
            });
          }
          return options;
        }
        function setDefaultBrowserOpts(opts) {
          let options = setDefaultOpts(opts);
          if (!options.hostname) {
            options.hostname = options.host;
          }
          if (!options.hostname) {
            if (typeof document === "undefined") {
              throw new Error("Could not determine host. Specify host manually.");
            }
            const parsed = urlModule.parse(document.URL);
            options.hostname = parsed.hostname;
            if (!options.port) {
              options.port = parsed.port;
            }
          }
          if (options.objectMode === void 0) {
            options.objectMode = !(options.binary === true || options.binary === void 0);
          }
          return options;
        }
        function createWebSocket(client, url, opts) {
          debug("createWebSocket");
          debug("protocol: " + opts.protocolId + " " + opts.protocolVersion);
          const websocketSubProtocol = opts.protocolId === "MQIsdp" && opts.protocolVersion === 3 ? "mqttv3.1" : "mqtt";
          debug("creating new Websocket for url: " + url + " and protocol: " + websocketSubProtocol);
          let socket = new WS(url, [websocketSubProtocol], opts.wsOptions);
          return socket;
        }
        function createBrowserWebSocket(client, opts) {
          const websocketSubProtocol = opts.protocolId === "MQIsdp" && opts.protocolVersion === 3 ? "mqttv3.1" : "mqtt";
          let url = buildUrl(opts, client);
          let socket = new WebSocket(url, [websocketSubProtocol]);
          socket.binaryType = "arraybuffer";
          return socket;
        }
        function streamBuilder(client, opts) {
          debug("streamBuilder");
          let options = setDefaultOpts(opts);
          const url = buildUrl(options, client);
          let socket = createWebSocket(client, url, options);
          let webSocketStream = WS.createWebSocketStream(socket, options.wsOptions);
          webSocketStream.url = url;
          return webSocketStream;
        }
        function browserStreamBuilder(client, opts) {
          debug("browserStreamBuilder");
          let stream;
          let options = setDefaultBrowserOpts(opts);
          const bufferSize = options.browserBufferSize || 1024 * 512;
          const bufferTimeout = opts.browserBufferTimeout || 1e3;
          const coerceToBuffer = !opts.objectMode;
          let socket = createBrowserWebSocket(client, opts);
          let proxy = buildProxy(opts, socketWriteBrowser, socketEndBrowser);
          if (!opts.objectMode) {
            proxy._writev = writev;
          }
          proxy.on("close", () => {
            socket.close();
          });
          const eventListenerSupport = typeof socket.addEventListener === "undefined";
          if (socket.readyState === socket.OPEN) {
            stream = proxy;
          } else {
            stream = stream = duplexify(void 0, void 0, opts);
            if (!opts.objectMode) {
              stream._writev = writev;
            }
            if (eventListenerSupport) {
              socket.addEventListener("open", onopen);
            } else {
              socket.onopen = onopen;
            }
          }
          stream.socket = socket;
          if (eventListenerSupport) {
            socket.addEventListener("close", onclose);
            socket.addEventListener("error", onerror);
            socket.addEventListener("message", onmessage);
          } else {
            socket.onclose = onclose;
            socket.onerror = onerror;
            socket.onmessage = onmessage;
          }
          function buildProxy(options2, socketWrite, socketEnd) {
            let proxy2 = new Transform({
              objectModeMode: options2.objectMode
            });
            proxy2._write = socketWrite;
            proxy2._flush = socketEnd;
            return proxy2;
          }
          function onopen() {
            stream.setReadable(proxy);
            stream.setWritable(proxy);
            stream.emit("connect");
          }
          function onclose() {
            stream.end();
            stream.destroy();
          }
          function onerror(err) {
            stream.destroy(err);
          }
          function onmessage(event) {
            let data = event.data;
            if (data instanceof ArrayBuffer)
              data = Buffer.from(data);
            else
              data = Buffer.from(data, "utf8");
            proxy.push(data);
          }
          function writev(chunks, cb) {
            const buffers = new Array(chunks.length);
            for (let i = 0; i < chunks.length; i++) {
              if (typeof chunks[i].chunk === "string") {
                buffers[i] = Buffer.from(chunks[i], "utf8");
              } else {
                buffers[i] = chunks[i].chunk;
              }
            }
            this._write(Buffer.concat(buffers), "binary", cb);
          }
          function socketWriteBrowser(chunk, enc, next) {
            if (socket.bufferedAmount > bufferSize) {
              setTimeout(socketWriteBrowser, bufferTimeout, chunk, enc, next);
            }
            if (coerceToBuffer && typeof chunk === "string") {
              chunk = Buffer.from(chunk, "utf8");
            }
            try {
              socket.send(chunk);
            } catch (err) {
              return next(err);
            }
            next();
          }
          function socketEndBrowser(done) {
            socket.close();
            done();
          }
          return stream;
        }
        if (IS_BROWSER) {
          module3.exports = browserStreamBuilder;
        } else {
          module3.exports = streamBuilder;
        }
      }).call(this, require2("_process"));
    }, { "_process": 101, "debug": 17, "duplexify": 19, "readable-stream": 115, "safe-buffer": 117, "url": 132, "ws": 139 }], 6: [function(require2, module3, exports3) {
      (function(Buffer) {
        var Transform = require2("readable-stream").Transform;
        var duplexify = require2("duplexify");
        var socketTask;
        var proxy;
        var stream;
        function buildProxy() {
          var proxy2 = new Transform();
          proxy2._write = function(chunk, encoding, next) {
            socketTask.send({
              data: chunk.buffer,
              success: function() {
                next();
              },
              fail: function(errMsg) {
                next(new Error(errMsg));
              }
            });
          };
          proxy2._flush = function socketEnd(done) {
            socketTask.close({
              success: function() {
                done();
              }
            });
          };
          return proxy2;
        }
        function setDefaultOpts(opts) {
          if (!opts.hostname) {
            opts.hostname = "localhost";
          }
          if (!opts.path) {
            opts.path = "/";
          }
          if (!opts.wsOptions) {
            opts.wsOptions = {};
          }
        }
        function buildUrl(opts, client) {
          var protocol = opts.protocol === "wxs" ? "wss" : "ws";
          var url = protocol + "://" + opts.hostname + opts.path;
          if (opts.port && opts.port !== 80 && opts.port !== 443) {
            url = protocol + "://" + opts.hostname + ":" + opts.port + opts.path;
          }
          if (typeof opts.transformWsUrl === "function") {
            url = opts.transformWsUrl(url, opts, client);
          }
          return url;
        }
        function bindEventHandler() {
          socketTask.onOpen(function() {
            stream.setReadable(proxy);
            stream.setWritable(proxy);
            stream.emit("connect");
          });
          socketTask.onMessage(function(res) {
            var data = res.data;
            if (data instanceof ArrayBuffer)
              data = Buffer.from(data);
            else
              data = Buffer.from(data, "utf8");
            proxy.push(data);
          });
          socketTask.onClose(function() {
            stream.end();
            stream.destroy();
          });
          socketTask.onError(function(res) {
            stream.destroy(new Error(res.errMsg));
          });
        }
        function buildStream(client, opts) {
          opts.hostname = opts.hostname || opts.host;
          if (!opts.hostname) {
            throw new Error("Could not determine host. Specify host manually.");
          }
          var websocketSubProtocol = opts.protocolId === "MQIsdp" && opts.protocolVersion === 3 ? "mqttv3.1" : "mqtt";
          setDefaultOpts(opts);
          var url = buildUrl(opts, client);
          socketTask = wx$1.connectSocket({
            url,
            protocols: [websocketSubProtocol]
          });
          proxy = buildProxy();
          stream = duplexify.obj();
          stream._destroy = function(err, cb) {
            socketTask.close({
              success: function() {
                cb && cb(err);
              }
            });
          };
          var destroyRef = stream.destroy;
          stream.destroy = function() {
            stream.destroy = destroyRef;
            var self2 = this;
            setTimeout(function() {
              socketTask.close({
                fail: function() {
                  self2._destroy(new Error());
                }
              });
            }, 0);
          }.bind(stream);
          bindEventHandler();
          return stream;
        }
        module3.exports = buildStream;
      }).call(this, require2("buffer").Buffer);
    }, { "buffer": 13, "duplexify": 19, "readable-stream": 115 }], 7: [function(require2, module3, exports3) {
      var xtend = require2("xtend");
      var Readable = require2("readable-stream").Readable;
      var streamsOpts = { objectMode: true };
      var defaultStoreOptions = {
        clean: true
      };
      var Map2 = require2("es6-map");
      function Store(options) {
        if (!(this instanceof Store)) {
          return new Store(options);
        }
        this.options = options || {};
        this.options = xtend(defaultStoreOptions, options);
        this._inflights = new Map2();
      }
      Store.prototype.put = function(packet, cb) {
        this._inflights.set(packet.messageId, packet);
        if (cb) {
          cb();
        }
        return this;
      };
      Store.prototype.createStream = function() {
        var stream = new Readable(streamsOpts);
        var destroyed = false;
        var values = [];
        var i = 0;
        this._inflights.forEach(function(value, key) {
          values.push(value);
        });
        stream._read = function() {
          if (!destroyed && i < values.length) {
            this.push(values[i++]);
          } else {
            this.push(null);
          }
        };
        stream.destroy = function() {
          if (destroyed) {
            return;
          }
          var self2 = this;
          destroyed = true;
          setTimeout(function() {
            self2.emit("close");
          }, 0);
        };
        return stream;
      };
      Store.prototype.del = function(packet, cb) {
        packet = this._inflights.get(packet.messageId);
        if (packet) {
          this._inflights.delete(packet.messageId);
          cb(null, packet);
        } else if (cb) {
          cb(new Error("missing packet"));
        }
        return this;
      };
      Store.prototype.get = function(packet, cb) {
        packet = this._inflights.get(packet.messageId);
        if (packet) {
          cb(null, packet);
        } else if (cb) {
          cb(new Error("missing packet"));
        }
        return this;
      };
      Store.prototype.close = function(cb) {
        if (this.options.clean) {
          this._inflights = null;
        }
        if (cb) {
          cb();
        }
      };
      module3.exports = Store;
    }, { "es6-map": 68, "readable-stream": 115, "xtend": 140 }], 8: [function(require2, module3, exports3) {
      function validateTopic(topic) {
        var parts = topic.split("/");
        for (var i = 0; i < parts.length; i++) {
          if (parts[i] === "+") {
            continue;
          }
          if (parts[i] === "#") {
            return i === parts.length - 1;
          }
          if (parts[i].indexOf("+") !== -1 || parts[i].indexOf("#") !== -1) {
            return false;
          }
        }
        return true;
      }
      function validateTopics(topics) {
        if (topics.length === 0) {
          return "empty_topic_list";
        }
        for (var i = 0; i < topics.length; i++) {
          if (!validateTopic(topics[i])) {
            return topics[i];
          }
        }
        return null;
      }
      module3.exports = {
        validateTopics
      };
    }, {}], 9: [function(require2, module3, exports3) {
      (function(process) {
        var MqttClient = require2("../client");
        var Store = require2("../store");
        var url = require2("url");
        var xtend = require2("xtend");
        var debug = require2("debug")("mqttjs");
        var protocols2 = {};
        if (typeof process !== "undefined" && process.title !== "browser" || typeof __webpack_require__ === "function") {
          protocols2.mqtt = require2("./tcp");
          protocols2.tcp = require2("./tcp");
          protocols2.ssl = require2("./tls");
          protocols2.tls = require2("./tls");
          protocols2.mqtts = require2("./tls");
        } else {
          protocols2.wx = require2("./wx");
          protocols2.wxs = require2("./wx");
          protocols2.ali = require2("./ali");
          protocols2.alis = require2("./ali");
        }
        protocols2.ws = require2("./ws");
        protocols2.wss = require2("./ws");
        function parseAuthOptions(opts) {
          var matches;
          if (opts.auth) {
            matches = opts.auth.match(/^(.+):(.+)$/);
            if (matches) {
              opts.username = matches[1];
              opts.password = matches[2];
            } else {
              opts.username = opts.auth;
            }
          }
        }
        function connect(brokerUrl, opts) {
          debug("connecting to an MQTT broker...");
          if (typeof brokerUrl === "object" && !opts) {
            opts = brokerUrl;
            brokerUrl = null;
          }
          opts = opts || {};
          if (brokerUrl) {
            var parsed = url.parse(brokerUrl, true);
            if (parsed.port != null) {
              parsed.port = Number(parsed.port);
            }
            opts = xtend(parsed, opts);
            if (opts.protocol === null) {
              throw new Error("Missing protocol");
            }
            opts.protocol = opts.protocol.replace(/:$/, "");
          }
          parseAuthOptions(opts);
          if (opts.query && typeof opts.query.clientId === "string") {
            opts.clientId = opts.query.clientId;
          }
          if (opts.cert && opts.key) {
            if (opts.protocol) {
              if (["mqtts", "wss", "wxs", "alis"].indexOf(opts.protocol) === -1) {
                switch (opts.protocol) {
                  case "mqtt":
                    opts.protocol = "mqtts";
                    break;
                  case "ws":
                    opts.protocol = "wss";
                    break;
                  case "wx":
                    opts.protocol = "wxs";
                    break;
                  case "ali":
                    opts.protocol = "alis";
                    break;
                  default:
                    throw new Error('Unknown protocol for secure connection: "' + opts.protocol + '"!');
                }
              }
            } else {
              throw new Error("Missing secure protocol key");
            }
          }
          if (!protocols2[opts.protocol]) {
            var isSecure = ["mqtts", "wss"].indexOf(opts.protocol) !== -1;
            opts.protocol = [
              "mqtt",
              "mqtts",
              "ws",
              "wss",
              "wx",
              "wxs",
              "ali",
              "alis"
            ].filter(function(key, index2) {
              if (isSecure && index2 % 2 === 0) {
                return false;
              }
              return typeof protocols2[key] === "function";
            })[0];
          }
          if (opts.clean === false && !opts.clientId) {
            throw new Error("Missing clientId for unclean clients");
          }
          if (opts.protocol) {
            opts.defaultProtocol = opts.protocol;
          }
          function wrapper(client2) {
            if (opts.servers) {
              if (!client2._reconnectCount || client2._reconnectCount === opts.servers.length) {
                client2._reconnectCount = 0;
              }
              opts.host = opts.servers[client2._reconnectCount].host;
              opts.port = opts.servers[client2._reconnectCount].port;
              opts.protocol = !opts.servers[client2._reconnectCount].protocol ? opts.defaultProtocol : opts.servers[client2._reconnectCount].protocol;
              opts.hostname = opts.host;
              client2._reconnectCount++;
            }
            debug("calling streambuilder for", opts.protocol);
            return protocols2[opts.protocol](client2, opts);
          }
          var client = new MqttClient(wrapper, opts);
          client.on("error", function() {
          });
          return client;
        }
        module3.exports = connect;
        module3.exports.connect = connect;
        module3.exports.MqttClient = MqttClient;
        module3.exports.Store = Store;
      }).call(this, require2("_process"));
    }, { "../client": 1, "../store": 7, "./ali": 2, "./tcp": 3, "./tls": 4, "./ws": 5, "./wx": 6, "_process": 101, "debug": 17, "url": 132, "xtend": 140 }], 10: [function(require2, module3, exports3) {
      exports3.byteLength = byteLength;
      exports3.toByteArray = toByteArray;
      exports3.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (var i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b642) {
        var len2 = b642.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b642.indexOf("=");
        if (validLen === -1)
          validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b642) {
        var lens = getLens(b642);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b642, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b642) {
        var tmp;
        var lens = getLens(b642);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b642, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b642.charCodeAt(i2)] << 18 | revLookup[b642.charCodeAt(i2 + 1)] << 12 | revLookup[b642.charCodeAt(i2 + 2)] << 6 | revLookup[b642.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b642.charCodeAt(i2)] << 2 | revLookup[b642.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b642.charCodeAt(i2)] << 10 | revLookup[b642.charCodeAt(i2 + 1)] << 4 | revLookup[b642.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i2 = start; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(
            uint8,
            i2,
            i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength
          ));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
          );
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
          );
        }
        return parts.join("");
      }
    }, {}], 11: [function(require2, module3, exports3) {
      var DuplexStream = require2("readable-stream/duplex"), util = require2("util"), Buffer = require2("safe-buffer").Buffer;
      function BufferList(callback) {
        if (!(this instanceof BufferList))
          return new BufferList(callback);
        this._bufs = [];
        this.length = 0;
        if (typeof callback == "function") {
          this._callback = callback;
          var piper = function piper2(err) {
            if (this._callback) {
              this._callback(err);
              this._callback = null;
            }
          }.bind(this);
          this.on("pipe", function onPipe(src) {
            src.on("error", piper);
          });
          this.on("unpipe", function onUnpipe(src) {
            src.removeListener("error", piper);
          });
        } else {
          this.append(callback);
        }
        DuplexStream.call(this);
      }
      util.inherits(BufferList, DuplexStream);
      BufferList.prototype._offset = function _offset(offset) {
        var tot = 0, i = 0, _t;
        if (offset === 0)
          return [0, 0];
        for (; i < this._bufs.length; i++) {
          _t = tot + this._bufs[i].length;
          if (offset < _t || i == this._bufs.length - 1)
            return [i, offset - tot];
          tot = _t;
        }
      };
      BufferList.prototype.append = function append(buf) {
        var i = 0;
        if (Buffer.isBuffer(buf)) {
          this._appendBuffer(buf);
        } else if (Array.isArray(buf)) {
          for (; i < buf.length; i++)
            this.append(buf[i]);
        } else if (buf instanceof BufferList) {
          for (; i < buf._bufs.length; i++)
            this.append(buf._bufs[i]);
        } else if (buf != null) {
          if (typeof buf == "number")
            buf = buf.toString();
          this._appendBuffer(Buffer.from(buf));
        }
        return this;
      };
      BufferList.prototype._appendBuffer = function appendBuffer(buf) {
        this._bufs.push(buf);
        this.length += buf.length;
      };
      BufferList.prototype._write = function _write(buf, encoding, callback) {
        this._appendBuffer(buf);
        if (typeof callback == "function")
          callback();
      };
      BufferList.prototype._read = function _read(size2) {
        if (!this.length)
          return this.push(null);
        size2 = Math.min(size2, this.length);
        this.push(this.slice(0, size2));
        this.consume(size2);
      };
      BufferList.prototype.end = function end(chunk) {
        DuplexStream.prototype.end.call(this, chunk);
        if (this._callback) {
          this._callback(null, this.slice());
          this._callback = null;
        }
      };
      BufferList.prototype.get = function get2(index2) {
        return this.slice(index2, index2 + 1)[0];
      };
      BufferList.prototype.slice = function slice(start, end) {
        if (typeof start == "number" && start < 0)
          start += this.length;
        if (typeof end == "number" && end < 0)
          end += this.length;
        return this.copy(null, 0, start, end);
      };
      BufferList.prototype.copy = function copy(dst, dstStart, srcStart, srcEnd) {
        if (typeof srcStart != "number" || srcStart < 0)
          srcStart = 0;
        if (typeof srcEnd != "number" || srcEnd > this.length)
          srcEnd = this.length;
        if (srcStart >= this.length)
          return dst || Buffer.alloc(0);
        if (srcEnd <= 0)
          return dst || Buffer.alloc(0);
        var copy2 = !!dst, off = this._offset(srcStart), len = srcEnd - srcStart, bytes = len, bufoff = copy2 && dstStart || 0, start = off[1], l, i;
        if (srcStart === 0 && srcEnd == this.length) {
          if (!copy2) {
            return this._bufs.length === 1 ? this._bufs[0] : Buffer.concat(this._bufs, this.length);
          }
          for (i = 0; i < this._bufs.length; i++) {
            this._bufs[i].copy(dst, bufoff);
            bufoff += this._bufs[i].length;
          }
          return dst;
        }
        if (bytes <= this._bufs[off[0]].length - start) {
          return copy2 ? this._bufs[off[0]].copy(dst, dstStart, start, start + bytes) : this._bufs[off[0]].slice(start, start + bytes);
        }
        if (!copy2)
          dst = Buffer.allocUnsafe(len);
        for (i = off[0]; i < this._bufs.length; i++) {
          l = this._bufs[i].length - start;
          if (bytes > l) {
            this._bufs[i].copy(dst, bufoff, start);
          } else {
            this._bufs[i].copy(dst, bufoff, start, start + bytes);
            break;
          }
          bufoff += l;
          bytes -= l;
          if (start)
            start = 0;
        }
        return dst;
      };
      BufferList.prototype.shallowSlice = function shallowSlice(start, end) {
        start = start || 0;
        end = end || this.length;
        if (start < 0)
          start += this.length;
        if (end < 0)
          end += this.length;
        var startOffset = this._offset(start), endOffset = this._offset(end), buffers = this._bufs.slice(startOffset[0], endOffset[0] + 1);
        if (endOffset[1] == 0)
          buffers.pop();
        else
          buffers[buffers.length - 1] = buffers[buffers.length - 1].slice(0, endOffset[1]);
        if (startOffset[1] != 0)
          buffers[0] = buffers[0].slice(startOffset[1]);
        return new BufferList(buffers);
      };
      BufferList.prototype.toString = function toString(encoding, start, end) {
        return this.slice(start, end).toString(encoding);
      };
      BufferList.prototype.consume = function consume(bytes) {
        while (this._bufs.length) {
          if (bytes >= this._bufs[0].length) {
            bytes -= this._bufs[0].length;
            this.length -= this._bufs[0].length;
            this._bufs.shift();
          } else {
            this._bufs[0] = this._bufs[0].slice(bytes);
            this.length -= bytes;
            break;
          }
        }
        return this;
      };
      BufferList.prototype.duplicate = function duplicate() {
        var i = 0, copy = new BufferList();
        for (; i < this._bufs.length; i++)
          copy.append(this._bufs[i]);
        return copy;
      };
      BufferList.prototype.destroy = function destroy() {
        this._bufs.length = 0;
        this.length = 0;
        this.push(null);
      };
      (function() {
        var methods = {
          "readDoubleBE": 8,
          "readDoubleLE": 8,
          "readFloatBE": 4,
          "readFloatLE": 4,
          "readInt32BE": 4,
          "readInt32LE": 4,
          "readUInt32BE": 4,
          "readUInt32LE": 4,
          "readInt16BE": 2,
          "readInt16LE": 2,
          "readUInt16BE": 2,
          "readUInt16LE": 2,
          "readInt8": 1,
          "readUInt8": 1
        };
        for (var m in methods) {
          (function(m2) {
            BufferList.prototype[m2] = function(offset) {
              return this.slice(offset, offset + methods[m2])[m2](0);
            };
          })(m);
        }
      })();
      module3.exports = BufferList;
    }, { "readable-stream/duplex": 106, "safe-buffer": 117, "util": 137 }], 12: [function(require2, module3, exports3) {
    }, {}], 13: [function(require2, module3, exports3) {
      (function(Buffer) {
        var base64 = require2("base64-js");
        var ieee754 = require2("ieee754");
        exports3.Buffer = Buffer;
        exports3.SlowBuffer = SlowBuffer;
        exports3.INSPECT_MAX_BYTES = 50;
        var K_MAX_LENGTH = 2147483647;
        exports3.kMaxLength = K_MAX_LENGTH;
        Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
        if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
          console.error(
            "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
          );
        }
        function typedArraySupport() {
          try {
            var arr = new Uint8Array(1);
            arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function() {
              return 42;
            } };
            return arr.foo() === 42;
          } catch (e2) {
            return false;
          }
        }
        Object.defineProperty(Buffer.prototype, "parent", {
          enumerable: true,
          get: function() {
            if (!Buffer.isBuffer(this))
              return void 0;
            return this.buffer;
          }
        });
        Object.defineProperty(Buffer.prototype, "offset", {
          enumerable: true,
          get: function() {
            if (!Buffer.isBuffer(this))
              return void 0;
            return this.byteOffset;
          }
        });
        function createBuffer(length) {
          if (length > K_MAX_LENGTH) {
            throw new RangeError('The value "' + length + '" is invalid for option "size"');
          }
          var buf = new Uint8Array(length);
          buf.__proto__ = Buffer.prototype;
          return buf;
        }
        function Buffer(arg, encodingOrOffset, length) {
          if (typeof arg === "number") {
            if (typeof encodingOrOffset === "string") {
              throw new TypeError(
                'The "string" argument must be of type string. Received type number'
              );
            }
            return allocUnsafe(arg);
          }
          return from(arg, encodingOrOffset, length);
        }
        if (typeof Symbol !== "undefined" && Symbol.species != null && Buffer[Symbol.species] === Buffer) {
          Object.defineProperty(Buffer, Symbol.species, {
            value: null,
            configurable: true,
            enumerable: false,
            writable: false
          });
        }
        Buffer.poolSize = 8192;
        function from(value, encodingOrOffset, length) {
          if (typeof value === "string") {
            return fromString(value, encodingOrOffset);
          }
          if (ArrayBuffer.isView(value)) {
            return fromArrayLike(value);
          }
          if (value == null) {
            throw TypeError(
              "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
            );
          }
          if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
            return fromArrayBuffer(value, encodingOrOffset, length);
          }
          if (typeof value === "number") {
            throw new TypeError(
              'The "value" argument must not be of type number. Received type number'
            );
          }
          var valueOf = value.valueOf && value.valueOf();
          if (valueOf != null && valueOf !== value) {
            return Buffer.from(valueOf, encodingOrOffset, length);
          }
          var b = fromObject(value);
          if (b)
            return b;
          if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
            return Buffer.from(
              value[Symbol.toPrimitive]("string"),
              encodingOrOffset,
              length
            );
          }
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
          );
        }
        Buffer.from = function(value, encodingOrOffset, length) {
          return from(value, encodingOrOffset, length);
        };
        Buffer.prototype.__proto__ = Uint8Array.prototype;
        Buffer.__proto__ = Uint8Array;
        function assertSize(size2) {
          if (typeof size2 !== "number") {
            throw new TypeError('"size" argument must be of type number');
          } else if (size2 < 0) {
            throw new RangeError('The value "' + size2 + '" is invalid for option "size"');
          }
        }
        function alloc(size2, fill, encoding) {
          assertSize(size2);
          if (size2 <= 0) {
            return createBuffer(size2);
          }
          if (fill !== void 0) {
            return typeof encoding === "string" ? createBuffer(size2).fill(fill, encoding) : createBuffer(size2).fill(fill);
          }
          return createBuffer(size2);
        }
        Buffer.alloc = function(size2, fill, encoding) {
          return alloc(size2, fill, encoding);
        };
        function allocUnsafe(size2) {
          assertSize(size2);
          return createBuffer(size2 < 0 ? 0 : checked(size2) | 0);
        }
        Buffer.allocUnsafe = function(size2) {
          return allocUnsafe(size2);
        };
        Buffer.allocUnsafeSlow = function(size2) {
          return allocUnsafe(size2);
        };
        function fromString(string, encoding) {
          if (typeof encoding !== "string" || encoding === "") {
            encoding = "utf8";
          }
          if (!Buffer.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          var length = byteLength(string, encoding) | 0;
          var buf = createBuffer(length);
          var actual = buf.write(string, encoding);
          if (actual !== length) {
            buf = buf.slice(0, actual);
          }
          return buf;
        }
        function fromArrayLike(array) {
          var length = array.length < 0 ? 0 : checked(array.length) | 0;
          var buf = createBuffer(length);
          for (var i = 0; i < length; i += 1) {
            buf[i] = array[i] & 255;
          }
          return buf;
        }
        function fromArrayBuffer(array, byteOffset, length) {
          if (byteOffset < 0 || array.byteLength < byteOffset) {
            throw new RangeError('"offset" is outside of buffer bounds');
          }
          if (array.byteLength < byteOffset + (length || 0)) {
            throw new RangeError('"length" is outside of buffer bounds');
          }
          var buf;
          if (byteOffset === void 0 && length === void 0) {
            buf = new Uint8Array(array);
          } else if (length === void 0) {
            buf = new Uint8Array(array, byteOffset);
          } else {
            buf = new Uint8Array(array, byteOffset, length);
          }
          buf.__proto__ = Buffer.prototype;
          return buf;
        }
        function fromObject(obj) {
          if (Buffer.isBuffer(obj)) {
            var len = checked(obj.length) | 0;
            var buf = createBuffer(len);
            if (buf.length === 0) {
              return buf;
            }
            obj.copy(buf, 0, 0, len);
            return buf;
          }
          if (obj.length !== void 0) {
            if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
              return createBuffer(0);
            }
            return fromArrayLike(obj);
          }
          if (obj.type === "Buffer" && Array.isArray(obj.data)) {
            return fromArrayLike(obj.data);
          }
        }
        function checked(length) {
          if (length >= K_MAX_LENGTH) {
            throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
          }
          return length | 0;
        }
        function SlowBuffer(length) {
          if (+length != length) {
            length = 0;
          }
          return Buffer.alloc(+length);
        }
        Buffer.isBuffer = function isBuffer(b) {
          return b != null && b._isBuffer === true && b !== Buffer.prototype;
        };
        Buffer.compare = function compare(a, b) {
          if (isInstance(a, Uint8Array))
            a = Buffer.from(a, a.offset, a.byteLength);
          if (isInstance(b, Uint8Array))
            b = Buffer.from(b, b.offset, b.byteLength);
          if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
            throw new TypeError(
              'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
            );
          }
          if (a === b)
            return 0;
          var x = a.length;
          var y = b.length;
          for (var i = 0, len = Math.min(x, y); i < len; ++i) {
            if (a[i] !== b[i]) {
              x = a[i];
              y = b[i];
              break;
            }
          }
          if (x < y)
            return -1;
          if (y < x)
            return 1;
          return 0;
        };
        Buffer.isEncoding = function isEncoding(encoding) {
          switch (String(encoding).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return true;
            default:
              return false;
          }
        };
        Buffer.concat = function concat(list, length) {
          if (!Array.isArray(list)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          }
          if (list.length === 0) {
            return Buffer.alloc(0);
          }
          var i;
          if (length === void 0) {
            length = 0;
            for (i = 0; i < list.length; ++i) {
              length += list[i].length;
            }
          }
          var buffer2 = Buffer.allocUnsafe(length);
          var pos = 0;
          for (i = 0; i < list.length; ++i) {
            var buf = list[i];
            if (isInstance(buf, Uint8Array)) {
              buf = Buffer.from(buf);
            }
            if (!Buffer.isBuffer(buf)) {
              throw new TypeError('"list" argument must be an Array of Buffers');
            }
            buf.copy(buffer2, pos);
            pos += buf.length;
          }
          return buffer2;
        };
        function byteLength(string, encoding) {
          if (Buffer.isBuffer(string)) {
            return string.length;
          }
          if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
            return string.byteLength;
          }
          if (typeof string !== "string") {
            throw new TypeError(
              'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
            );
          }
          var len = string.length;
          var mustMatch = arguments.length > 2 && arguments[2] === true;
          if (!mustMatch && len === 0)
            return 0;
          var loweredCase = false;
          for (; ; ) {
            switch (encoding) {
              case "ascii":
              case "latin1":
              case "binary":
                return len;
              case "utf8":
              case "utf-8":
                return utf8ToBytes(string).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return len * 2;
              case "hex":
                return len >>> 1;
              case "base64":
                return base64ToBytes(string).length;
              default:
                if (loweredCase) {
                  return mustMatch ? -1 : utf8ToBytes(string).length;
                }
                encoding = ("" + encoding).toLowerCase();
                loweredCase = true;
            }
          }
        }
        Buffer.byteLength = byteLength;
        function slowToString(encoding, start, end) {
          var loweredCase = false;
          if (start === void 0 || start < 0) {
            start = 0;
          }
          if (start > this.length) {
            return "";
          }
          if (end === void 0 || end > this.length) {
            end = this.length;
          }
          if (end <= 0) {
            return "";
          }
          end >>>= 0;
          start >>>= 0;
          if (end <= start) {
            return "";
          }
          if (!encoding)
            encoding = "utf8";
          while (true) {
            switch (encoding) {
              case "hex":
                return hexSlice(this, start, end);
              case "utf8":
              case "utf-8":
                return utf8Slice(this, start, end);
              case "ascii":
                return asciiSlice(this, start, end);
              case "latin1":
              case "binary":
                return latin1Slice(this, start, end);
              case "base64":
                return base64Slice(this, start, end);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return utf16leSlice(this, start, end);
              default:
                if (loweredCase)
                  throw new TypeError("Unknown encoding: " + encoding);
                encoding = (encoding + "").toLowerCase();
                loweredCase = true;
            }
          }
        }
        Buffer.prototype._isBuffer = true;
        function swap(b, n2, m) {
          var i = b[n2];
          b[n2] = b[m];
          b[m] = i;
        }
        Buffer.prototype.swap16 = function swap16() {
          var len = this.length;
          if (len % 2 !== 0) {
            throw new RangeError("Buffer size must be a multiple of 16-bits");
          }
          for (var i = 0; i < len; i += 2) {
            swap(this, i, i + 1);
          }
          return this;
        };
        Buffer.prototype.swap32 = function swap32() {
          var len = this.length;
          if (len % 4 !== 0) {
            throw new RangeError("Buffer size must be a multiple of 32-bits");
          }
          for (var i = 0; i < len; i += 4) {
            swap(this, i, i + 3);
            swap(this, i + 1, i + 2);
          }
          return this;
        };
        Buffer.prototype.swap64 = function swap64() {
          var len = this.length;
          if (len % 8 !== 0) {
            throw new RangeError("Buffer size must be a multiple of 64-bits");
          }
          for (var i = 0; i < len; i += 8) {
            swap(this, i, i + 7);
            swap(this, i + 1, i + 6);
            swap(this, i + 2, i + 5);
            swap(this, i + 3, i + 4);
          }
          return this;
        };
        Buffer.prototype.toString = function toString() {
          var length = this.length;
          if (length === 0)
            return "";
          if (arguments.length === 0)
            return utf8Slice(this, 0, length);
          return slowToString.apply(this, arguments);
        };
        Buffer.prototype.toLocaleString = Buffer.prototype.toString;
        Buffer.prototype.equals = function equals(b) {
          if (!Buffer.isBuffer(b))
            throw new TypeError("Argument must be a Buffer");
          if (this === b)
            return true;
          return Buffer.compare(this, b) === 0;
        };
        Buffer.prototype.inspect = function inspect() {
          var str = "";
          var max = exports3.INSPECT_MAX_BYTES;
          str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
          if (this.length > max)
            str += " ... ";
          return "<Buffer " + str + ">";
        };
        Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
          if (isInstance(target, Uint8Array)) {
            target = Buffer.from(target, target.offset, target.byteLength);
          }
          if (!Buffer.isBuffer(target)) {
            throw new TypeError(
              'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
            );
          }
          if (start === void 0) {
            start = 0;
          }
          if (end === void 0) {
            end = target ? target.length : 0;
          }
          if (thisStart === void 0) {
            thisStart = 0;
          }
          if (thisEnd === void 0) {
            thisEnd = this.length;
          }
          if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
            throw new RangeError("out of range index");
          }
          if (thisStart >= thisEnd && start >= end) {
            return 0;
          }
          if (thisStart >= thisEnd) {
            return -1;
          }
          if (start >= end) {
            return 1;
          }
          start >>>= 0;
          end >>>= 0;
          thisStart >>>= 0;
          thisEnd >>>= 0;
          if (this === target)
            return 0;
          var x = thisEnd - thisStart;
          var y = end - start;
          var len = Math.min(x, y);
          var thisCopy = this.slice(thisStart, thisEnd);
          var targetCopy = target.slice(start, end);
          for (var i = 0; i < len; ++i) {
            if (thisCopy[i] !== targetCopy[i]) {
              x = thisCopy[i];
              y = targetCopy[i];
              break;
            }
          }
          if (x < y)
            return -1;
          if (y < x)
            return 1;
          return 0;
        };
        function bidirectionalIndexOf(buffer2, val, byteOffset, encoding, dir) {
          if (buffer2.length === 0)
            return -1;
          if (typeof byteOffset === "string") {
            encoding = byteOffset;
            byteOffset = 0;
          } else if (byteOffset > 2147483647) {
            byteOffset = 2147483647;
          } else if (byteOffset < -2147483648) {
            byteOffset = -2147483648;
          }
          byteOffset = +byteOffset;
          if (numberIsNaN(byteOffset)) {
            byteOffset = dir ? 0 : buffer2.length - 1;
          }
          if (byteOffset < 0)
            byteOffset = buffer2.length + byteOffset;
          if (byteOffset >= buffer2.length) {
            if (dir)
              return -1;
            else
              byteOffset = buffer2.length - 1;
          } else if (byteOffset < 0) {
            if (dir)
              byteOffset = 0;
            else
              return -1;
          }
          if (typeof val === "string") {
            val = Buffer.from(val, encoding);
          }
          if (Buffer.isBuffer(val)) {
            if (val.length === 0) {
              return -1;
            }
            return arrayIndexOf(buffer2, val, byteOffset, encoding, dir);
          } else if (typeof val === "number") {
            val = val & 255;
            if (typeof Uint8Array.prototype.indexOf === "function") {
              if (dir) {
                return Uint8Array.prototype.indexOf.call(buffer2, val, byteOffset);
              } else {
                return Uint8Array.prototype.lastIndexOf.call(buffer2, val, byteOffset);
              }
            }
            return arrayIndexOf(buffer2, [val], byteOffset, encoding, dir);
          }
          throw new TypeError("val must be string, number or Buffer");
        }
        function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
          var indexSize = 1;
          var arrLength = arr.length;
          var valLength = val.length;
          if (encoding !== void 0) {
            encoding = String(encoding).toLowerCase();
            if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
              if (arr.length < 2 || val.length < 2) {
                return -1;
              }
              indexSize = 2;
              arrLength /= 2;
              valLength /= 2;
              byteOffset /= 2;
            }
          }
          function read(buf, i2) {
            if (indexSize === 1) {
              return buf[i2];
            } else {
              return buf.readUInt16BE(i2 * indexSize);
            }
          }
          var i;
          if (dir) {
            var foundIndex = -1;
            for (i = byteOffset; i < arrLength; i++) {
              if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
                if (foundIndex === -1)
                  foundIndex = i;
                if (i - foundIndex + 1 === valLength)
                  return foundIndex * indexSize;
              } else {
                if (foundIndex !== -1)
                  i -= i - foundIndex;
                foundIndex = -1;
              }
            }
          } else {
            if (byteOffset + valLength > arrLength)
              byteOffset = arrLength - valLength;
            for (i = byteOffset; i >= 0; i--) {
              var found = true;
              for (var j = 0; j < valLength; j++) {
                if (read(arr, i + j) !== read(val, j)) {
                  found = false;
                  break;
                }
              }
              if (found)
                return i;
            }
          }
          return -1;
        }
        Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
          return this.indexOf(val, byteOffset, encoding) !== -1;
        };
        Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
          return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
        };
        Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
          return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
        };
        function hexWrite(buf, string, offset, length) {
          offset = Number(offset) || 0;
          var remaining = buf.length - offset;
          if (!length) {
            length = remaining;
          } else {
            length = Number(length);
            if (length > remaining) {
              length = remaining;
            }
          }
          var strLen = string.length;
          if (length > strLen / 2) {
            length = strLen / 2;
          }
          for (var i = 0; i < length; ++i) {
            var parsed = parseInt(string.substr(i * 2, 2), 16);
            if (numberIsNaN(parsed))
              return i;
            buf[offset + i] = parsed;
          }
          return i;
        }
        function utf8Write(buf, string, offset, length) {
          return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
        }
        function asciiWrite(buf, string, offset, length) {
          return blitBuffer(asciiToBytes(string), buf, offset, length);
        }
        function latin1Write(buf, string, offset, length) {
          return asciiWrite(buf, string, offset, length);
        }
        function base64Write(buf, string, offset, length) {
          return blitBuffer(base64ToBytes(string), buf, offset, length);
        }
        function ucs2Write(buf, string, offset, length) {
          return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
        }
        Buffer.prototype.write = function write(string, offset, length, encoding) {
          if (offset === void 0) {
            encoding = "utf8";
            length = this.length;
            offset = 0;
          } else if (length === void 0 && typeof offset === "string") {
            encoding = offset;
            length = this.length;
            offset = 0;
          } else if (isFinite(offset)) {
            offset = offset >>> 0;
            if (isFinite(length)) {
              length = length >>> 0;
              if (encoding === void 0)
                encoding = "utf8";
            } else {
              encoding = length;
              length = void 0;
            }
          } else {
            throw new Error(
              "Buffer.write(string, encoding, offset[, length]) is no longer supported"
            );
          }
          var remaining = this.length - offset;
          if (length === void 0 || length > remaining)
            length = remaining;
          if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
            throw new RangeError("Attempt to write outside buffer bounds");
          }
          if (!encoding)
            encoding = "utf8";
          var loweredCase = false;
          for (; ; ) {
            switch (encoding) {
              case "hex":
                return hexWrite(this, string, offset, length);
              case "utf8":
              case "utf-8":
                return utf8Write(this, string, offset, length);
              case "ascii":
                return asciiWrite(this, string, offset, length);
              case "latin1":
              case "binary":
                return latin1Write(this, string, offset, length);
              case "base64":
                return base64Write(this, string, offset, length);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return ucs2Write(this, string, offset, length);
              default:
                if (loweredCase)
                  throw new TypeError("Unknown encoding: " + encoding);
                encoding = ("" + encoding).toLowerCase();
                loweredCase = true;
            }
          }
        };
        Buffer.prototype.toJSON = function toJSON() {
          return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
          };
        };
        function base64Slice(buf, start, end) {
          if (start === 0 && end === buf.length) {
            return base64.fromByteArray(buf);
          } else {
            return base64.fromByteArray(buf.slice(start, end));
          }
        }
        function utf8Slice(buf, start, end) {
          end = Math.min(buf.length, end);
          var res = [];
          var i = start;
          while (i < end) {
            var firstByte = buf[i];
            var codePoint = null;
            var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
            if (i + bytesPerSequence <= end) {
              var secondByte, thirdByte, fourthByte, tempCodePoint;
              switch (bytesPerSequence) {
                case 1:
                  if (firstByte < 128) {
                    codePoint = firstByte;
                  }
                  break;
                case 2:
                  secondByte = buf[i + 1];
                  if ((secondByte & 192) === 128) {
                    tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                    if (tempCodePoint > 127) {
                      codePoint = tempCodePoint;
                    }
                  }
                  break;
                case 3:
                  secondByte = buf[i + 1];
                  thirdByte = buf[i + 2];
                  if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                    tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                    if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                      codePoint = tempCodePoint;
                    }
                  }
                  break;
                case 4:
                  secondByte = buf[i + 1];
                  thirdByte = buf[i + 2];
                  fourthByte = buf[i + 3];
                  if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                    tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                    if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                      codePoint = tempCodePoint;
                    }
                  }
              }
            }
            if (codePoint === null) {
              codePoint = 65533;
              bytesPerSequence = 1;
            } else if (codePoint > 65535) {
              codePoint -= 65536;
              res.push(codePoint >>> 10 & 1023 | 55296);
              codePoint = 56320 | codePoint & 1023;
            }
            res.push(codePoint);
            i += bytesPerSequence;
          }
          return decodeCodePointsArray(res);
        }
        var MAX_ARGUMENTS_LENGTH = 4096;
        function decodeCodePointsArray(codePoints) {
          var len = codePoints.length;
          if (len <= MAX_ARGUMENTS_LENGTH) {
            return String.fromCharCode.apply(String, codePoints);
          }
          var res = "";
          var i = 0;
          while (i < len) {
            res += String.fromCharCode.apply(
              String,
              codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
            );
          }
          return res;
        }
        function asciiSlice(buf, start, end) {
          var ret = "";
          end = Math.min(buf.length, end);
          for (var i = start; i < end; ++i) {
            ret += String.fromCharCode(buf[i] & 127);
          }
          return ret;
        }
        function latin1Slice(buf, start, end) {
          var ret = "";
          end = Math.min(buf.length, end);
          for (var i = start; i < end; ++i) {
            ret += String.fromCharCode(buf[i]);
          }
          return ret;
        }
        function hexSlice(buf, start, end) {
          var len = buf.length;
          if (!start || start < 0)
            start = 0;
          if (!end || end < 0 || end > len)
            end = len;
          var out = "";
          for (var i = start; i < end; ++i) {
            out += toHex(buf[i]);
          }
          return out;
        }
        function utf16leSlice(buf, start, end) {
          var bytes = buf.slice(start, end);
          var res = "";
          for (var i = 0; i < bytes.length; i += 2) {
            res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
          }
          return res;
        }
        Buffer.prototype.slice = function slice(start, end) {
          var len = this.length;
          start = ~~start;
          end = end === void 0 ? len : ~~end;
          if (start < 0) {
            start += len;
            if (start < 0)
              start = 0;
          } else if (start > len) {
            start = len;
          }
          if (end < 0) {
            end += len;
            if (end < 0)
              end = 0;
          } else if (end > len) {
            end = len;
          }
          if (end < start)
            end = start;
          var newBuf = this.subarray(start, end);
          newBuf.__proto__ = Buffer.prototype;
          return newBuf;
        };
        function checkOffset(offset, ext, length) {
          if (offset % 1 !== 0 || offset < 0)
            throw new RangeError("offset is not uint");
          if (offset + ext > length)
            throw new RangeError("Trying to access beyond buffer length");
        }
        Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
          offset = offset >>> 0;
          byteLength2 = byteLength2 >>> 0;
          if (!noAssert)
            checkOffset(offset, byteLength2, this.length);
          var val = this[offset];
          var mul = 1;
          var i = 0;
          while (++i < byteLength2 && (mul *= 256)) {
            val += this[offset + i] * mul;
          }
          return val;
        };
        Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
          offset = offset >>> 0;
          byteLength2 = byteLength2 >>> 0;
          if (!noAssert) {
            checkOffset(offset, byteLength2, this.length);
          }
          var val = this[offset + --byteLength2];
          var mul = 1;
          while (byteLength2 > 0 && (mul *= 256)) {
            val += this[offset + --byteLength2] * mul;
          }
          return val;
        };
        Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert)
            checkOffset(offset, 1, this.length);
          return this[offset];
        };
        Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert)
            checkOffset(offset, 2, this.length);
          return this[offset] | this[offset + 1] << 8;
        };
        Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert)
            checkOffset(offset, 2, this.length);
          return this[offset] << 8 | this[offset + 1];
        };
        Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert)
            checkOffset(offset, 4, this.length);
          return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
        };
        Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert)
            checkOffset(offset, 4, this.length);
          return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
        };
        Buffer.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
          offset = offset >>> 0;
          byteLength2 = byteLength2 >>> 0;
          if (!noAssert)
            checkOffset(offset, byteLength2, this.length);
          var val = this[offset];
          var mul = 1;
          var i = 0;
          while (++i < byteLength2 && (mul *= 256)) {
            val += this[offset + i] * mul;
          }
          mul *= 128;
          if (val >= mul)
            val -= Math.pow(2, 8 * byteLength2);
          return val;
        };
        Buffer.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
          offset = offset >>> 0;
          byteLength2 = byteLength2 >>> 0;
          if (!noAssert)
            checkOffset(offset, byteLength2, this.length);
          var i = byteLength2;
          var mul = 1;
          var val = this[offset + --i];
          while (i > 0 && (mul *= 256)) {
            val += this[offset + --i] * mul;
          }
          mul *= 128;
          if (val >= mul)
            val -= Math.pow(2, 8 * byteLength2);
          return val;
        };
        Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert)
            checkOffset(offset, 1, this.length);
          if (!(this[offset] & 128))
            return this[offset];
          return (255 - this[offset] + 1) * -1;
        };
        Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert)
            checkOffset(offset, 2, this.length);
          var val = this[offset] | this[offset + 1] << 8;
          return val & 32768 ? val | 4294901760 : val;
        };
        Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert)
            checkOffset(offset, 2, this.length);
          var val = this[offset + 1] | this[offset] << 8;
          return val & 32768 ? val | 4294901760 : val;
        };
        Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert)
            checkOffset(offset, 4, this.length);
          return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
        };
        Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert)
            checkOffset(offset, 4, this.length);
          return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
        };
        Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert)
            checkOffset(offset, 4, this.length);
          return ieee754.read(this, offset, true, 23, 4);
        };
        Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert)
            checkOffset(offset, 4, this.length);
          return ieee754.read(this, offset, false, 23, 4);
        };
        Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert)
            checkOffset(offset, 8, this.length);
          return ieee754.read(this, offset, true, 52, 8);
        };
        Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert)
            checkOffset(offset, 8, this.length);
          return ieee754.read(this, offset, false, 52, 8);
        };
        function checkInt(buf, value, offset, ext, max, min) {
          if (!Buffer.isBuffer(buf))
            throw new TypeError('"buffer" argument must be a Buffer instance');
          if (value > max || value < min)
            throw new RangeError('"value" argument is out of bounds');
          if (offset + ext > buf.length)
            throw new RangeError("Index out of range");
        }
        Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
          value = +value;
          offset = offset >>> 0;
          byteLength2 = byteLength2 >>> 0;
          if (!noAssert) {
            var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
            checkInt(this, value, offset, byteLength2, maxBytes, 0);
          }
          var mul = 1;
          var i = 0;
          this[offset] = value & 255;
          while (++i < byteLength2 && (mul *= 256)) {
            this[offset + i] = value / mul & 255;
          }
          return offset + byteLength2;
        };
        Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
          value = +value;
          offset = offset >>> 0;
          byteLength2 = byteLength2 >>> 0;
          if (!noAssert) {
            var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
            checkInt(this, value, offset, byteLength2, maxBytes, 0);
          }
          var i = byteLength2 - 1;
          var mul = 1;
          this[offset + i] = value & 255;
          while (--i >= 0 && (mul *= 256)) {
            this[offset + i] = value / mul & 255;
          }
          return offset + byteLength2;
        };
        Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert)
            checkInt(this, value, offset, 1, 255, 0);
          this[offset] = value & 255;
          return offset + 1;
        };
        Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert)
            checkInt(this, value, offset, 2, 65535, 0);
          this[offset] = value & 255;
          this[offset + 1] = value >>> 8;
          return offset + 2;
        };
        Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert)
            checkInt(this, value, offset, 2, 65535, 0);
          this[offset] = value >>> 8;
          this[offset + 1] = value & 255;
          return offset + 2;
        };
        Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert)
            checkInt(this, value, offset, 4, 4294967295, 0);
          this[offset + 3] = value >>> 24;
          this[offset + 2] = value >>> 16;
          this[offset + 1] = value >>> 8;
          this[offset] = value & 255;
          return offset + 4;
        };
        Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert)
            checkInt(this, value, offset, 4, 4294967295, 0);
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = value & 255;
          return offset + 4;
        };
        Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) {
            var limit = Math.pow(2, 8 * byteLength2 - 1);
            checkInt(this, value, offset, byteLength2, limit - 1, -limit);
          }
          var i = 0;
          var mul = 1;
          var sub = 0;
          this[offset] = value & 255;
          while (++i < byteLength2 && (mul *= 256)) {
            if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
              sub = 1;
            }
            this[offset + i] = (value / mul >> 0) - sub & 255;
          }
          return offset + byteLength2;
        };
        Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) {
            var limit = Math.pow(2, 8 * byteLength2 - 1);
            checkInt(this, value, offset, byteLength2, limit - 1, -limit);
          }
          var i = byteLength2 - 1;
          var mul = 1;
          var sub = 0;
          this[offset + i] = value & 255;
          while (--i >= 0 && (mul *= 256)) {
            if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
              sub = 1;
            }
            this[offset + i] = (value / mul >> 0) - sub & 255;
          }
          return offset + byteLength2;
        };
        Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert)
            checkInt(this, value, offset, 1, 127, -128);
          if (value < 0)
            value = 255 + value + 1;
          this[offset] = value & 255;
          return offset + 1;
        };
        Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert)
            checkInt(this, value, offset, 2, 32767, -32768);
          this[offset] = value & 255;
          this[offset + 1] = value >>> 8;
          return offset + 2;
        };
        Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert)
            checkInt(this, value, offset, 2, 32767, -32768);
          this[offset] = value >>> 8;
          this[offset + 1] = value & 255;
          return offset + 2;
        };
        Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert)
            checkInt(this, value, offset, 4, 2147483647, -2147483648);
          this[offset] = value & 255;
          this[offset + 1] = value >>> 8;
          this[offset + 2] = value >>> 16;
          this[offset + 3] = value >>> 24;
          return offset + 4;
        };
        Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert)
            checkInt(this, value, offset, 4, 2147483647, -2147483648);
          if (value < 0)
            value = 4294967295 + value + 1;
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = value & 255;
          return offset + 4;
        };
        function checkIEEE754(buf, value, offset, ext, max, min) {
          if (offset + ext > buf.length)
            throw new RangeError("Index out of range");
          if (offset < 0)
            throw new RangeError("Index out of range");
        }
        function writeFloat(buf, value, offset, littleEndian, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) {
            checkIEEE754(buf, value, offset, 4);
          }
          ieee754.write(buf, value, offset, littleEndian, 23, 4);
          return offset + 4;
        }
        Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
          return writeFloat(this, value, offset, true, noAssert);
        };
        Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
          return writeFloat(this, value, offset, false, noAssert);
        };
        function writeDouble(buf, value, offset, littleEndian, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) {
            checkIEEE754(buf, value, offset, 8);
          }
          ieee754.write(buf, value, offset, littleEndian, 52, 8);
          return offset + 8;
        }
        Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
          return writeDouble(this, value, offset, true, noAssert);
        };
        Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
          return writeDouble(this, value, offset, false, noAssert);
        };
        Buffer.prototype.copy = function copy(target, targetStart, start, end) {
          if (!Buffer.isBuffer(target))
            throw new TypeError("argument should be a Buffer");
          if (!start)
            start = 0;
          if (!end && end !== 0)
            end = this.length;
          if (targetStart >= target.length)
            targetStart = target.length;
          if (!targetStart)
            targetStart = 0;
          if (end > 0 && end < start)
            end = start;
          if (end === start)
            return 0;
          if (target.length === 0 || this.length === 0)
            return 0;
          if (targetStart < 0) {
            throw new RangeError("targetStart out of bounds");
          }
          if (start < 0 || start >= this.length)
            throw new RangeError("Index out of range");
          if (end < 0)
            throw new RangeError("sourceEnd out of bounds");
          if (end > this.length)
            end = this.length;
          if (target.length - targetStart < end - start) {
            end = target.length - targetStart + start;
          }
          var len = end - start;
          if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
            this.copyWithin(targetStart, start, end);
          } else if (this === target && start < targetStart && targetStart < end) {
            for (var i = len - 1; i >= 0; --i) {
              target[i + targetStart] = this[i + start];
            }
          } else {
            Uint8Array.prototype.set.call(
              target,
              this.subarray(start, end),
              targetStart
            );
          }
          return len;
        };
        Buffer.prototype.fill = function fill(val, start, end, encoding) {
          if (typeof val === "string") {
            if (typeof start === "string") {
              encoding = start;
              start = 0;
              end = this.length;
            } else if (typeof end === "string") {
              encoding = end;
              end = this.length;
            }
            if (encoding !== void 0 && typeof encoding !== "string") {
              throw new TypeError("encoding must be a string");
            }
            if (typeof encoding === "string" && !Buffer.isEncoding(encoding)) {
              throw new TypeError("Unknown encoding: " + encoding);
            }
            if (val.length === 1) {
              var code = val.charCodeAt(0);
              if (encoding === "utf8" && code < 128 || encoding === "latin1") {
                val = code;
              }
            }
          } else if (typeof val === "number") {
            val = val & 255;
          }
          if (start < 0 || this.length < start || this.length < end) {
            throw new RangeError("Out of range index");
          }
          if (end <= start) {
            return this;
          }
          start = start >>> 0;
          end = end === void 0 ? this.length : end >>> 0;
          if (!val)
            val = 0;
          var i;
          if (typeof val === "number") {
            for (i = start; i < end; ++i) {
              this[i] = val;
            }
          } else {
            var bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
            var len = bytes.length;
            if (len === 0) {
              throw new TypeError('The value "' + val + '" is invalid for argument "value"');
            }
            for (i = 0; i < end - start; ++i) {
              this[i + start] = bytes[i % len];
            }
          }
          return this;
        };
        var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
        function base64clean(str) {
          str = str.split("=")[0];
          str = str.trim().replace(INVALID_BASE64_RE, "");
          if (str.length < 2)
            return "";
          while (str.length % 4 !== 0) {
            str = str + "=";
          }
          return str;
        }
        function toHex(n2) {
          if (n2 < 16)
            return "0" + n2.toString(16);
          return n2.toString(16);
        }
        function utf8ToBytes(string, units) {
          units = units || Infinity;
          var codePoint;
          var length = string.length;
          var leadSurrogate = null;
          var bytes = [];
          for (var i = 0; i < length; ++i) {
            codePoint = string.charCodeAt(i);
            if (codePoint > 55295 && codePoint < 57344) {
              if (!leadSurrogate) {
                if (codePoint > 56319) {
                  if ((units -= 3) > -1)
                    bytes.push(239, 191, 189);
                  continue;
                } else if (i + 1 === length) {
                  if ((units -= 3) > -1)
                    bytes.push(239, 191, 189);
                  continue;
                }
                leadSurrogate = codePoint;
                continue;
              }
              if (codePoint < 56320) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                leadSurrogate = codePoint;
                continue;
              }
              codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
            } else if (leadSurrogate) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
            }
            leadSurrogate = null;
            if (codePoint < 128) {
              if ((units -= 1) < 0)
                break;
              bytes.push(codePoint);
            } else if (codePoint < 2048) {
              if ((units -= 2) < 0)
                break;
              bytes.push(
                codePoint >> 6 | 192,
                codePoint & 63 | 128
              );
            } else if (codePoint < 65536) {
              if ((units -= 3) < 0)
                break;
              bytes.push(
                codePoint >> 12 | 224,
                codePoint >> 6 & 63 | 128,
                codePoint & 63 | 128
              );
            } else if (codePoint < 1114112) {
              if ((units -= 4) < 0)
                break;
              bytes.push(
                codePoint >> 18 | 240,
                codePoint >> 12 & 63 | 128,
                codePoint >> 6 & 63 | 128,
                codePoint & 63 | 128
              );
            } else {
              throw new Error("Invalid code point");
            }
          }
          return bytes;
        }
        function asciiToBytes(str) {
          var byteArray = [];
          for (var i = 0; i < str.length; ++i) {
            byteArray.push(str.charCodeAt(i) & 255);
          }
          return byteArray;
        }
        function utf16leToBytes(str, units) {
          var c, hi, lo;
          var byteArray = [];
          for (var i = 0; i < str.length; ++i) {
            if ((units -= 2) < 0)
              break;
            c = str.charCodeAt(i);
            hi = c >> 8;
            lo = c % 256;
            byteArray.push(lo);
            byteArray.push(hi);
          }
          return byteArray;
        }
        function base64ToBytes(str) {
          return base64.toByteArray(base64clean(str));
        }
        function blitBuffer(src, dst, offset, length) {
          for (var i = 0; i < length; ++i) {
            if (i + offset >= dst.length || i >= src.length)
              break;
            dst[i + offset] = src[i];
          }
          return i;
        }
        function isInstance(obj, type) {
          return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
        }
        function numberIsNaN(obj) {
          return obj !== obj;
        }
      }).call(this, require2("buffer").Buffer);
    }, { "base64-js": 10, "buffer": 13, "ieee754": 87 }], 14: [function(require2, module3, exports3) {
      (function(Buffer) {
        function isArray2(arg) {
          if (Array.isArray) {
            return Array.isArray(arg);
          }
          return objectToString2(arg) === "[object Array]";
        }
        exports3.isArray = isArray2;
        function isBoolean2(arg) {
          return typeof arg === "boolean";
        }
        exports3.isBoolean = isBoolean2;
        function isNull(arg) {
          return arg === null;
        }
        exports3.isNull = isNull;
        function isNullOrUndefined(arg) {
          return arg == null;
        }
        exports3.isNullOrUndefined = isNullOrUndefined;
        function isNumber(arg) {
          return typeof arg === "number";
        }
        exports3.isNumber = isNumber;
        function isString2(arg) {
          return typeof arg === "string";
        }
        exports3.isString = isString2;
        function isSymbol2(arg) {
          return typeof arg === "symbol";
        }
        exports3.isSymbol = isSymbol2;
        function isUndefined(arg) {
          return arg === void 0;
        }
        exports3.isUndefined = isUndefined;
        function isRegExp(re) {
          return objectToString2(re) === "[object RegExp]";
        }
        exports3.isRegExp = isRegExp;
        function isObject2(arg) {
          return typeof arg === "object" && arg !== null;
        }
        exports3.isObject = isObject2;
        function isDate(d) {
          return objectToString2(d) === "[object Date]";
        }
        exports3.isDate = isDate;
        function isError(e2) {
          return objectToString2(e2) === "[object Error]" || e2 instanceof Error;
        }
        exports3.isError = isError;
        function isFunction2(arg) {
          return typeof arg === "function";
        }
        exports3.isFunction = isFunction2;
        function isPrimitive(arg) {
          return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
          typeof arg === "undefined";
        }
        exports3.isPrimitive = isPrimitive;
        exports3.isBuffer = Buffer.isBuffer;
        function objectToString2(o2) {
          return Object.prototype.toString.call(o2);
        }
      }).call(this, { "isBuffer": require2("../../is-buffer/index.js") });
    }, { "../../is-buffer/index.js": 89 }], 15: [function(require2, module3, exports3) {
      var isValue = require2("type/value/is"), ensureValue = require2("type/value/ensure"), ensurePlainFunction = require2("type/plain-function/ensure"), copy = require2("es5-ext/object/copy"), normalizeOptions = require2("es5-ext/object/normalize-options"), map = require2("es5-ext/object/map");
      var bind = Function.prototype.bind, defineProperty = Object.defineProperty, hasOwnProperty2 = Object.prototype.hasOwnProperty, define;
      define = function(name, desc, options) {
        var value = ensureValue(desc) && ensurePlainFunction(desc.value), dgs;
        dgs = copy(desc);
        delete dgs.writable;
        delete dgs.value;
        dgs.get = function() {
          if (!options.overwriteDefinition && hasOwnProperty2.call(this, name))
            return value;
          desc.value = bind.call(value, options.resolveContext ? options.resolveContext(this) : this);
          defineProperty(this, name, desc);
          return this[name];
        };
        return dgs;
      };
      module3.exports = function(props) {
        var options = normalizeOptions(arguments[1]);
        if (isValue(options.resolveContext))
          ensurePlainFunction(options.resolveContext);
        return map(props, function(desc, name) {
          return define(name, desc, options);
        });
      };
    }, { "es5-ext/object/copy": 41, "es5-ext/object/map": 49, "es5-ext/object/normalize-options": 50, "type/plain-function/ensure": 126, "type/value/ensure": 130, "type/value/is": 131 }], 16: [function(require2, module3, exports3) {
      var isValue = require2("type/value/is"), isPlainFunction = require2("type/plain-function/is"), assign2 = require2("es5-ext/object/assign"), normalizeOpts = require2("es5-ext/object/normalize-options"), contains = require2("es5-ext/string/#/contains");
      var d = module3.exports = function(dscr, value) {
        var c, e2, w, options, desc;
        if (arguments.length < 2 || typeof dscr !== "string") {
          options = value;
          value = dscr;
          dscr = null;
        } else {
          options = arguments[2];
        }
        if (isValue(dscr)) {
          c = contains.call(dscr, "c");
          e2 = contains.call(dscr, "e");
          w = contains.call(dscr, "w");
        } else {
          c = w = true;
          e2 = false;
        }
        desc = { value, configurable: c, enumerable: e2, writable: w };
        return !options ? desc : assign2(normalizeOpts(options), desc);
      };
      d.gs = function(dscr, get2, set2) {
        var c, e2, options, desc;
        if (typeof dscr !== "string") {
          options = set2;
          set2 = get2;
          get2 = dscr;
          dscr = null;
        } else {
          options = arguments[3];
        }
        if (!isValue(get2)) {
          get2 = void 0;
        } else if (!isPlainFunction(get2)) {
          options = get2;
          get2 = set2 = void 0;
        } else if (!isValue(set2)) {
          set2 = void 0;
        } else if (!isPlainFunction(set2)) {
          options = set2;
          set2 = void 0;
        }
        if (isValue(dscr)) {
          c = contains.call(dscr, "c");
          e2 = contains.call(dscr, "e");
        } else {
          c = true;
          e2 = false;
        }
        desc = { get: get2, set: set2, configurable: c, enumerable: e2 };
        return !options ? desc : assign2(normalizeOpts(options), desc);
      };
    }, { "es5-ext/object/assign": 38, "es5-ext/object/normalize-options": 50, "es5-ext/string/#/contains": 57, "type/plain-function/is": 127, "type/value/is": 131 }], 17: [function(require2, module3, exports3) {
      (function(process) {
        exports3.log = log;
        exports3.formatArgs = formatArgs;
        exports3.save = save;
        exports3.load = load;
        exports3.useColors = useColors;
        exports3.storage = localstorage();
        exports3.colors = [
          "#0000CC",
          "#0000FF",
          "#0033CC",
          "#0033FF",
          "#0066CC",
          "#0066FF",
          "#0099CC",
          "#0099FF",
          "#00CC00",
          "#00CC33",
          "#00CC66",
          "#00CC99",
          "#00CCCC",
          "#00CCFF",
          "#3300CC",
          "#3300FF",
          "#3333CC",
          "#3333FF",
          "#3366CC",
          "#3366FF",
          "#3399CC",
          "#3399FF",
          "#33CC00",
          "#33CC33",
          "#33CC66",
          "#33CC99",
          "#33CCCC",
          "#33CCFF",
          "#6600CC",
          "#6600FF",
          "#6633CC",
          "#6633FF",
          "#66CC00",
          "#66CC33",
          "#9900CC",
          "#9900FF",
          "#9933CC",
          "#9933FF",
          "#99CC00",
          "#99CC33",
          "#CC0000",
          "#CC0033",
          "#CC0066",
          "#CC0099",
          "#CC00CC",
          "#CC00FF",
          "#CC3300",
          "#CC3333",
          "#CC3366",
          "#CC3399",
          "#CC33CC",
          "#CC33FF",
          "#CC6600",
          "#CC6633",
          "#CC9900",
          "#CC9933",
          "#CCCC00",
          "#CCCC33",
          "#FF0000",
          "#FF0033",
          "#FF0066",
          "#FF0099",
          "#FF00CC",
          "#FF00FF",
          "#FF3300",
          "#FF3333",
          "#FF3366",
          "#FF3399",
          "#FF33CC",
          "#FF33FF",
          "#FF6600",
          "#FF6633",
          "#FF9900",
          "#FF9933",
          "#FFCC00",
          "#FFCC33"
        ];
        function useColors() {
          if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
            return true;
          }
          if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
            return false;
          }
          return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
          typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
          // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
          typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
          typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
        }
        function formatArgs(args) {
          args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module3.exports.humanize(this.diff);
          if (!this.useColors) {
            return;
          }
          const c = "color: " + this.color;
          args.splice(1, 0, c, "color: inherit");
          let index2 = 0;
          let lastC = 0;
          args[0].replace(/%[a-zA-Z%]/g, (match) => {
            if (match === "%%") {
              return;
            }
            index2++;
            if (match === "%c") {
              lastC = index2;
            }
          });
          args.splice(lastC, 0, c);
        }
        function log(...args) {
          return typeof console === "object" && console.log && console.log(...args);
        }
        function save(namespaces) {
          try {
            if (namespaces) {
              exports3.storage.setItem("debug", namespaces);
            } else {
              exports3.storage.removeItem("debug");
            }
          } catch (error) {
          }
        }
        function load() {
          let r;
          try {
            r = exports3.storage.getItem("debug");
          } catch (error) {
          }
          if (!r && typeof process !== "undefined" && "env" in process) {
            r = process.env.DEBUG;
          }
          return r;
        }
        function localstorage() {
          try {
            return localStorage;
          } catch (error) {
          }
        }
        module3.exports = require2("./common")(exports3);
        const { formatters } = module3.exports;
        formatters.j = function(v) {
          try {
            return JSON.stringify(v);
          } catch (error) {
            return "[UnexpectedJSONParseError]: " + error.message;
          }
        };
      }).call(this, require2("_process"));
    }, { "./common": 18, "_process": 101 }], 18: [function(require2, module3, exports3) {
      function setup(env) {
        createDebug.debug = createDebug;
        createDebug.default = createDebug;
        createDebug.coerce = coerce;
        createDebug.disable = disable;
        createDebug.enable = enable;
        createDebug.enabled = enabled2;
        createDebug.humanize = require2("ms");
        Object.keys(env).forEach((key) => {
          createDebug[key] = env[key];
        });
        createDebug.instances = [];
        createDebug.names = [];
        createDebug.skips = [];
        createDebug.formatters = {};
        function selectColor(namespace) {
          let hash = 0;
          for (let i = 0; i < namespace.length; i++) {
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0;
          }
          return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
        }
        createDebug.selectColor = selectColor;
        function createDebug(namespace) {
          let prevTime;
          function debug(...args) {
            if (!debug.enabled) {
              return;
            }
            const self2 = debug;
            const curr = Number(/* @__PURE__ */ new Date());
            const ms = curr - (prevTime || curr);
            self2.diff = ms;
            self2.prev = prevTime;
            self2.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== "string") {
              args.unshift("%O");
            }
            let index2 = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
              if (match === "%%") {
                return match;
              }
              index2++;
              const formatter = createDebug.formatters[format];
              if (typeof formatter === "function") {
                const val = args[index2];
                match = formatter.call(self2, val);
                args.splice(index2, 1);
                index2--;
              }
              return match;
            });
            createDebug.formatArgs.call(self2, args);
            const logFn = self2.log || createDebug.log;
            logFn.apply(self2, args);
          }
          debug.namespace = namespace;
          debug.enabled = createDebug.enabled(namespace);
          debug.useColors = createDebug.useColors();
          debug.color = selectColor(namespace);
          debug.destroy = destroy;
          debug.extend = extend2;
          if (typeof createDebug.init === "function") {
            createDebug.init(debug);
          }
          createDebug.instances.push(debug);
          return debug;
        }
        function destroy() {
          const index2 = createDebug.instances.indexOf(this);
          if (index2 !== -1) {
            createDebug.instances.splice(index2, 1);
            return true;
          }
          return false;
        }
        function extend2(namespace, delimiter) {
          const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
          newDebug.log = this.log;
          return newDebug;
        }
        function enable(namespaces) {
          createDebug.save(namespaces);
          createDebug.names = [];
          createDebug.skips = [];
          let i;
          const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
          const len = split.length;
          for (i = 0; i < len; i++) {
            if (!split[i]) {
              continue;
            }
            namespaces = split[i].replace(/\*/g, ".*?");
            if (namespaces[0] === "-") {
              createDebug.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
            } else {
              createDebug.names.push(new RegExp("^" + namespaces + "$"));
            }
          }
          for (i = 0; i < createDebug.instances.length; i++) {
            const instance = createDebug.instances[i];
            instance.enabled = createDebug.enabled(instance.namespace);
          }
        }
        function disable() {
          const namespaces = [
            ...createDebug.names.map(toNamespace),
            ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
          ].join(",");
          createDebug.enable("");
          return namespaces;
        }
        function enabled2(name) {
          if (name[name.length - 1] === "*") {
            return true;
          }
          let i;
          let len;
          for (i = 0, len = createDebug.skips.length; i < len; i++) {
            if (createDebug.skips[i].test(name)) {
              return false;
            }
          }
          for (i = 0, len = createDebug.names.length; i < len; i++) {
            if (createDebug.names[i].test(name)) {
              return true;
            }
          }
          return false;
        }
        function toNamespace(regexp) {
          return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
        }
        function coerce(val) {
          if (val instanceof Error) {
            return val.stack || val.message;
          }
          return val;
        }
        createDebug.enable(createDebug.load());
        return createDebug;
      }
      module3.exports = setup;
    }, { "ms": 98 }], 19: [function(require2, module3, exports3) {
      (function(process, Buffer) {
        var stream = require2("readable-stream");
        var eos = require2("end-of-stream");
        var inherits = require2("inherits");
        var shift = require2("stream-shift");
        var SIGNAL_FLUSH = Buffer.from && Buffer.from !== Uint8Array.from ? Buffer.from([0]) : new Buffer([0]);
        var onuncork = function(self2, fn) {
          if (self2._corked)
            self2.once("uncork", fn);
          else
            fn();
        };
        var autoDestroy = function(self2, err) {
          if (self2._autoDestroy)
            self2.destroy(err);
        };
        var destroyer = function(self2, end2) {
          return function(err) {
            if (err)
              autoDestroy(self2, err.message === "premature close" ? null : err);
            else if (end2 && !self2._ended)
              self2.end();
          };
        };
        var end = function(ws, fn) {
          if (!ws)
            return fn();
          if (ws._writableState && ws._writableState.finished)
            return fn();
          if (ws._writableState)
            return ws.end(fn);
          ws.end();
          fn();
        };
        var toStreams2 = function(rs) {
          return new stream.Readable({ objectMode: true, highWaterMark: 16 }).wrap(rs);
        };
        var Duplexify = function(writable, readable, opts) {
          if (!(this instanceof Duplexify))
            return new Duplexify(writable, readable, opts);
          stream.Duplex.call(this, opts);
          this._writable = null;
          this._readable = null;
          this._readable2 = null;
          this._autoDestroy = !opts || opts.autoDestroy !== false;
          this._forwardDestroy = !opts || opts.destroy !== false;
          this._forwardEnd = !opts || opts.end !== false;
          this._corked = 1;
          this._ondrain = null;
          this._drained = false;
          this._forwarding = false;
          this._unwrite = null;
          this._unread = null;
          this._ended = false;
          this.destroyed = false;
          if (writable)
            this.setWritable(writable);
          if (readable)
            this.setReadable(readable);
        };
        inherits(Duplexify, stream.Duplex);
        Duplexify.obj = function(writable, readable, opts) {
          if (!opts)
            opts = {};
          opts.objectMode = true;
          opts.highWaterMark = 16;
          return new Duplexify(writable, readable, opts);
        };
        Duplexify.prototype.cork = function() {
          if (++this._corked === 1)
            this.emit("cork");
        };
        Duplexify.prototype.uncork = function() {
          if (this._corked && --this._corked === 0)
            this.emit("uncork");
        };
        Duplexify.prototype.setWritable = function(writable) {
          if (this._unwrite)
            this._unwrite();
          if (this.destroyed) {
            if (writable && writable.destroy)
              writable.destroy();
            return;
          }
          if (writable === null || writable === false) {
            this.end();
            return;
          }
          var self2 = this;
          var unend = eos(writable, { writable: true, readable: false }, destroyer(this, this._forwardEnd));
          var ondrain = function() {
            var ondrain2 = self2._ondrain;
            self2._ondrain = null;
            if (ondrain2)
              ondrain2();
          };
          var clear2 = function() {
            self2._writable.removeListener("drain", ondrain);
            unend();
          };
          if (this._unwrite)
            process.nextTick(ondrain);
          this._writable = writable;
          this._writable.on("drain", ondrain);
          this._unwrite = clear2;
          this.uncork();
        };
        Duplexify.prototype.setReadable = function(readable) {
          if (this._unread)
            this._unread();
          if (this.destroyed) {
            if (readable && readable.destroy)
              readable.destroy();
            return;
          }
          if (readable === null || readable === false) {
            this.push(null);
            this.resume();
            return;
          }
          var self2 = this;
          var unend = eos(readable, { writable: false, readable: true }, destroyer(this));
          var onreadable = function() {
            self2._forward();
          };
          var onend = function() {
            self2.push(null);
          };
          var clear2 = function() {
            self2._readable2.removeListener("readable", onreadable);
            self2._readable2.removeListener("end", onend);
            unend();
          };
          this._drained = true;
          this._readable = readable;
          this._readable2 = readable._readableState ? readable : toStreams2(readable);
          this._readable2.on("readable", onreadable);
          this._readable2.on("end", onend);
          this._unread = clear2;
          this._forward();
        };
        Duplexify.prototype._read = function() {
          this._drained = true;
          this._forward();
        };
        Duplexify.prototype._forward = function() {
          if (this._forwarding || !this._readable2 || !this._drained)
            return;
          this._forwarding = true;
          var data;
          while (this._drained && (data = shift(this._readable2)) !== null) {
            if (this.destroyed)
              continue;
            this._drained = this.push(data);
          }
          this._forwarding = false;
        };
        Duplexify.prototype.destroy = function(err) {
          if (this.destroyed)
            return;
          this.destroyed = true;
          var self2 = this;
          process.nextTick(function() {
            self2._destroy(err);
          });
        };
        Duplexify.prototype._destroy = function(err) {
          if (err) {
            var ondrain = this._ondrain;
            this._ondrain = null;
            if (ondrain)
              ondrain(err);
            else
              this.emit("error", err);
          }
          if (this._forwardDestroy) {
            if (this._readable && this._readable.destroy)
              this._readable.destroy();
            if (this._writable && this._writable.destroy)
              this._writable.destroy();
          }
          this.emit("close");
        };
        Duplexify.prototype._write = function(data, enc, cb) {
          if (this.destroyed)
            return cb();
          if (this._corked)
            return onuncork(this, this._write.bind(this, data, enc, cb));
          if (data === SIGNAL_FLUSH)
            return this._finish(cb);
          if (!this._writable)
            return cb();
          if (this._writable.write(data) === false)
            this._ondrain = cb;
          else
            cb();
        };
        Duplexify.prototype._finish = function(cb) {
          var self2 = this;
          this.emit("preend");
          onuncork(this, function() {
            end(self2._forwardEnd && self2._writable, function() {
              if (self2._writableState.prefinished === false)
                self2._writableState.prefinished = true;
              self2.emit("prefinish");
              onuncork(self2, cb);
            });
          });
        };
        Duplexify.prototype.end = function(data, enc, cb) {
          if (typeof data === "function")
            return this.end(null, null, data);
          if (typeof enc === "function")
            return this.end(data, null, enc);
          this._ended = true;
          if (data)
            this.write(data);
          if (!this._writableState.ending)
            this.write(SIGNAL_FLUSH);
          return stream.Writable.prototype.end.call(this, cb);
        };
        module3.exports = Duplexify;
      }).call(this, require2("_process"), require2("buffer").Buffer);
    }, { "_process": 101, "buffer": 13, "end-of-stream": 20, "inherits": 88, "readable-stream": 115, "stream-shift": 118 }], 20: [function(require2, module3, exports3) {
      (function(process) {
        var once2 = require2("once");
        var noop2 = function() {
        };
        var isRequest = function(stream) {
          return stream.setHeader && typeof stream.abort === "function";
        };
        var isChildProcess = function(stream) {
          return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3;
        };
        var eos = function(stream, opts, callback) {
          if (typeof opts === "function")
            return eos(stream, null, opts);
          if (!opts)
            opts = {};
          callback = once2(callback || noop2);
          var ws = stream._writableState;
          var rs = stream._readableState;
          var readable = opts.readable || opts.readable !== false && stream.readable;
          var writable = opts.writable || opts.writable !== false && stream.writable;
          var cancelled = false;
          var onlegacyfinish = function() {
            if (!stream.writable)
              onfinish();
          };
          var onfinish = function() {
            writable = false;
            if (!readable)
              callback.call(stream);
          };
          var onend = function() {
            readable = false;
            if (!writable)
              callback.call(stream);
          };
          var onexit = function(exitCode) {
            callback.call(stream, exitCode ? new Error("exited with error code: " + exitCode) : null);
          };
          var onerror = function(err) {
            callback.call(stream, err);
          };
          var onclose = function() {
            process.nextTick(onclosenexttick);
          };
          var onclosenexttick = function() {
            if (cancelled)
              return;
            if (readable && !(rs && (rs.ended && !rs.destroyed)))
              return callback.call(stream, new Error("premature close"));
            if (writable && !(ws && (ws.ended && !ws.destroyed)))
              return callback.call(stream, new Error("premature close"));
          };
          var onrequest = function() {
            stream.req.on("finish", onfinish);
          };
          if (isRequest(stream)) {
            stream.on("complete", onfinish);
            stream.on("abort", onclose);
            if (stream.req)
              onrequest();
            else
              stream.on("request", onrequest);
          } else if (writable && !ws) {
            stream.on("end", onlegacyfinish);
            stream.on("close", onlegacyfinish);
          }
          if (isChildProcess(stream))
            stream.on("exit", onexit);
          stream.on("end", onend);
          stream.on("finish", onfinish);
          if (opts.error !== false)
            stream.on("error", onerror);
          stream.on("close", onclose);
          return function() {
            cancelled = true;
            stream.removeListener("complete", onfinish);
            stream.removeListener("abort", onclose);
            stream.removeListener("request", onrequest);
            if (stream.req)
              stream.req.removeListener("finish", onfinish);
            stream.removeListener("end", onlegacyfinish);
            stream.removeListener("close", onlegacyfinish);
            stream.removeListener("finish", onfinish);
            stream.removeListener("exit", onexit);
            stream.removeListener("end", onend);
            stream.removeListener("error", onerror);
            stream.removeListener("close", onclose);
          };
        };
        module3.exports = eos;
      }).call(this, require2("_process"));
    }, { "_process": 101, "once": 99 }], 21: [function(require2, module3, exports3) {
      var value = require2("../../object/valid-value");
      module3.exports = function() {
        value(this).length = 0;
        return this;
      };
    }, { "../../object/valid-value": 56 }], 22: [function(require2, module3, exports3) {
      var numberIsNaN = require2("../../number/is-nan"), toPosInt = require2("../../number/to-pos-integer"), value = require2("../../object/valid-value"), indexOf = Array.prototype.indexOf, objHasOwnProperty = Object.prototype.hasOwnProperty, abs = Math.abs, floor = Math.floor;
      module3.exports = function(searchElement) {
        var i, length, fromIndex, val;
        if (!numberIsNaN(searchElement))
          return indexOf.apply(this, arguments);
        length = toPosInt(value(this).length);
        fromIndex = arguments[1];
        if (isNaN(fromIndex))
          fromIndex = 0;
        else if (fromIndex >= 0)
          fromIndex = floor(fromIndex);
        else
          fromIndex = toPosInt(this.length) - floor(abs(fromIndex));
        for (i = fromIndex; i < length; ++i) {
          if (objHasOwnProperty.call(this, i)) {
            val = this[i];
            if (numberIsNaN(val))
              return i;
          }
        }
        return -1;
      };
    }, { "../../number/is-nan": 32, "../../number/to-pos-integer": 36, "../../object/valid-value": 56 }], 23: [function(require2, module3, exports3) {
      module3.exports = require2("./is-implemented")() ? Array.from : require2("./shim");
    }, { "./is-implemented": 24, "./shim": 25 }], 24: [function(require2, module3, exports3) {
      module3.exports = function() {
        var from = Array.from, arr, result;
        if (typeof from !== "function")
          return false;
        arr = ["raz", "dwa"];
        result = from(arr);
        return Boolean(result && result !== arr && result[1] === "dwa");
      };
    }, {}], 25: [function(require2, module3, exports3) {
      var iteratorSymbol = require2("es6-symbol").iterator, isArguments = require2("../../function/is-arguments"), isFunction2 = require2("../../function/is-function"), toPosInt = require2("../../number/to-pos-integer"), callable = require2("../../object/valid-callable"), validValue = require2("../../object/valid-value"), isValue = require2("../../object/is-value"), isString2 = require2("../../string/is-string"), isArray2 = Array.isArray, call = Function.prototype.call, desc = { configurable: true, enumerable: true, writable: true, value: null }, defineProperty = Object.defineProperty;
      module3.exports = function(arrayLike) {
        var mapFn = arguments[1], thisArg = arguments[2], Context, i, j, arr, length, code, iterator, result, getIterator, value;
        arrayLike = Object(validValue(arrayLike));
        if (isValue(mapFn))
          callable(mapFn);
        if (!this || this === Array || !isFunction2(this)) {
          if (!mapFn) {
            if (isArguments(arrayLike)) {
              length = arrayLike.length;
              if (length !== 1)
                return Array.apply(null, arrayLike);
              arr = new Array(1);
              arr[0] = arrayLike[0];
              return arr;
            }
            if (isArray2(arrayLike)) {
              arr = new Array(length = arrayLike.length);
              for (i = 0; i < length; ++i)
                arr[i] = arrayLike[i];
              return arr;
            }
          }
          arr = [];
        } else {
          Context = this;
        }
        if (!isArray2(arrayLike)) {
          if ((getIterator = arrayLike[iteratorSymbol]) !== void 0) {
            iterator = callable(getIterator).call(arrayLike);
            if (Context)
              arr = new Context();
            result = iterator.next();
            i = 0;
            while (!result.done) {
              value = mapFn ? call.call(mapFn, thisArg, result.value, i) : result.value;
              if (Context) {
                desc.value = value;
                defineProperty(arr, i, desc);
              } else {
                arr[i] = value;
              }
              result = iterator.next();
              ++i;
            }
            length = i;
          } else if (isString2(arrayLike)) {
            length = arrayLike.length;
            if (Context)
              arr = new Context();
            for (i = 0, j = 0; i < length; ++i) {
              value = arrayLike[i];
              if (i + 1 < length) {
                code = value.charCodeAt(0);
                if (code >= 55296 && code <= 56319)
                  value += arrayLike[++i];
              }
              value = mapFn ? call.call(mapFn, thisArg, value, j) : value;
              if (Context) {
                desc.value = value;
                defineProperty(arr, j, desc);
              } else {
                arr[j] = value;
              }
              ++j;
            }
            length = j;
          }
        }
        if (length === void 0) {
          length = toPosInt(arrayLike.length);
          if (Context)
            arr = new Context(length);
          for (i = 0; i < length; ++i) {
            value = mapFn ? call.call(mapFn, thisArg, arrayLike[i], i) : arrayLike[i];
            if (Context) {
              desc.value = value;
              defineProperty(arr, i, desc);
            } else {
              arr[i] = value;
            }
          }
        }
        if (Context) {
          desc.value = null;
          arr.length = length;
        }
        return arr;
      };
    }, { "../../function/is-arguments": 26, "../../function/is-function": 27, "../../number/to-pos-integer": 36, "../../object/is-value": 45, "../../object/valid-callable": 55, "../../object/valid-value": 56, "../../string/is-string": 60, "es6-symbol": 74 }], 26: [function(require2, module3, exports3) {
      var objToString = Object.prototype.toString, id = objToString.call(function() {
        return arguments;
      }());
      module3.exports = function(value) {
        return objToString.call(value) === id;
      };
    }, {}], 27: [function(require2, module3, exports3) {
      var objToString = Object.prototype.toString, isFunctionStringTag = RegExp.prototype.test.bind(/^[object [A-Za-z0-9]*Function]$/);
      module3.exports = function(value) {
        return typeof value === "function" && isFunctionStringTag(objToString.call(value));
      };
    }, {}], 28: [function(require2, module3, exports3) {
      module3.exports = function() {
      };
    }, {}], 29: [function(require2, module3, exports3) {
      module3.exports = require2("./is-implemented")() ? Math.sign : require2("./shim");
    }, { "./is-implemented": 30, "./shim": 31 }], 30: [function(require2, module3, exports3) {
      module3.exports = function() {
        var sign = Math.sign;
        if (typeof sign !== "function")
          return false;
        return sign(10) === 1 && sign(-20) === -1;
      };
    }, {}], 31: [function(require2, module3, exports3) {
      module3.exports = function(value) {
        value = Number(value);
        if (isNaN(value) || value === 0)
          return value;
        return value > 0 ? 1 : -1;
      };
    }, {}], 32: [function(require2, module3, exports3) {
      module3.exports = require2("./is-implemented")() ? Number.isNaN : require2("./shim");
    }, { "./is-implemented": 33, "./shim": 34 }], 33: [function(require2, module3, exports3) {
      module3.exports = function() {
        var numberIsNaN = Number.isNaN;
        if (typeof numberIsNaN !== "function")
          return false;
        return !numberIsNaN({}) && numberIsNaN(NaN) && !numberIsNaN(34);
      };
    }, {}], 34: [function(require2, module3, exports3) {
      module3.exports = function(value) {
        return value !== value;
      };
    }, {}], 35: [function(require2, module3, exports3) {
      var sign = require2("../math/sign"), abs = Math.abs, floor = Math.floor;
      module3.exports = function(value) {
        if (isNaN(value))
          return 0;
        value = Number(value);
        if (value === 0 || !isFinite(value))
          return value;
        return sign(value) * floor(abs(value));
      };
    }, { "../math/sign": 29 }], 36: [function(require2, module3, exports3) {
      var toInteger = require2("./to-integer"), max = Math.max;
      module3.exports = function(value) {
        return max(0, toInteger(value));
      };
    }, { "./to-integer": 35 }], 37: [function(require2, module3, exports3) {
      var callable = require2("./valid-callable"), value = require2("./valid-value"), bind = Function.prototype.bind, call = Function.prototype.call, keys = Object.keys, objPropertyIsEnumerable = Object.prototype.propertyIsEnumerable;
      module3.exports = function(method, defVal) {
        return function(obj, cb) {
          var list, thisArg = arguments[2], compareFn = arguments[3];
          obj = Object(value(obj));
          callable(cb);
          list = keys(obj);
          if (compareFn) {
            list.sort(typeof compareFn === "function" ? bind.call(compareFn, obj) : void 0);
          }
          if (typeof method !== "function")
            method = list[method];
          return call.call(method, list, function(key, index2) {
            if (!objPropertyIsEnumerable.call(obj, key))
              return defVal;
            return call.call(cb, thisArg, obj[key], key, obj, index2);
          });
        };
      };
    }, { "./valid-callable": 55, "./valid-value": 56 }], 38: [function(require2, module3, exports3) {
      module3.exports = require2("./is-implemented")() ? Object.assign : require2("./shim");
    }, { "./is-implemented": 39, "./shim": 40 }], 39: [function(require2, module3, exports3) {
      module3.exports = function() {
        var assign2 = Object.assign, obj;
        if (typeof assign2 !== "function")
          return false;
        obj = { foo: "raz" };
        assign2(obj, { bar: "dwa" }, { trzy: "trzy" });
        return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
      };
    }, {}], 40: [function(require2, module3, exports3) {
      var keys = require2("../keys"), value = require2("../valid-value"), max = Math.max;
      module3.exports = function(dest, src) {
        var error, i, length = max(arguments.length, 2), assign2;
        dest = Object(value(dest));
        assign2 = function(key) {
          try {
            dest[key] = src[key];
          } catch (e2) {
            if (!error)
              error = e2;
          }
        };
        for (i = 1; i < length; ++i) {
          src = arguments[i];
          keys(src).forEach(assign2);
        }
        if (error !== void 0)
          throw error;
        return dest;
      };
    }, { "../keys": 46, "../valid-value": 56 }], 41: [function(require2, module3, exports3) {
      var aFrom = require2("../array/from"), assign2 = require2("./assign"), value = require2("./valid-value");
      module3.exports = function(obj) {
        var copy = Object(value(obj)), propertyNames = arguments[1], options = Object(arguments[2]);
        if (copy !== obj && !propertyNames)
          return copy;
        var result = {};
        if (propertyNames) {
          aFrom(propertyNames, function(propertyName) {
            if (options.ensure || propertyName in obj)
              result[propertyName] = obj[propertyName];
          });
        } else {
          assign2(result, obj);
        }
        return result;
      };
    }, { "../array/from": 23, "./assign": 38, "./valid-value": 56 }], 42: [function(require2, module3, exports3) {
      var create = Object.create, shim;
      if (!require2("./set-prototype-of/is-implemented")()) {
        shim = require2("./set-prototype-of/shim");
      }
      module3.exports = function() {
        var nullObject, polyProps, desc;
        if (!shim)
          return create;
        if (shim.level !== 1)
          return create;
        nullObject = {};
        polyProps = {};
        desc = { configurable: false, enumerable: false, writable: true, value: void 0 };
        Object.getOwnPropertyNames(Object.prototype).forEach(function(name) {
          if (name === "__proto__") {
            polyProps[name] = {
              configurable: true,
              enumerable: false,
              writable: true,
              value: void 0
            };
            return;
          }
          polyProps[name] = desc;
        });
        Object.defineProperties(nullObject, polyProps);
        Object.defineProperty(shim, "nullPolyfill", {
          configurable: false,
          enumerable: false,
          writable: false,
          value: nullObject
        });
        return function(prototype, props) {
          return create(prototype === null ? nullObject : prototype, props);
        };
      }();
    }, { "./set-prototype-of/is-implemented": 53, "./set-prototype-of/shim": 54 }], 43: [function(require2, module3, exports3) {
      module3.exports = require2("./_iterate")("forEach");
    }, { "./_iterate": 37 }], 44: [function(require2, module3, exports3) {
      var isValue = require2("./is-value");
      var map = { function: true, object: true };
      module3.exports = function(value) {
        return isValue(value) && map[typeof value] || false;
      };
    }, { "./is-value": 45 }], 45: [function(require2, module3, exports3) {
      var _undefined = require2("../function/noop")();
      module3.exports = function(val) {
        return val !== _undefined && val !== null;
      };
    }, { "../function/noop": 28 }], 46: [function(require2, module3, exports3) {
      module3.exports = require2("./is-implemented")() ? Object.keys : require2("./shim");
    }, { "./is-implemented": 47, "./shim": 48 }], 47: [function(require2, module3, exports3) {
      module3.exports = function() {
        try {
          Object.keys("primitive");
          return true;
        } catch (e2) {
          return false;
        }
      };
    }, {}], 48: [function(require2, module3, exports3) {
      var isValue = require2("../is-value");
      var keys = Object.keys;
      module3.exports = function(object) {
        return keys(isValue(object) ? Object(object) : object);
      };
    }, { "../is-value": 45 }], 49: [function(require2, module3, exports3) {
      var callable = require2("./valid-callable"), forEach = require2("./for-each"), call = Function.prototype.call;
      module3.exports = function(obj, cb) {
        var result = {}, thisArg = arguments[2];
        callable(cb);
        forEach(obj, function(value, key, targetObj, index2) {
          result[key] = call.call(cb, thisArg, value, key, targetObj, index2);
        });
        return result;
      };
    }, { "./for-each": 43, "./valid-callable": 55 }], 50: [function(require2, module3, exports3) {
      var isValue = require2("./is-value");
      var forEach = Array.prototype.forEach, create = Object.create;
      var process = function(src, obj) {
        var key;
        for (key in src)
          obj[key] = src[key];
      };
      module3.exports = function(opts1) {
        var result = create(null);
        forEach.call(arguments, function(options) {
          if (!isValue(options))
            return;
          process(Object(options), result);
        });
        return result;
      };
    }, { "./is-value": 45 }], 51: [function(require2, module3, exports3) {
      var forEach = Array.prototype.forEach, create = Object.create;
      module3.exports = function(arg) {
        var set2 = create(null);
        forEach.call(arguments, function(name) {
          set2[name] = true;
        });
        return set2;
      };
    }, {}], 52: [function(require2, module3, exports3) {
      module3.exports = require2("./is-implemented")() ? Object.setPrototypeOf : require2("./shim");
    }, { "./is-implemented": 53, "./shim": 54 }], 53: [function(require2, module3, exports3) {
      var create = Object.create, getPrototypeOf = Object.getPrototypeOf, plainObject = {};
      module3.exports = function() {
        var setPrototypeOf = Object.setPrototypeOf, customCreate = arguments[0] || create;
        if (typeof setPrototypeOf !== "function")
          return false;
        return getPrototypeOf(setPrototypeOf(customCreate(null), plainObject)) === plainObject;
      };
    }, {}], 54: [function(require2, module3, exports3) {
      var isObject2 = require2("../is-object"), value = require2("../valid-value"), objIsPrototypeOf = Object.prototype.isPrototypeOf, defineProperty = Object.defineProperty, nullDesc = { configurable: true, enumerable: false, writable: true, value: void 0 }, validate;
      validate = function(obj, prototype) {
        value(obj);
        if (prototype === null || isObject2(prototype))
          return obj;
        throw new TypeError("Prototype must be null or an object");
      };
      module3.exports = function(status) {
        var fn, set2;
        if (!status)
          return null;
        if (status.level === 2) {
          if (status.set) {
            set2 = status.set;
            fn = function(obj, prototype) {
              set2.call(validate(obj, prototype), prototype);
              return obj;
            };
          } else {
            fn = function(obj, prototype) {
              validate(obj, prototype).__proto__ = prototype;
              return obj;
            };
          }
        } else {
          fn = function self2(obj, prototype) {
            var isNullBase;
            validate(obj, prototype);
            isNullBase = objIsPrototypeOf.call(self2.nullPolyfill, obj);
            if (isNullBase)
              delete self2.nullPolyfill.__proto__;
            if (prototype === null)
              prototype = self2.nullPolyfill;
            obj.__proto__ = prototype;
            if (isNullBase)
              defineProperty(self2.nullPolyfill, "__proto__", nullDesc);
            return obj;
          };
        }
        return Object.defineProperty(fn, "level", {
          configurable: false,
          enumerable: false,
          writable: false,
          value: status.level
        });
      }(
        function() {
          var tmpObj1 = /* @__PURE__ */ Object.create(null), tmpObj2 = {}, set2, desc = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__");
          if (desc) {
            try {
              set2 = desc.set;
              set2.call(tmpObj1, tmpObj2);
            } catch (ignore) {
            }
            if (Object.getPrototypeOf(tmpObj1) === tmpObj2)
              return { set: set2, level: 2 };
          }
          tmpObj1.__proto__ = tmpObj2;
          if (Object.getPrototypeOf(tmpObj1) === tmpObj2)
            return { level: 2 };
          tmpObj1 = {};
          tmpObj1.__proto__ = tmpObj2;
          if (Object.getPrototypeOf(tmpObj1) === tmpObj2)
            return { level: 1 };
          return false;
        }()
      );
      require2("../create");
    }, { "../create": 42, "../is-object": 44, "../valid-value": 56 }], 55: [function(require2, module3, exports3) {
      module3.exports = function(fn) {
        if (typeof fn !== "function")
          throw new TypeError(fn + " is not a function");
        return fn;
      };
    }, {}], 56: [function(require2, module3, exports3) {
      var isValue = require2("./is-value");
      module3.exports = function(value) {
        if (!isValue(value))
          throw new TypeError("Cannot use null or undefined");
        return value;
      };
    }, { "./is-value": 45 }], 57: [function(require2, module3, exports3) {
      module3.exports = require2("./is-implemented")() ? String.prototype.contains : require2("./shim");
    }, { "./is-implemented": 58, "./shim": 59 }], 58: [function(require2, module3, exports3) {
      var str = "razdwatrzy";
      module3.exports = function() {
        if (typeof str.contains !== "function")
          return false;
        return str.contains("dwa") === true && str.contains("foo") === false;
      };
    }, {}], 59: [function(require2, module3, exports3) {
      var indexOf = String.prototype.indexOf;
      module3.exports = function(searchString) {
        return indexOf.call(this, searchString, arguments[1]) > -1;
      };
    }, {}], 60: [function(require2, module3, exports3) {
      var objToString = Object.prototype.toString, id = objToString.call("");
      module3.exports = function(value) {
        return typeof value === "string" || value && typeof value === "object" && (value instanceof String || objToString.call(value) === id) || false;
      };
    }, {}], 61: [function(require2, module3, exports3) {
      var setPrototypeOf = require2("es5-ext/object/set-prototype-of"), contains = require2("es5-ext/string/#/contains"), d = require2("d"), Symbol2 = require2("es6-symbol"), Iterator = require2("./");
      var defineProperty = Object.defineProperty, ArrayIterator;
      ArrayIterator = module3.exports = function(arr, kind) {
        if (!(this instanceof ArrayIterator))
          throw new TypeError("Constructor requires 'new'");
        Iterator.call(this, arr);
        if (!kind)
          kind = "value";
        else if (contains.call(kind, "key+value"))
          kind = "key+value";
        else if (contains.call(kind, "key"))
          kind = "key";
        else
          kind = "value";
        defineProperty(this, "__kind__", d("", kind));
      };
      if (setPrototypeOf)
        setPrototypeOf(ArrayIterator, Iterator);
      delete ArrayIterator.prototype.constructor;
      ArrayIterator.prototype = Object.create(Iterator.prototype, {
        _resolve: d(function(i) {
          if (this.__kind__ === "value")
            return this.__list__[i];
          if (this.__kind__ === "key+value")
            return [i, this.__list__[i]];
          return i;
        })
      });
      defineProperty(ArrayIterator.prototype, Symbol2.toStringTag, d("c", "Array Iterator"));
    }, { "./": 64, "d": 16, "es5-ext/object/set-prototype-of": 52, "es5-ext/string/#/contains": 57, "es6-symbol": 74 }], 62: [function(require2, module3, exports3) {
      var isArguments = require2("es5-ext/function/is-arguments"), callable = require2("es5-ext/object/valid-callable"), isString2 = require2("es5-ext/string/is-string"), get2 = require2("./get");
      var isArray2 = Array.isArray, call = Function.prototype.call, some = Array.prototype.some;
      module3.exports = function(iterable, cb) {
        var mode, thisArg = arguments[2], result, doBreak, broken, i, length, char, code;
        if (isArray2(iterable) || isArguments(iterable))
          mode = "array";
        else if (isString2(iterable))
          mode = "string";
        else
          iterable = get2(iterable);
        callable(cb);
        doBreak = function() {
          broken = true;
        };
        if (mode === "array") {
          some.call(iterable, function(value) {
            call.call(cb, thisArg, value, doBreak);
            return broken;
          });
          return;
        }
        if (mode === "string") {
          length = iterable.length;
          for (i = 0; i < length; ++i) {
            char = iterable[i];
            if (i + 1 < length) {
              code = char.charCodeAt(0);
              if (code >= 55296 && code <= 56319)
                char += iterable[++i];
            }
            call.call(cb, thisArg, char, doBreak);
            if (broken)
              break;
          }
          return;
        }
        result = iterable.next();
        while (!result.done) {
          call.call(cb, thisArg, result.value, doBreak);
          if (broken)
            return;
          result = iterable.next();
        }
      };
    }, { "./get": 63, "es5-ext/function/is-arguments": 26, "es5-ext/object/valid-callable": 55, "es5-ext/string/is-string": 60 }], 63: [function(require2, module3, exports3) {
      var isArguments = require2("es5-ext/function/is-arguments"), isString2 = require2("es5-ext/string/is-string"), ArrayIterator = require2("./array"), StringIterator = require2("./string"), iterable = require2("./valid-iterable"), iteratorSymbol = require2("es6-symbol").iterator;
      module3.exports = function(obj) {
        if (typeof iterable(obj)[iteratorSymbol] === "function")
          return obj[iteratorSymbol]();
        if (isArguments(obj))
          return new ArrayIterator(obj);
        if (isString2(obj))
          return new StringIterator(obj);
        return new ArrayIterator(obj);
      };
    }, { "./array": 61, "./string": 66, "./valid-iterable": 67, "es5-ext/function/is-arguments": 26, "es5-ext/string/is-string": 60, "es6-symbol": 74 }], 64: [function(require2, module3, exports3) {
      var clear2 = require2("es5-ext/array/#/clear"), assign2 = require2("es5-ext/object/assign"), callable = require2("es5-ext/object/valid-callable"), value = require2("es5-ext/object/valid-value"), d = require2("d"), autoBind = require2("d/auto-bind"), Symbol2 = require2("es6-symbol");
      var defineProperty = Object.defineProperty, defineProperties = Object.defineProperties, Iterator;
      module3.exports = Iterator = function(list, context) {
        if (!(this instanceof Iterator))
          throw new TypeError("Constructor requires 'new'");
        defineProperties(this, {
          __list__: d("w", value(list)),
          __context__: d("w", context),
          __nextIndex__: d("w", 0)
        });
        if (!context)
          return;
        callable(context.on);
        context.on("_add", this._onAdd);
        context.on("_delete", this._onDelete);
        context.on("_clear", this._onClear);
      };
      delete Iterator.prototype.constructor;
      defineProperties(
        Iterator.prototype,
        assign2(
          {
            _next: d(function() {
              var i;
              if (!this.__list__)
                return void 0;
              if (this.__redo__) {
                i = this.__redo__.shift();
                if (i !== void 0)
                  return i;
              }
              if (this.__nextIndex__ < this.__list__.length)
                return this.__nextIndex__++;
              this._unBind();
              return void 0;
            }),
            next: d(function() {
              return this._createResult(this._next());
            }),
            _createResult: d(function(i) {
              if (i === void 0)
                return { done: true, value: void 0 };
              return { done: false, value: this._resolve(i) };
            }),
            _resolve: d(function(i) {
              return this.__list__[i];
            }),
            _unBind: d(function() {
              this.__list__ = null;
              delete this.__redo__;
              if (!this.__context__)
                return;
              this.__context__.off("_add", this._onAdd);
              this.__context__.off("_delete", this._onDelete);
              this.__context__.off("_clear", this._onClear);
              this.__context__ = null;
            }),
            toString: d(function() {
              return "[object " + (this[Symbol2.toStringTag] || "Object") + "]";
            })
          },
          autoBind({
            _onAdd: d(function(index2) {
              if (index2 >= this.__nextIndex__)
                return;
              ++this.__nextIndex__;
              if (!this.__redo__) {
                defineProperty(this, "__redo__", d("c", [index2]));
                return;
              }
              this.__redo__.forEach(function(redo, i) {
                if (redo >= index2)
                  this.__redo__[i] = ++redo;
              }, this);
              this.__redo__.push(index2);
            }),
            _onDelete: d(function(index2) {
              var i;
              if (index2 >= this.__nextIndex__)
                return;
              --this.__nextIndex__;
              if (!this.__redo__)
                return;
              i = this.__redo__.indexOf(index2);
              if (i !== -1)
                this.__redo__.splice(i, 1);
              this.__redo__.forEach(function(redo, j) {
                if (redo > index2)
                  this.__redo__[j] = --redo;
              }, this);
            }),
            _onClear: d(function() {
              if (this.__redo__)
                clear2.call(this.__redo__);
              this.__nextIndex__ = 0;
            })
          })
        )
      );
      defineProperty(
        Iterator.prototype,
        Symbol2.iterator,
        d(function() {
          return this;
        })
      );
    }, { "d": 16, "d/auto-bind": 15, "es5-ext/array/#/clear": 21, "es5-ext/object/assign": 38, "es5-ext/object/valid-callable": 55, "es5-ext/object/valid-value": 56, "es6-symbol": 74 }], 65: [function(require2, module3, exports3) {
      var isArguments = require2("es5-ext/function/is-arguments"), isValue = require2("es5-ext/object/is-value"), isString2 = require2("es5-ext/string/is-string");
      var iteratorSymbol = require2("es6-symbol").iterator, isArray2 = Array.isArray;
      module3.exports = function(value) {
        if (!isValue(value))
          return false;
        if (isArray2(value))
          return true;
        if (isString2(value))
          return true;
        if (isArguments(value))
          return true;
        return typeof value[iteratorSymbol] === "function";
      };
    }, { "es5-ext/function/is-arguments": 26, "es5-ext/object/is-value": 45, "es5-ext/string/is-string": 60, "es6-symbol": 74 }], 66: [function(require2, module3, exports3) {
      var setPrototypeOf = require2("es5-ext/object/set-prototype-of"), d = require2("d"), Symbol2 = require2("es6-symbol"), Iterator = require2("./");
      var defineProperty = Object.defineProperty, StringIterator;
      StringIterator = module3.exports = function(str) {
        if (!(this instanceof StringIterator))
          throw new TypeError("Constructor requires 'new'");
        str = String(str);
        Iterator.call(this, str);
        defineProperty(this, "__length__", d("", str.length));
      };
      if (setPrototypeOf)
        setPrototypeOf(StringIterator, Iterator);
      delete StringIterator.prototype.constructor;
      StringIterator.prototype = Object.create(Iterator.prototype, {
        _next: d(function() {
          if (!this.__list__)
            return void 0;
          if (this.__nextIndex__ < this.__length__)
            return this.__nextIndex__++;
          this._unBind();
          return void 0;
        }),
        _resolve: d(function(i) {
          var char = this.__list__[i], code;
          if (this.__nextIndex__ === this.__length__)
            return char;
          code = char.charCodeAt(0);
          if (code >= 55296 && code <= 56319)
            return char + this.__list__[this.__nextIndex__++];
          return char;
        })
      });
      defineProperty(StringIterator.prototype, Symbol2.toStringTag, d("c", "String Iterator"));
    }, { "./": 64, "d": 16, "es5-ext/object/set-prototype-of": 52, "es6-symbol": 74 }], 67: [function(require2, module3, exports3) {
      var isIterable = require2("./is-iterable");
      module3.exports = function(value) {
        if (!isIterable(value))
          throw new TypeError(value + " is not iterable");
        return value;
      };
    }, { "./is-iterable": 65 }], 68: [function(require2, module3, exports3) {
      module3.exports = require2("./is-implemented")() ? Map : require2("./polyfill");
    }, { "./is-implemented": 69, "./polyfill": 73 }], 69: [function(require2, module3, exports3) {
      module3.exports = function() {
        var map, iterator, result;
        if (typeof Map !== "function")
          return false;
        try {
          map = /* @__PURE__ */ new Map([["raz", "one"], ["dwa", "two"], ["trzy", "three"]]);
        } catch (e2) {
          return false;
        }
        if (String(map) !== "[object Map]")
          return false;
        if (map.size !== 3)
          return false;
        if (typeof map.clear !== "function")
          return false;
        if (typeof map.delete !== "function")
          return false;
        if (typeof map.entries !== "function")
          return false;
        if (typeof map.forEach !== "function")
          return false;
        if (typeof map.get !== "function")
          return false;
        if (typeof map.has !== "function")
          return false;
        if (typeof map.keys !== "function")
          return false;
        if (typeof map.set !== "function")
          return false;
        if (typeof map.values !== "function")
          return false;
        iterator = map.entries();
        result = iterator.next();
        if (result.done !== false)
          return false;
        if (!result.value)
          return false;
        if (result.value[0] !== "raz")
          return false;
        if (result.value[1] !== "one")
          return false;
        return true;
      };
    }, {}], 70: [function(require2, module3, exports3) {
      module3.exports = function() {
        if (typeof Map === "undefined")
          return false;
        return Object.prototype.toString.call(/* @__PURE__ */ new Map()) === "[object Map]";
      }();
    }, {}], 71: [function(require2, module3, exports3) {
      module3.exports = require2("es5-ext/object/primitive-set")(
        "key",
        "value",
        "key+value"
      );
    }, { "es5-ext/object/primitive-set": 51 }], 72: [function(require2, module3, exports3) {
      var setPrototypeOf = require2("es5-ext/object/set-prototype-of"), d = require2("d"), Iterator = require2("es6-iterator"), toStringTagSymbol = require2("es6-symbol").toStringTag, kinds = require2("./iterator-kinds"), defineProperties = Object.defineProperties, unBind = Iterator.prototype._unBind, MapIterator;
      MapIterator = module3.exports = function(map, kind) {
        if (!(this instanceof MapIterator))
          return new MapIterator(map, kind);
        Iterator.call(this, map.__mapKeysData__, map);
        if (!kind || !kinds[kind])
          kind = "key+value";
        defineProperties(this, {
          __kind__: d("", kind),
          __values__: d("w", map.__mapValuesData__)
        });
      };
      if (setPrototypeOf)
        setPrototypeOf(MapIterator, Iterator);
      MapIterator.prototype = Object.create(Iterator.prototype, {
        constructor: d(MapIterator),
        _resolve: d(function(i) {
          if (this.__kind__ === "value")
            return this.__values__[i];
          if (this.__kind__ === "key")
            return this.__list__[i];
          return [this.__list__[i], this.__values__[i]];
        }),
        _unBind: d(function() {
          this.__values__ = null;
          unBind.call(this);
        }),
        toString: d(function() {
          return "[object Map Iterator]";
        })
      });
      Object.defineProperty(
        MapIterator.prototype,
        toStringTagSymbol,
        d("c", "Map Iterator")
      );
    }, { "./iterator-kinds": 71, "d": 16, "es5-ext/object/set-prototype-of": 52, "es6-iterator": 64, "es6-symbol": 74 }], 73: [function(require2, module3, exports3) {
      var clear2 = require2("es5-ext/array/#/clear"), eIndexOf = require2("es5-ext/array/#/e-index-of"), setPrototypeOf = require2("es5-ext/object/set-prototype-of"), callable = require2("es5-ext/object/valid-callable"), validValue = require2("es5-ext/object/valid-value"), d = require2("d"), ee = require2("event-emitter"), Symbol2 = require2("es6-symbol"), iterator = require2("es6-iterator/valid-iterable"), forOf = require2("es6-iterator/for-of"), Iterator = require2("./lib/iterator"), isNative = require2("./is-native-implemented"), call = Function.prototype.call, defineProperties = Object.defineProperties, getPrototypeOf = Object.getPrototypeOf, MapPoly;
      module3.exports = MapPoly = function() {
        var iterable = arguments[0], keys, values, self2;
        if (!(this instanceof MapPoly))
          throw new TypeError("Constructor requires 'new'");
        if (isNative && setPrototypeOf && Map !== MapPoly) {
          self2 = setPrototypeOf(/* @__PURE__ */ new Map(), getPrototypeOf(this));
        } else {
          self2 = this;
        }
        if (iterable != null)
          iterator(iterable);
        defineProperties(self2, {
          __mapKeysData__: d("c", keys = []),
          __mapValuesData__: d("c", values = [])
        });
        if (!iterable)
          return self2;
        forOf(iterable, function(value) {
          var key = validValue(value)[0];
          value = value[1];
          if (eIndexOf.call(keys, key) !== -1)
            return;
          keys.push(key);
          values.push(value);
        }, self2);
        return self2;
      };
      if (isNative) {
        if (setPrototypeOf)
          setPrototypeOf(MapPoly, Map);
        MapPoly.prototype = Object.create(Map.prototype, {
          constructor: d(MapPoly)
        });
      }
      ee(defineProperties(MapPoly.prototype, {
        clear: d(function() {
          if (!this.__mapKeysData__.length)
            return;
          clear2.call(this.__mapKeysData__);
          clear2.call(this.__mapValuesData__);
          this.emit("_clear");
        }),
        delete: d(function(key) {
          var index2 = eIndexOf.call(this.__mapKeysData__, key);
          if (index2 === -1)
            return false;
          this.__mapKeysData__.splice(index2, 1);
          this.__mapValuesData__.splice(index2, 1);
          this.emit("_delete", index2, key);
          return true;
        }),
        entries: d(function() {
          return new Iterator(this, "key+value");
        }),
        forEach: d(function(cb) {
          var thisArg = arguments[1], iterator2, result;
          callable(cb);
          iterator2 = this.entries();
          result = iterator2._next();
          while (result !== void 0) {
            call.call(
              cb,
              thisArg,
              this.__mapValuesData__[result],
              this.__mapKeysData__[result],
              this
            );
            result = iterator2._next();
          }
        }),
        get: d(function(key) {
          var index2 = eIndexOf.call(this.__mapKeysData__, key);
          if (index2 === -1)
            return;
          return this.__mapValuesData__[index2];
        }),
        has: d(function(key) {
          return eIndexOf.call(this.__mapKeysData__, key) !== -1;
        }),
        keys: d(function() {
          return new Iterator(this, "key");
        }),
        set: d(function(key, value) {
          var index2 = eIndexOf.call(this.__mapKeysData__, key), emit2;
          if (index2 === -1) {
            index2 = this.__mapKeysData__.push(key) - 1;
            emit2 = true;
          }
          this.__mapValuesData__[index2] = value;
          if (emit2)
            this.emit("_add", index2, key);
          return this;
        }),
        size: d.gs(function() {
          return this.__mapKeysData__.length;
        }),
        values: d(function() {
          return new Iterator(this, "value");
        }),
        toString: d(function() {
          return "[object Map]";
        })
      }));
      Object.defineProperty(MapPoly.prototype, Symbol2.iterator, d(function() {
        return this.entries();
      }));
      Object.defineProperty(MapPoly.prototype, Symbol2.toStringTag, d("c", "Map"));
    }, { "./is-native-implemented": 70, "./lib/iterator": 72, "d": 16, "es5-ext/array/#/clear": 21, "es5-ext/array/#/e-index-of": 22, "es5-ext/object/set-prototype-of": 52, "es5-ext/object/valid-callable": 55, "es5-ext/object/valid-value": 56, "es6-iterator/for-of": 62, "es6-iterator/valid-iterable": 67, "es6-symbol": 74, "event-emitter": 82 }], 74: [function(require2, module3, exports3) {
      module3.exports = require2("./is-implemented")() ? require2("ext/global-this").Symbol : require2("./polyfill");
    }, { "./is-implemented": 75, "./polyfill": 80, "ext/global-this": 85 }], 75: [function(require2, module3, exports3) {
      var global2 = require2("ext/global-this"), validTypes = { object: true, symbol: true };
      module3.exports = function() {
        var Symbol2 = global2.Symbol;
        var symbol;
        if (typeof Symbol2 !== "function")
          return false;
        symbol = Symbol2("test symbol");
        try {
          String(symbol);
        } catch (e2) {
          return false;
        }
        if (!validTypes[typeof Symbol2.iterator])
          return false;
        if (!validTypes[typeof Symbol2.toPrimitive])
          return false;
        if (!validTypes[typeof Symbol2.toStringTag])
          return false;
        return true;
      };
    }, { "ext/global-this": 85 }], 76: [function(require2, module3, exports3) {
      module3.exports = function(value) {
        if (!value)
          return false;
        if (typeof value === "symbol")
          return true;
        if (!value.constructor)
          return false;
        if (value.constructor.name !== "Symbol")
          return false;
        return value[value.constructor.toStringTag] === "Symbol";
      };
    }, {}], 77: [function(require2, module3, exports3) {
      var d = require2("d");
      var create = Object.create, defineProperty = Object.defineProperty, objPrototype = Object.prototype;
      var created = create(null);
      module3.exports = function(desc) {
        var postfix = 0, name, ie11BugWorkaround;
        while (created[desc + (postfix || "")])
          ++postfix;
        desc += postfix || "";
        created[desc] = true;
        name = "@@" + desc;
        defineProperty(
          objPrototype,
          name,
          d.gs(null, function(value) {
            if (ie11BugWorkaround)
              return;
            ie11BugWorkaround = true;
            defineProperty(this, name, d(value));
            ie11BugWorkaround = false;
          })
        );
        return name;
      };
    }, { "d": 16 }], 78: [function(require2, module3, exports3) {
      var d = require2("d"), NativeSymbol = require2("ext/global-this").Symbol;
      module3.exports = function(SymbolPolyfill) {
        return Object.defineProperties(SymbolPolyfill, {
          // To ensure proper interoperability with other native functions (e.g. Array.from)
          // fallback to eventual native implementation of given symbol
          hasInstance: d(
            "",
            NativeSymbol && NativeSymbol.hasInstance || SymbolPolyfill("hasInstance")
          ),
          isConcatSpreadable: d(
            "",
            NativeSymbol && NativeSymbol.isConcatSpreadable || SymbolPolyfill("isConcatSpreadable")
          ),
          iterator: d("", NativeSymbol && NativeSymbol.iterator || SymbolPolyfill("iterator")),
          match: d("", NativeSymbol && NativeSymbol.match || SymbolPolyfill("match")),
          replace: d("", NativeSymbol && NativeSymbol.replace || SymbolPolyfill("replace")),
          search: d("", NativeSymbol && NativeSymbol.search || SymbolPolyfill("search")),
          species: d("", NativeSymbol && NativeSymbol.species || SymbolPolyfill("species")),
          split: d("", NativeSymbol && NativeSymbol.split || SymbolPolyfill("split")),
          toPrimitive: d(
            "",
            NativeSymbol && NativeSymbol.toPrimitive || SymbolPolyfill("toPrimitive")
          ),
          toStringTag: d(
            "",
            NativeSymbol && NativeSymbol.toStringTag || SymbolPolyfill("toStringTag")
          ),
          unscopables: d(
            "",
            NativeSymbol && NativeSymbol.unscopables || SymbolPolyfill("unscopables")
          )
        });
      };
    }, { "d": 16, "ext/global-this": 85 }], 79: [function(require2, module3, exports3) {
      var d = require2("d"), validateSymbol = require2("../../../validate-symbol");
      var registry = /* @__PURE__ */ Object.create(null);
      module3.exports = function(SymbolPolyfill) {
        return Object.defineProperties(SymbolPolyfill, {
          for: d(function(key) {
            if (registry[key])
              return registry[key];
            return registry[key] = SymbolPolyfill(String(key));
          }),
          keyFor: d(function(symbol) {
            var key;
            validateSymbol(symbol);
            for (key in registry) {
              if (registry[key] === symbol)
                return key;
            }
            return void 0;
          })
        });
      };
    }, { "../../../validate-symbol": 81, "d": 16 }], 80: [function(require2, module3, exports3) {
      var d = require2("d"), validateSymbol = require2("./validate-symbol"), NativeSymbol = require2("ext/global-this").Symbol, generateName = require2("./lib/private/generate-name"), setupStandardSymbols = require2("./lib/private/setup/standard-symbols"), setupSymbolRegistry = require2("./lib/private/setup/symbol-registry");
      var create = Object.create, defineProperties = Object.defineProperties, defineProperty = Object.defineProperty;
      var SymbolPolyfill, HiddenSymbol, isNativeSafe;
      if (typeof NativeSymbol === "function") {
        try {
          String(NativeSymbol());
          isNativeSafe = true;
        } catch (ignore) {
        }
      } else {
        NativeSymbol = null;
      }
      HiddenSymbol = function Symbol2(description) {
        if (this instanceof HiddenSymbol)
          throw new TypeError("Symbol is not a constructor");
        return SymbolPolyfill(description);
      };
      module3.exports = SymbolPolyfill = function Symbol2(description) {
        var symbol;
        if (this instanceof Symbol2)
          throw new TypeError("Symbol is not a constructor");
        if (isNativeSafe)
          return NativeSymbol(description);
        symbol = create(HiddenSymbol.prototype);
        description = description === void 0 ? "" : String(description);
        return defineProperties(symbol, {
          __description__: d("", description),
          __name__: d("", generateName(description))
        });
      };
      setupStandardSymbols(SymbolPolyfill);
      setupSymbolRegistry(SymbolPolyfill);
      defineProperties(HiddenSymbol.prototype, {
        constructor: d(SymbolPolyfill),
        toString: d("", function() {
          return this.__name__;
        })
      });
      defineProperties(SymbolPolyfill.prototype, {
        toString: d(function() {
          return "Symbol (" + validateSymbol(this).__description__ + ")";
        }),
        valueOf: d(function() {
          return validateSymbol(this);
        })
      });
      defineProperty(
        SymbolPolyfill.prototype,
        SymbolPolyfill.toPrimitive,
        d("", function() {
          var symbol = validateSymbol(this);
          if (typeof symbol === "symbol")
            return symbol;
          return symbol.toString();
        })
      );
      defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d("c", "Symbol"));
      defineProperty(
        HiddenSymbol.prototype,
        SymbolPolyfill.toStringTag,
        d("c", SymbolPolyfill.prototype[SymbolPolyfill.toStringTag])
      );
      defineProperty(
        HiddenSymbol.prototype,
        SymbolPolyfill.toPrimitive,
        d("c", SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive])
      );
    }, { "./lib/private/generate-name": 77, "./lib/private/setup/standard-symbols": 78, "./lib/private/setup/symbol-registry": 79, "./validate-symbol": 81, "d": 16, "ext/global-this": 85 }], 81: [function(require2, module3, exports3) {
      var isSymbol2 = require2("./is-symbol");
      module3.exports = function(value) {
        if (!isSymbol2(value))
          throw new TypeError(value + " is not a symbol");
        return value;
      };
    }, { "./is-symbol": 76 }], 82: [function(require2, module3, exports3) {
      var d = require2("d"), callable = require2("es5-ext/object/valid-callable"), apply = Function.prototype.apply, call = Function.prototype.call, create = Object.create, defineProperty = Object.defineProperty, defineProperties = Object.defineProperties, hasOwnProperty2 = Object.prototype.hasOwnProperty, descriptor = { configurable: true, enumerable: false, writable: true }, on, once2, off, emit2, methods, descriptors, base;
      on = function(type, listener) {
        var data;
        callable(listener);
        if (!hasOwnProperty2.call(this, "__ee__")) {
          data = descriptor.value = create(null);
          defineProperty(this, "__ee__", descriptor);
          descriptor.value = null;
        } else {
          data = this.__ee__;
        }
        if (!data[type])
          data[type] = listener;
        else if (typeof data[type] === "object")
          data[type].push(listener);
        else
          data[type] = [data[type], listener];
        return this;
      };
      once2 = function(type, listener) {
        var once3, self2;
        callable(listener);
        self2 = this;
        on.call(this, type, once3 = function() {
          off.call(self2, type, once3);
          apply.call(listener, this, arguments);
        });
        once3.__eeOnceListener__ = listener;
        return this;
      };
      off = function(type, listener) {
        var data, listeners, candidate, i;
        callable(listener);
        if (!hasOwnProperty2.call(this, "__ee__"))
          return this;
        data = this.__ee__;
        if (!data[type])
          return this;
        listeners = data[type];
        if (typeof listeners === "object") {
          for (i = 0; candidate = listeners[i]; ++i) {
            if (candidate === listener || candidate.__eeOnceListener__ === listener) {
              if (listeners.length === 2)
                data[type] = listeners[i ? 0 : 1];
              else
                listeners.splice(i, 1);
            }
          }
        } else {
          if (listeners === listener || listeners.__eeOnceListener__ === listener) {
            delete data[type];
          }
        }
        return this;
      };
      emit2 = function(type) {
        var i, l, listener, listeners, args;
        if (!hasOwnProperty2.call(this, "__ee__"))
          return;
        listeners = this.__ee__[type];
        if (!listeners)
          return;
        if (typeof listeners === "object") {
          l = arguments.length;
          args = new Array(l - 1);
          for (i = 1; i < l; ++i)
            args[i - 1] = arguments[i];
          listeners = listeners.slice();
          for (i = 0; listener = listeners[i]; ++i) {
            apply.call(listener, this, args);
          }
        } else {
          switch (arguments.length) {
            case 1:
              call.call(listeners, this);
              break;
            case 2:
              call.call(listeners, this, arguments[1]);
              break;
            case 3:
              call.call(listeners, this, arguments[1], arguments[2]);
              break;
            default:
              l = arguments.length;
              args = new Array(l - 1);
              for (i = 1; i < l; ++i) {
                args[i - 1] = arguments[i];
              }
              apply.call(listeners, this, args);
          }
        }
      };
      methods = {
        on,
        once: once2,
        off,
        emit: emit2
      };
      descriptors = {
        on: d(on),
        once: d(once2),
        off: d(off),
        emit: d(emit2)
      };
      base = defineProperties({}, descriptors);
      module3.exports = exports3 = function(o2) {
        return o2 == null ? create(base) : defineProperties(Object(o2), descriptors);
      };
      exports3.methods = methods;
    }, { "d": 16, "es5-ext/object/valid-callable": 55 }], 83: [function(require2, module3, exports3) {
      var objectCreate = Object.create || objectCreatePolyfill;
      var objectKeys2 = Object.keys || objectKeysPolyfill;
      var bind = Function.prototype.bind || functionBindPolyfill;
      function EventEmitter() {
        if (!this._events || !Object.prototype.hasOwnProperty.call(this, "_events")) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      }
      module3.exports = EventEmitter;
      EventEmitter.EventEmitter = EventEmitter;
      EventEmitter.prototype._events = void 0;
      EventEmitter.prototype._maxListeners = void 0;
      var defaultMaxListeners = 10;
      var hasDefineProperty;
      try {
        var o2 = {};
        if (Object.defineProperty)
          Object.defineProperty(o2, "x", { value: 0 });
        hasDefineProperty = o2.x === 0;
      } catch (err) {
        hasDefineProperty = false;
      }
      if (hasDefineProperty) {
        Object.defineProperty(EventEmitter, "defaultMaxListeners", {
          enumerable: true,
          get: function() {
            return defaultMaxListeners;
          },
          set: function(arg) {
            if (typeof arg !== "number" || arg < 0 || arg !== arg)
              throw new TypeError('"defaultMaxListeners" must be a positive number');
            defaultMaxListeners = arg;
          }
        });
      } else {
        EventEmitter.defaultMaxListeners = defaultMaxListeners;
      }
      EventEmitter.prototype.setMaxListeners = function setMaxListeners(n2) {
        if (typeof n2 !== "number" || n2 < 0 || isNaN(n2))
          throw new TypeError('"n" argument must be a positive number');
        this._maxListeners = n2;
        return this;
      };
      function $getMaxListeners(that) {
        if (that._maxListeners === void 0)
          return EventEmitter.defaultMaxListeners;
        return that._maxListeners;
      }
      EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
        return $getMaxListeners(this);
      };
      function emitNone(handler, isFn, self2) {
        if (isFn)
          handler.call(self2);
        else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            listeners[i].call(self2);
        }
      }
      function emitOne(handler, isFn, self2, arg1) {
        if (isFn)
          handler.call(self2, arg1);
        else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            listeners[i].call(self2, arg1);
        }
      }
      function emitTwo(handler, isFn, self2, arg1, arg2) {
        if (isFn)
          handler.call(self2, arg1, arg2);
        else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            listeners[i].call(self2, arg1, arg2);
        }
      }
      function emitThree(handler, isFn, self2, arg1, arg2, arg3) {
        if (isFn)
          handler.call(self2, arg1, arg2, arg3);
        else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            listeners[i].call(self2, arg1, arg2, arg3);
        }
      }
      function emitMany(handler, isFn, self2, args) {
        if (isFn)
          handler.apply(self2, args);
        else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            listeners[i].apply(self2, args);
        }
      }
      EventEmitter.prototype.emit = function emit2(type) {
        var er, handler, len, args, i, events;
        var doError = type === "error";
        events = this._events;
        if (events)
          doError = doError && events.error == null;
        else if (!doError)
          return false;
        if (doError) {
          if (arguments.length > 1)
            er = arguments[1];
          if (er instanceof Error) {
            throw er;
          } else {
            var err = new Error('Unhandled "error" event. (' + er + ")");
            err.context = er;
            throw err;
          }
        }
        handler = events[type];
        if (!handler)
          return false;
        var isFn = typeof handler === "function";
        len = arguments.length;
        switch (len) {
          case 1:
            emitNone(handler, isFn, this);
            break;
          case 2:
            emitOne(handler, isFn, this, arguments[1]);
            break;
          case 3:
            emitTwo(handler, isFn, this, arguments[1], arguments[2]);
            break;
          case 4:
            emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
            break;
          default:
            args = new Array(len - 1);
            for (i = 1; i < len; i++)
              args[i - 1] = arguments[i];
            emitMany(handler, isFn, this, args);
        }
        return true;
      };
      function _addListener(target, type, listener, prepend) {
        var m;
        var events;
        var existing;
        if (typeof listener !== "function")
          throw new TypeError('"listener" argument must be a function');
        events = target._events;
        if (!events) {
          events = target._events = objectCreate(null);
          target._eventsCount = 0;
        } else {
          if (events.newListener) {
            target.emit(
              "newListener",
              type,
              listener.listener ? listener.listener : listener
            );
            events = target._events;
          }
          existing = events[type];
        }
        if (!existing) {
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === "function") {
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
          } else {
            if (prepend) {
              existing.unshift(listener);
            } else {
              existing.push(listener);
            }
          }
          if (!existing.warned) {
            m = $getMaxListeners(target);
            if (m && m > 0 && existing.length > m) {
              existing.warned = true;
              var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + ' "' + String(type) + '" listeners added. Use emitter.setMaxListeners() to increase limit.');
              w.name = "MaxListenersExceededWarning";
              w.emitter = target;
              w.type = type;
              w.count = existing.length;
              if (typeof console === "object" && console.warn) {
                console.warn("%s: %s", w.name, w.message);
              }
            }
          }
        }
        return target;
      }
      EventEmitter.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };
      EventEmitter.prototype.on = EventEmitter.prototype.addListener;
      EventEmitter.prototype.prependListener = function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };
      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          switch (arguments.length) {
            case 0:
              return this.listener.call(this.target);
            case 1:
              return this.listener.call(this.target, arguments[0]);
            case 2:
              return this.listener.call(this.target, arguments[0], arguments[1]);
            case 3:
              return this.listener.call(
                this.target,
                arguments[0],
                arguments[1],
                arguments[2]
              );
            default:
              var args = new Array(arguments.length);
              for (var i = 0; i < args.length; ++i)
                args[i] = arguments[i];
              this.listener.apply(this.target, args);
          }
        }
      }
      function _onceWrap(target, type, listener) {
        var state = { fired: false, wrapFn: void 0, target, type, listener };
        var wrapped = bind.call(onceWrapper, state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }
      EventEmitter.prototype.once = function once2(type, listener) {
        if (typeof listener !== "function")
          throw new TypeError('"listener" argument must be a function');
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
        if (typeof listener !== "function")
          throw new TypeError('"listener" argument must be a function');
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter.prototype.removeListener = function removeListener(type, listener) {
        var list, events, position, i, originalListener;
        if (typeof listener !== "function")
          throw new TypeError('"listener" argument must be a function');
        events = this._events;
        if (!events)
          return this;
        list = events[type];
        if (!list)
          return this;
        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list.listener || listener);
          }
        } else if (typeof list !== "function") {
          position = -1;
          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }
          if (position < 0)
            return this;
          if (position === 0)
            list.shift();
          else
            spliceOne(list, position);
          if (list.length === 1)
            events[type] = list[0];
          if (events.removeListener)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      };
      EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
        var listeners, events, i;
        events = this._events;
        if (!events)
          return this;
        if (!events.removeListener) {
          if (arguments.length === 0) {
            this._events = objectCreate(null);
            this._eventsCount = 0;
          } else if (events[type]) {
            if (--this._eventsCount === 0)
              this._events = objectCreate(null);
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys = objectKeys2(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === "removeListener")
              continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = objectCreate(null);
          this._eventsCount = 0;
          return this;
        }
        listeners = events[type];
        if (typeof listeners === "function") {
          this.removeListener(type, listeners);
        } else if (listeners) {
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }
        return this;
      };
      function _listeners(target, type, unwrap) {
        var events = target._events;
        if (!events)
          return [];
        var evlistener = events[type];
        if (!evlistener)
          return [];
        if (typeof evlistener === "function")
          return unwrap ? [evlistener.listener || evlistener] : [evlistener];
        return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }
      EventEmitter.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };
      EventEmitter.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };
      EventEmitter.listenerCount = function(emitter2, type) {
        if (typeof emitter2.listenerCount === "function") {
          return emitter2.listenerCount(type);
        } else {
          return listenerCount.call(emitter2, type);
        }
      };
      EventEmitter.prototype.listenerCount = listenerCount;
      function listenerCount(type) {
        var events = this._events;
        if (events) {
          var evlistener = events[type];
          if (typeof evlistener === "function") {
            return 1;
          } else if (evlistener) {
            return evlistener.length;
          }
        }
        return 0;
      }
      EventEmitter.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
      };
      function spliceOne(list, index2) {
        for (var i = index2, k = i + 1, n2 = list.length; k < n2; i += 1, k += 1)
          list[i] = list[k];
        list.pop();
      }
      function arrayClone(arr, n2) {
        var copy = new Array(n2);
        for (var i = 0; i < n2; ++i)
          copy[i] = arr[i];
        return copy;
      }
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < ret.length; ++i) {
          ret[i] = arr[i].listener || arr[i];
        }
        return ret;
      }
      function objectCreatePolyfill(proto) {
        var F = function() {
        };
        F.prototype = proto;
        return new F();
      }
      function objectKeysPolyfill(obj) {
        for (var k in obj)
          if (Object.prototype.hasOwnProperty.call(obj, k))
            ;
        return k;
      }
      function functionBindPolyfill(context) {
        var fn = this;
        return function() {
          return fn.apply(context, arguments);
        };
      }
    }, {}], 84: [function(require2, module3, exports3) {
      var naiveFallback = function() {
        if (typeof self === "object" && self)
          return self;
        if (typeof window === "object" && window)
          return window;
        throw new Error("Unable to resolve global `this`");
      };
      module3.exports = function() {
        if (this)
          return this;
        try {
          Object.defineProperty(Object.prototype, "__global__", {
            get: function() {
              return this;
            },
            configurable: true
          });
        } catch (error) {
          return naiveFallback();
        }
        try {
          if (!__global__)
            return naiveFallback();
          return __global__;
        } finally {
          delete Object.prototype.__global__;
        }
      }();
    }, {}], 85: [function(require2, module3, exports3) {
      module3.exports = require2("./is-implemented")() ? globalThis : require2("./implementation");
    }, { "./implementation": 84, "./is-implemented": 86 }], 86: [function(require2, module3, exports3) {
      module3.exports = function() {
        if (typeof globalThis !== "object")
          return false;
        if (!globalThis)
          return false;
        return globalThis.Array === Array;
      };
    }, {}], 87: [function(require2, module3, exports3) {
      exports3.read = function(buffer2, offset, isLE, mLen, nBytes) {
        var e2, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s2 = buffer2[offset + i];
        i += d;
        e2 = s2 & (1 << -nBits) - 1;
        s2 >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e2 = e2 * 256 + buffer2[offset + i], i += d, nBits -= 8) {
        }
        m = e2 & (1 << -nBits) - 1;
        e2 >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer2[offset + i], i += d, nBits -= 8) {
        }
        if (e2 === 0) {
          e2 = 1 - eBias;
        } else if (e2 === eMax) {
          return m ? NaN : (s2 ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e2 = e2 - eBias;
        }
        return (s2 ? -1 : 1) * m * Math.pow(2, e2 - mLen);
      };
      exports3.write = function(buffer2, value, offset, isLE, mLen, nBytes) {
        var e2, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s2 = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e2 = eMax;
        } else {
          e2 = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e2)) < 1) {
            e2--;
            c *= 2;
          }
          if (e2 + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e2++;
            c /= 2;
          }
          if (e2 + eBias >= eMax) {
            m = 0;
            e2 = eMax;
          } else if (e2 + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e2 = e2 + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e2 = 0;
          }
        }
        for (; mLen >= 8; buffer2[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
        }
        e2 = e2 << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer2[offset + i] = e2 & 255, i += d, e2 /= 256, eLen -= 8) {
        }
        buffer2[offset + i - d] |= s2 * 128;
      };
    }, {}], 88: [function(require2, module3, exports3) {
      if (typeof Object.create === "function") {
        module3.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
          }
        };
      } else {
        module3.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {
            };
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          }
        };
      }
    }, {}], 89: [function(require2, module3, exports3) {
      /*!
       * Determine if an object is a Buffer
       *
       * @author   Feross Aboukhadijeh <https://feross.org>
       * @license  MIT
       */
      module3.exports = function(obj) {
        return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
      };
      function isBuffer(obj) {
        return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
      }
      function isSlowBuffer(obj) {
        return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isBuffer(obj.slice(0, 0));
      }
    }, {}], 90: [function(require2, module3, exports3) {
      var toString = {}.toString;
      module3.exports = Array.isArray || function(arr) {
        return toString.call(arr) == "[object Array]";
      };
    }, {}], 91: [function(require2, module3, exports3) {
      var Buffer = require2("safe-buffer").Buffer;
      var protocol = module3.exports;
      protocol.types = {
        0: "reserved",
        1: "connect",
        2: "connack",
        3: "publish",
        4: "puback",
        5: "pubrec",
        6: "pubrel",
        7: "pubcomp",
        8: "subscribe",
        9: "suback",
        10: "unsubscribe",
        11: "unsuback",
        12: "pingreq",
        13: "pingresp",
        14: "disconnect",
        15: "auth"
      };
      protocol.codes = {};
      for (var k in protocol.types) {
        var v = protocol.types[k];
        protocol.codes[v] = k;
      }
      protocol.CMD_SHIFT = 4;
      protocol.CMD_MASK = 240;
      protocol.DUP_MASK = 8;
      protocol.QOS_MASK = 3;
      protocol.QOS_SHIFT = 1;
      protocol.RETAIN_MASK = 1;
      protocol.LENGTH_MASK = 127;
      protocol.LENGTH_FIN_MASK = 128;
      protocol.SESSIONPRESENT_MASK = 1;
      protocol.SESSIONPRESENT_HEADER = Buffer.from([protocol.SESSIONPRESENT_MASK]);
      protocol.CONNACK_HEADER = Buffer.from([protocol.codes["connack"] << protocol.CMD_SHIFT]);
      protocol.USERNAME_MASK = 128;
      protocol.PASSWORD_MASK = 64;
      protocol.WILL_RETAIN_MASK = 32;
      protocol.WILL_QOS_MASK = 24;
      protocol.WILL_QOS_SHIFT = 3;
      protocol.WILL_FLAG_MASK = 4;
      protocol.CLEAN_SESSION_MASK = 2;
      protocol.CONNECT_HEADER = Buffer.from([protocol.codes["connect"] << protocol.CMD_SHIFT]);
      protocol.properties = {
        sessionExpiryInterval: 17,
        willDelayInterval: 24,
        receiveMaximum: 33,
        maximumPacketSize: 39,
        topicAliasMaximum: 34,
        requestResponseInformation: 25,
        requestProblemInformation: 23,
        userProperties: 38,
        authenticationMethod: 21,
        authenticationData: 22,
        payloadFormatIndicator: 1,
        messageExpiryInterval: 2,
        contentType: 3,
        responseTopic: 8,
        correlationData: 9,
        maximumQoS: 36,
        retainAvailable: 37,
        assignedClientIdentifier: 18,
        reasonString: 31,
        wildcardSubscriptionAvailable: 40,
        subscriptionIdentifiersAvailable: 41,
        sharedSubscriptionAvailable: 42,
        serverKeepAlive: 19,
        responseInformation: 26,
        serverReference: 28,
        topicAlias: 35,
        subscriptionIdentifier: 11
      };
      protocol.propertiesCodes = {};
      for (var prop in protocol.properties) {
        var id = protocol.properties[prop];
        protocol.propertiesCodes[id] = prop;
      }
      protocol.propertiesTypes = {
        sessionExpiryInterval: "int32",
        willDelayInterval: "int32",
        receiveMaximum: "int16",
        maximumPacketSize: "int32",
        topicAliasMaximum: "int16",
        requestResponseInformation: "byte",
        requestProblemInformation: "byte",
        userProperties: "pair",
        authenticationMethod: "string",
        authenticationData: "binary",
        payloadFormatIndicator: "byte",
        messageExpiryInterval: "int32",
        contentType: "string",
        responseTopic: "string",
        correlationData: "binary",
        maximumQoS: "int8",
        retainAvailable: "byte",
        assignedClientIdentifier: "string",
        reasonString: "string",
        wildcardSubscriptionAvailable: "byte",
        subscriptionIdentifiersAvailable: "byte",
        sharedSubscriptionAvailable: "byte",
        serverKeepAlive: "int16",
        responseInformation: "string",
        serverReference: "string",
        topicAlias: "int16",
        subscriptionIdentifier: "var"
      };
      function genHeader(type) {
        return [0, 1, 2].map(function(qos) {
          return [0, 1].map(function(dup) {
            return [0, 1].map(function(retain) {
              var buf = Buffer.alloc(1);
              buf.writeUInt8(
                protocol.codes[type] << protocol.CMD_SHIFT | (dup ? protocol.DUP_MASK : 0) | qos << protocol.QOS_SHIFT | retain,
                0,
                true
              );
              return buf;
            });
          });
        });
      }
      protocol.PUBLISH_HEADER = genHeader("publish");
      protocol.SUBSCRIBE_HEADER = genHeader("subscribe");
      protocol.SUBSCRIBE_OPTIONS_QOS_MASK = 3;
      protocol.SUBSCRIBE_OPTIONS_NL_MASK = 1;
      protocol.SUBSCRIBE_OPTIONS_NL_SHIFT = 2;
      protocol.SUBSCRIBE_OPTIONS_RAP_MASK = 1;
      protocol.SUBSCRIBE_OPTIONS_RAP_SHIFT = 3;
      protocol.SUBSCRIBE_OPTIONS_RH_MASK = 3;
      protocol.SUBSCRIBE_OPTIONS_RH_SHIFT = 4;
      protocol.SUBSCRIBE_OPTIONS_RH = [0, 16, 32];
      protocol.SUBSCRIBE_OPTIONS_NL = 4;
      protocol.SUBSCRIBE_OPTIONS_RAP = 8;
      protocol.SUBSCRIBE_OPTIONS_QOS = [0, 1, 2];
      protocol.UNSUBSCRIBE_HEADER = genHeader("unsubscribe");
      protocol.ACKS = {
        unsuback: genHeader("unsuback"),
        puback: genHeader("puback"),
        pubcomp: genHeader("pubcomp"),
        pubrel: genHeader("pubrel"),
        pubrec: genHeader("pubrec")
      };
      protocol.SUBACK_HEADER = Buffer.from([protocol.codes["suback"] << protocol.CMD_SHIFT]);
      protocol.VERSION3 = Buffer.from([3]);
      protocol.VERSION4 = Buffer.from([4]);
      protocol.VERSION5 = Buffer.from([5]);
      protocol.QOS = [0, 1, 2].map(function(qos) {
        return Buffer.from([qos]);
      });
      protocol.EMPTY = {
        pingreq: Buffer.from([protocol.codes["pingreq"] << 4, 0]),
        pingresp: Buffer.from([protocol.codes["pingresp"] << 4, 0]),
        disconnect: Buffer.from([protocol.codes["disconnect"] << 4, 0])
      };
    }, { "safe-buffer": 117 }], 92: [function(require2, module3, exports3) {
      var Buffer = require2("safe-buffer").Buffer;
      var writeToStream = require2("./writeToStream");
      var EE = require2("events").EventEmitter;
      var inherits = require2("inherits");
      function generate(packet, opts) {
        var stream = new Accumulator();
        writeToStream(packet, stream, opts);
        return stream.concat();
      }
      function Accumulator() {
        this._array = new Array(20);
        this._i = 0;
      }
      inherits(Accumulator, EE);
      Accumulator.prototype.write = function(chunk) {
        this._array[this._i++] = chunk;
        return true;
      };
      Accumulator.prototype.concat = function() {
        var length = 0;
        var lengths = new Array(this._array.length);
        var list = this._array;
        var pos = 0;
        var i;
        var result;
        for (i = 0; i < list.length && list[i] !== void 0; i++) {
          if (typeof list[i] !== "string")
            lengths[i] = list[i].length;
          else
            lengths[i] = Buffer.byteLength(list[i]);
          length += lengths[i];
        }
        result = Buffer.allocUnsafe(length);
        for (i = 0; i < list.length && list[i] !== void 0; i++) {
          if (typeof list[i] !== "string") {
            list[i].copy(result, pos);
            pos += lengths[i];
          } else {
            result.write(list[i], pos);
            pos += lengths[i];
          }
        }
        return result;
      };
      module3.exports = generate;
    }, { "./writeToStream": 97, "events": 83, "inherits": 88, "safe-buffer": 117 }], 93: [function(require2, module3, exports3) {
      exports3.parser = require2("./parser");
      exports3.generate = require2("./generate");
      exports3.writeToStream = require2("./writeToStream");
    }, { "./generate": 92, "./parser": 96, "./writeToStream": 97 }], 94: [function(require2, module3, exports3) {
      var Buffer = require2("safe-buffer").Buffer;
      var max = 65536;
      var cache = {};
      function generateBuffer(i) {
        var buffer2 = Buffer.allocUnsafe(2);
        buffer2.writeUInt8(i >> 8, 0);
        buffer2.writeUInt8(i & 255, 0 + 1);
        return buffer2;
      }
      function generateCache() {
        for (var i = 0; i < max; i++) {
          cache[i] = generateBuffer(i);
        }
      }
      function calcVariableByteIntLength(length) {
        if (length >= 0 && length < 128)
          return 1;
        else if (length >= 128 && length < 16384)
          return 2;
        else if (length >= 16384 && length < 2097152)
          return 3;
        else if (length >= 2097152 && length < 268435456)
          return 4;
        else
          return 0;
      }
      function genBufVariableByteInt(num) {
        var digit = 0;
        var pos = 0;
        var length = calcVariableByteIntLength(num);
        var buffer2 = Buffer.allocUnsafe(length);
        do {
          digit = num % 128 | 0;
          num = num / 128 | 0;
          if (num > 0)
            digit = digit | 128;
          buffer2.writeUInt8(digit, pos++);
        } while (num > 0);
        return {
          data: buffer2,
          length
        };
      }
      function generate4ByteBuffer(num) {
        var buffer2 = Buffer.allocUnsafe(4);
        buffer2.writeUInt32BE(num, 0);
        return buffer2;
      }
      module3.exports = {
        cache,
        generateCache,
        generateNumber: generateBuffer,
        genBufVariableByteInt,
        generate4ByteBuffer
      };
    }, { "safe-buffer": 117 }], 95: [function(require2, module3, exports3) {
      function Packet() {
        this.cmd = null;
        this.retain = false;
        this.qos = 0;
        this.dup = false;
        this.length = -1;
        this.topic = null;
        this.payload = null;
      }
      module3.exports = Packet;
    }, {}], 96: [function(require2, module3, exports3) {
      var bl = require2("bl");
      var inherits = require2("inherits");
      var EE = require2("events").EventEmitter;
      var Packet = require2("./packet");
      var constants = require2("./constants");
      var debug = require2("debug")("mqtt-packet:parser");
      function Parser(opt) {
        if (!(this instanceof Parser))
          return new Parser(opt);
        this.settings = opt || {};
        this._states = [
          "_parseHeader",
          "_parseLength",
          "_parsePayload",
          "_newPacket"
        ];
        this._resetState();
      }
      inherits(Parser, EE);
      Parser.prototype._resetState = function() {
        debug("_resetState: resetting packet, error, _list, and _stateCounter");
        this.packet = new Packet();
        this.error = null;
        this._list = bl();
        this._stateCounter = 0;
      };
      Parser.prototype.parse = function(buf) {
        if (this.error)
          this._resetState();
        this._list.append(buf);
        debug("parse: current state: %s", this._states[this._stateCounter]);
        while ((this.packet.length !== -1 || this._list.length > 0) && this[this._states[this._stateCounter]]() && !this.error) {
          this._stateCounter++;
          debug("parse: state complete. _stateCounter is now: %d", this._stateCounter);
          debug("parse: packet.length: %d, buffer list length: %d", this.packet.length, this._list.length);
          if (this._stateCounter >= this._states.length)
            this._stateCounter = 0;
        }
        debug("parse: exited while loop. packet: %d, buffer list length: %d", this.packet.length, this._list.length);
        return this._list.length;
      };
      Parser.prototype._parseHeader = function() {
        var zero = this._list.readUInt8(0);
        this.packet.cmd = constants.types[zero >> constants.CMD_SHIFT];
        this.packet.retain = (zero & constants.RETAIN_MASK) !== 0;
        this.packet.qos = zero >> constants.QOS_SHIFT & constants.QOS_MASK;
        this.packet.dup = (zero & constants.DUP_MASK) !== 0;
        debug("_parseHeader: packet: %o", this.packet);
        this._list.consume(1);
        return true;
      };
      Parser.prototype._parseLength = function() {
        var result = this._parseVarByteNum(true);
        if (result) {
          this.packet.length = result.value;
          this._list.consume(result.bytes);
        }
        debug("_parseLength %d", result.value);
        return !!result;
      };
      Parser.prototype._parsePayload = function() {
        debug("_parsePayload: payload %O", this._list);
        var result = false;
        if (this.packet.length === 0 || this._list.length >= this.packet.length) {
          this._pos = 0;
          switch (this.packet.cmd) {
            case "connect":
              this._parseConnect();
              break;
            case "connack":
              this._parseConnack();
              break;
            case "publish":
              this._parsePublish();
              break;
            case "puback":
            case "pubrec":
            case "pubrel":
            case "pubcomp":
              this._parseConfirmation();
              break;
            case "subscribe":
              this._parseSubscribe();
              break;
            case "suback":
              this._parseSuback();
              break;
            case "unsubscribe":
              this._parseUnsubscribe();
              break;
            case "unsuback":
              this._parseUnsuback();
              break;
            case "pingreq":
            case "pingresp":
              break;
            case "disconnect":
              this._parseDisconnect();
              break;
            case "auth":
              this._parseAuth();
              break;
            default:
              this._emitError(new Error("Not supported"));
          }
          result = true;
        }
        debug("_parsePayload complete result: %s", result);
        return result;
      };
      Parser.prototype._parseConnect = function() {
        debug("_parseConnect");
        var protocolId;
        var clientId;
        var topic;
        var payload;
        var password;
        var username;
        var flags = {};
        var packet = this.packet;
        protocolId = this._parseString();
        if (protocolId === null)
          return this._emitError(new Error("Cannot parse protocolId"));
        if (protocolId !== "MQTT" && protocolId !== "MQIsdp") {
          return this._emitError(new Error("Invalid protocolId"));
        }
        packet.protocolId = protocolId;
        if (this._pos >= this._list.length)
          return this._emitError(new Error("Packet too short"));
        packet.protocolVersion = this._list.readUInt8(this._pos);
        if (packet.protocolVersion !== 3 && packet.protocolVersion !== 4 && packet.protocolVersion !== 5) {
          return this._emitError(new Error("Invalid protocol version"));
        }
        this._pos++;
        if (this._pos >= this._list.length) {
          return this._emitError(new Error("Packet too short"));
        }
        flags.username = this._list.readUInt8(this._pos) & constants.USERNAME_MASK;
        flags.password = this._list.readUInt8(this._pos) & constants.PASSWORD_MASK;
        flags.will = this._list.readUInt8(this._pos) & constants.WILL_FLAG_MASK;
        if (flags.will) {
          packet.will = {};
          packet.will.retain = (this._list.readUInt8(this._pos) & constants.WILL_RETAIN_MASK) !== 0;
          packet.will.qos = (this._list.readUInt8(this._pos) & constants.WILL_QOS_MASK) >> constants.WILL_QOS_SHIFT;
        }
        packet.clean = (this._list.readUInt8(this._pos) & constants.CLEAN_SESSION_MASK) !== 0;
        this._pos++;
        packet.keepalive = this._parseNum();
        if (packet.keepalive === -1)
          return this._emitError(new Error("Packet too short"));
        if (packet.protocolVersion === 5) {
          var properties = this._parseProperties();
          if (Object.getOwnPropertyNames(properties).length) {
            packet.properties = properties;
          }
        }
        clientId = this._parseString();
        if (clientId === null)
          return this._emitError(new Error("Packet too short"));
        packet.clientId = clientId;
        debug("_parseConnect: packet.clientId: %s", packet.clientId);
        if (flags.will) {
          if (packet.protocolVersion === 5) {
            var willProperties = this._parseProperties();
            if (Object.getOwnPropertyNames(willProperties).length) {
              packet.will.properties = willProperties;
            }
          }
          topic = this._parseString();
          if (topic === null)
            return this._emitError(new Error("Cannot parse will topic"));
          packet.will.topic = topic;
          debug("_parseConnect: packet.will.topic: %s", packet.will.topic);
          payload = this._parseBuffer();
          if (payload === null)
            return this._emitError(new Error("Cannot parse will payload"));
          packet.will.payload = payload;
          debug("_parseConnect: packet.will.paylaod: %s", packet.will.payload);
        }
        if (flags.username) {
          username = this._parseString();
          if (username === null)
            return this._emitError(new Error("Cannot parse username"));
          packet.username = username;
          debug("_parseConnect: packet.username: %s", packet.username);
        }
        if (flags.password) {
          password = this._parseBuffer();
          if (password === null)
            return this._emitError(new Error("Cannot parse password"));
          packet.password = password;
        }
        this.settings = packet;
        debug("_parseConnect: complete");
        return packet;
      };
      Parser.prototype._parseConnack = function() {
        debug("_parseConnack");
        var packet = this.packet;
        if (this._list.length < 2)
          return null;
        packet.sessionPresent = !!(this._list.readUInt8(this._pos++) & constants.SESSIONPRESENT_MASK);
        if (this.settings.protocolVersion === 5) {
          packet.reasonCode = this._list.readUInt8(this._pos++);
        } else {
          packet.returnCode = this._list.readUInt8(this._pos++);
        }
        if (packet.returnCode === -1 || packet.reasonCode === -1)
          return this._emitError(new Error("Cannot parse return code"));
        if (this.settings.protocolVersion === 5) {
          var properties = this._parseProperties();
          if (Object.getOwnPropertyNames(properties).length) {
            packet.properties = properties;
          }
        }
        debug("_parseConnack: complete");
      };
      Parser.prototype._parsePublish = function() {
        debug("_parsePublish");
        var packet = this.packet;
        packet.topic = this._parseString();
        if (packet.topic === null)
          return this._emitError(new Error("Cannot parse topic"));
        if (packet.qos > 0) {
          if (!this._parseMessageId()) {
            return;
          }
        }
        if (this.settings.protocolVersion === 5) {
          var properties = this._parseProperties();
          if (Object.getOwnPropertyNames(properties).length) {
            packet.properties = properties;
          }
        }
        packet.payload = this._list.slice(this._pos, packet.length);
        debug("_parsePublish: payload from buffer list: %o", packet.payload);
      };
      Parser.prototype._parseSubscribe = function() {
        debug("_parseSubscribe");
        var packet = this.packet;
        var topic;
        var options;
        var qos;
        var rh;
        var rap;
        var nl;
        var subscription;
        if (packet.qos !== 1) {
          return this._emitError(new Error("Wrong subscribe header"));
        }
        packet.subscriptions = [];
        if (!this._parseMessageId()) {
          return;
        }
        if (this.settings.protocolVersion === 5) {
          var properties = this._parseProperties();
          if (Object.getOwnPropertyNames(properties).length) {
            packet.properties = properties;
          }
        }
        while (this._pos < packet.length) {
          topic = this._parseString();
          if (topic === null)
            return this._emitError(new Error("Cannot parse topic"));
          if (this._pos >= packet.length)
            return this._emitError(new Error("Malformed Subscribe Payload"));
          options = this._parseByte();
          qos = options & constants.SUBSCRIBE_OPTIONS_QOS_MASK;
          nl = (options >> constants.SUBSCRIBE_OPTIONS_NL_SHIFT & constants.SUBSCRIBE_OPTIONS_NL_MASK) !== 0;
          rap = (options >> constants.SUBSCRIBE_OPTIONS_RAP_SHIFT & constants.SUBSCRIBE_OPTIONS_RAP_MASK) !== 0;
          rh = options >> constants.SUBSCRIBE_OPTIONS_RH_SHIFT & constants.SUBSCRIBE_OPTIONS_RH_MASK;
          subscription = { topic, qos };
          if (this.settings.protocolVersion === 5) {
            subscription.nl = nl;
            subscription.rap = rap;
            subscription.rh = rh;
          }
          debug("_parseSubscribe: push subscription `%s` to subscription", subscription);
          packet.subscriptions.push(subscription);
        }
      };
      Parser.prototype._parseSuback = function() {
        debug("_parseSuback");
        var packet = this.packet;
        this.packet.granted = [];
        if (!this._parseMessageId()) {
          return;
        }
        if (this.settings.protocolVersion === 5) {
          var properties = this._parseProperties();
          if (Object.getOwnPropertyNames(properties).length) {
            packet.properties = properties;
          }
        }
        while (this._pos < this.packet.length) {
          this.packet.granted.push(this._list.readUInt8(this._pos++));
        }
      };
      Parser.prototype._parseUnsubscribe = function() {
        debug("_parseUnsubscribe");
        var packet = this.packet;
        packet.unsubscriptions = [];
        if (!this._parseMessageId()) {
          return;
        }
        if (this.settings.protocolVersion === 5) {
          var properties = this._parseProperties();
          if (Object.getOwnPropertyNames(properties).length) {
            packet.properties = properties;
          }
        }
        while (this._pos < packet.length) {
          var topic;
          topic = this._parseString();
          if (topic === null)
            return this._emitError(new Error("Cannot parse topic"));
          debug("_parseUnsubscribe: push topic `%s` to unsubscriptions", topic);
          packet.unsubscriptions.push(topic);
        }
      };
      Parser.prototype._parseUnsuback = function() {
        debug("_parseUnsuback");
        var packet = this.packet;
        if (!this._parseMessageId())
          return this._emitError(new Error("Cannot parse messageId"));
        if (this.settings.protocolVersion === 5) {
          var properties = this._parseProperties();
          if (Object.getOwnPropertyNames(properties).length) {
            packet.properties = properties;
          }
          packet.granted = [];
          while (this._pos < this.packet.length) {
            this.packet.granted.push(this._list.readUInt8(this._pos++));
          }
        }
      };
      Parser.prototype._parseConfirmation = function() {
        debug("_parseConfirmation: packet.cmd: `%s`", this.packet.cmd);
        var packet = this.packet;
        this._parseMessageId();
        if (this.settings.protocolVersion === 5) {
          if (packet.length > 2) {
            packet.reasonCode = this._parseByte();
            debug("_parseConfirmation: packet.reasonCode `%d`", packet.reasonCode);
          }
          if (packet.length > 3) {
            var properties = this._parseProperties();
            if (Object.getOwnPropertyNames(properties).length) {
              packet.properties = properties;
            }
          }
        }
        return true;
      };
      Parser.prototype._parseDisconnect = function() {
        var packet = this.packet;
        debug("_parseDisconnect");
        if (this.settings.protocolVersion === 5) {
          packet.reasonCode = this._parseByte();
          var properties = this._parseProperties();
          if (Object.getOwnPropertyNames(properties).length) {
            packet.properties = properties;
          }
        }
        debug("_parseDisconnect result: true");
        return true;
      };
      Parser.prototype._parseAuth = function() {
        debug("_parseAuth");
        var packet = this.packet;
        if (this.settings.protocolVersion !== 5) {
          return this._emitError(new Error("Not supported auth packet for this version MQTT"));
        }
        packet.reasonCode = this._parseByte();
        var properties = this._parseProperties();
        if (Object.getOwnPropertyNames(properties).length) {
          packet.properties = properties;
        }
        debug("_parseAuth: result: true");
        return true;
      };
      Parser.prototype._parseMessageId = function() {
        var packet = this.packet;
        packet.messageId = this._parseNum();
        if (packet.messageId === null) {
          this._emitError(new Error("Cannot parse messageId"));
          return false;
        }
        debug("_parseMessageId: packet.messageId %d", packet.messageId);
        return true;
      };
      Parser.prototype._parseString = function(maybeBuffer) {
        var length = this._parseNum();
        var result;
        var end = length + this._pos;
        if (length === -1 || end > this._list.length || end > this.packet.length)
          return null;
        result = this._list.toString("utf8", this._pos, end);
        this._pos += length;
        debug("_parseString: result: %s", result);
        return result;
      };
      Parser.prototype._parseStringPair = function() {
        debug("_parseStringPair");
        return {
          name: this._parseString(),
          value: this._parseString()
        };
      };
      Parser.prototype._parseBuffer = function() {
        var length = this._parseNum();
        var result;
        var end = length + this._pos;
        if (length === -1 || end > this._list.length || end > this.packet.length)
          return null;
        result = this._list.slice(this._pos, end);
        this._pos += length;
        debug("_parseBuffer: result: %o", result);
        return result;
      };
      Parser.prototype._parseNum = function() {
        if (this._list.length - this._pos < 2)
          return -1;
        var result = this._list.readUInt16BE(this._pos);
        this._pos += 2;
        debug("_parseNum: result: %s", result);
        return result;
      };
      Parser.prototype._parse4ByteNum = function() {
        if (this._list.length - this._pos < 4)
          return -1;
        var result = this._list.readUInt32BE(this._pos);
        this._pos += 4;
        debug("_parse4ByteNum: result: %s", result);
        return result;
      };
      Parser.prototype._parseVarByteNum = function(fullInfoFlag) {
        debug("_parseVarByteNum");
        var bytes = 0;
        var mul = 1;
        var length = 0;
        var result = true;
        var current;
        var padding = this._pos ? this._pos : 0;
        while (bytes < 5) {
          current = this._list.readUInt8(padding + bytes++);
          length += mul * (current & constants.LENGTH_MASK);
          mul *= 128;
          if ((current & constants.LENGTH_FIN_MASK) === 0)
            break;
          if (this._list.length <= bytes) {
            result = false;
            break;
          }
        }
        if (padding) {
          this._pos += bytes;
        }
        result = result ? fullInfoFlag ? {
          bytes,
          value: length
        } : length : false;
        debug("_parseVarByteNum: result: %o", result);
        return result;
      };
      Parser.prototype._parseByte = function() {
        var result = this._list.readUInt8(this._pos);
        this._pos++;
        debug("_parseByte: result: %o", result);
        return result;
      };
      Parser.prototype._parseByType = function(type) {
        debug("_parseByType: type: %s", type);
        switch (type) {
          case "byte": {
            return this._parseByte() !== 0;
          }
          case "int8": {
            return this._parseByte();
          }
          case "int16": {
            return this._parseNum();
          }
          case "int32": {
            return this._parse4ByteNum();
          }
          case "var": {
            return this._parseVarByteNum();
          }
          case "string": {
            return this._parseString();
          }
          case "pair": {
            return this._parseStringPair();
          }
          case "binary": {
            return this._parseBuffer();
          }
        }
      };
      Parser.prototype._parseProperties = function() {
        debug("_parseProperties");
        var length = this._parseVarByteNum();
        var start = this._pos;
        var end = start + length;
        var result = {};
        while (this._pos < end) {
          var type = this._parseByte();
          var name = constants.propertiesCodes[type];
          if (!name) {
            this._emitError(new Error("Unknown property"));
            return false;
          }
          if (name === "userProperties") {
            if (!result[name]) {
              result[name] = {};
            }
            var currentUserProperty = this._parseByType(constants.propertiesTypes[name]);
            if (result[name][currentUserProperty.name]) {
              if (Array.isArray(result[name][currentUserProperty.name])) {
                result[name][currentUserProperty.name].push(currentUserProperty.value);
              } else {
                var currentValue = result[name][currentUserProperty.name];
                result[name][currentUserProperty.name] = [currentValue];
                result[name][currentUserProperty.name].push(currentUserProperty.value);
              }
            } else {
              result[name][currentUserProperty.name] = currentUserProperty.value;
            }
            continue;
          }
          if (result[name]) {
            if (Array.isArray(result[name])) {
              result[name].push(this._parseByType(constants.propertiesTypes[name]));
            } else {
              result[name] = [result[name]];
              result[name].push(this._parseByType(constants.propertiesTypes[name]));
            }
          } else {
            result[name] = this._parseByType(constants.propertiesTypes[name]);
          }
        }
        return result;
      };
      Parser.prototype._newPacket = function() {
        debug("_newPacket");
        if (this.packet) {
          this._list.consume(this.packet.length);
          debug("_newPacket: parser emit packet: packet.cmd: %s, packet.payload: %s, packet.length: %d", this.packet.cmd, this.packet.payload, this.packet.length);
          this.emit("packet", this.packet);
        }
        debug("_newPacket: new packet");
        this.packet = new Packet();
        this._pos = 0;
        return true;
      };
      Parser.prototype._emitError = function(err) {
        debug("_emitError");
        this.error = err;
        this.emit("error", err);
      };
      module3.exports = Parser;
    }, { "./constants": 91, "./packet": 95, "bl": 11, "debug": 17, "events": 83, "inherits": 88 }], 97: [function(require2, module3, exports3) {
      var protocol = require2("./constants");
      var Buffer = require2("safe-buffer").Buffer;
      var empty = Buffer.allocUnsafe(0);
      var zeroBuf = Buffer.from([0]);
      var numbers = require2("./numbers");
      var nextTick2 = require2("process-nextick-args").nextTick;
      var debug = require2("debug")("mqtt-packet:writeToStream");
      var numCache = numbers.cache;
      var generateNumber = numbers.generateNumber;
      var generateCache = numbers.generateCache;
      var genBufVariableByteInt = numbers.genBufVariableByteInt;
      var generate4ByteBuffer = numbers.generate4ByteBuffer;
      var writeNumber = writeNumberCached;
      var toGenerate = true;
      function generate(packet, stream, opts) {
        debug("generate called");
        if (stream.cork) {
          stream.cork();
          nextTick2(uncork, stream);
        }
        if (toGenerate) {
          toGenerate = false;
          generateCache();
        }
        debug("generate: packet.cmd: %s", packet.cmd);
        switch (packet.cmd) {
          case "connect":
            return connect(packet, stream);
          case "connack":
            return connack(packet, stream, opts);
          case "publish":
            return publish(packet, stream, opts);
          case "puback":
          case "pubrec":
          case "pubrel":
          case "pubcomp":
            return confirmation(packet, stream, opts);
          case "subscribe":
            return subscribe(packet, stream, opts);
          case "suback":
            return suback(packet, stream, opts);
          case "unsubscribe":
            return unsubscribe(packet, stream, opts);
          case "unsuback":
            return unsuback(packet, stream, opts);
          case "pingreq":
          case "pingresp":
            return emptyPacket(packet, stream);
          case "disconnect":
            return disconnect(packet, stream, opts);
          case "auth":
            return auth(packet, stream, opts);
          default:
            stream.emit("error", new Error("Unknown command"));
            return false;
        }
      }
      Object.defineProperty(generate, "cacheNumbers", {
        get: function() {
          return writeNumber === writeNumberCached;
        },
        set: function(value) {
          if (value) {
            if (!numCache || Object.keys(numCache).length === 0)
              toGenerate = true;
            writeNumber = writeNumberCached;
          } else {
            toGenerate = false;
            writeNumber = writeNumberGenerated;
          }
        }
      });
      function uncork(stream) {
        stream.uncork();
      }
      function connect(packet, stream, opts) {
        var settings = packet || {};
        var protocolId = settings.protocolId || "MQTT";
        var protocolVersion = settings.protocolVersion || 4;
        var will = settings.will;
        var clean = settings.clean;
        var keepalive = settings.keepalive || 0;
        var clientId = settings.clientId || "";
        var username = settings.username;
        var password = settings.password;
        var properties = settings.properties;
        if (clean === void 0)
          clean = true;
        var length = 0;
        if (!protocolId || typeof protocolId !== "string" && !Buffer.isBuffer(protocolId)) {
          stream.emit("error", new Error("Invalid protocolId"));
          return false;
        } else
          length += protocolId.length + 2;
        if (protocolVersion !== 3 && protocolVersion !== 4 && protocolVersion !== 5) {
          stream.emit("error", new Error("Invalid protocol version"));
          return false;
        } else
          length += 1;
        if ((typeof clientId === "string" || Buffer.isBuffer(clientId)) && (clientId || protocolVersion === 4) && (clientId || clean)) {
          length += clientId.length + 2;
        } else {
          if (protocolVersion < 4) {
            stream.emit("error", new Error("clientId must be supplied before 3.1.1"));
            return false;
          }
          if (clean * 1 === 0) {
            stream.emit("error", new Error("clientId must be given if cleanSession set to 0"));
            return false;
          }
        }
        if (typeof keepalive !== "number" || keepalive < 0 || keepalive > 65535 || keepalive % 1 !== 0) {
          stream.emit("error", new Error("Invalid keepalive"));
          return false;
        } else
          length += 2;
        length += 1;
        if (protocolVersion === 5) {
          var propertiesData = getProperties(stream, properties);
          if (!propertiesData) {
            return false;
          }
          length += propertiesData.length;
        }
        if (will) {
          if (typeof will !== "object") {
            stream.emit("error", new Error("Invalid will"));
            return false;
          }
          if (!will.topic || typeof will.topic !== "string") {
            stream.emit("error", new Error("Invalid will topic"));
            return false;
          } else {
            length += Buffer.byteLength(will.topic) + 2;
          }
          length += 2;
          if (will.payload) {
            if (will.payload.length >= 0) {
              if (typeof will.payload === "string") {
                length += Buffer.byteLength(will.payload);
              } else {
                length += will.payload.length;
              }
            } else {
              stream.emit("error", new Error("Invalid will payload"));
              return false;
            }
          }
          var willProperties = {};
          if (protocolVersion === 5) {
            willProperties = getProperties(stream, will.properties);
            if (!willProperties) {
              return false;
            }
            length += willProperties.length;
          }
        }
        var providedUsername = false;
        if (username != null) {
          if (isStringOrBuffer(username)) {
            providedUsername = true;
            length += Buffer.byteLength(username) + 2;
          } else {
            stream.emit("error", new Error("Invalid username"));
            return false;
          }
        }
        if (password != null) {
          if (!providedUsername) {
            stream.emit("error", new Error("Username is required to use password"));
            return false;
          }
          if (isStringOrBuffer(password)) {
            length += byteLength(password) + 2;
          } else {
            stream.emit("error", new Error("Invalid password"));
            return false;
          }
        }
        stream.write(protocol.CONNECT_HEADER);
        writeVarByteInt(stream, length);
        writeStringOrBuffer(stream, protocolId);
        stream.write(
          protocolVersion === 4 ? protocol.VERSION4 : protocolVersion === 5 ? protocol.VERSION5 : protocol.VERSION3
        );
        var flags = 0;
        flags |= username != null ? protocol.USERNAME_MASK : 0;
        flags |= password != null ? protocol.PASSWORD_MASK : 0;
        flags |= will && will.retain ? protocol.WILL_RETAIN_MASK : 0;
        flags |= will && will.qos ? will.qos << protocol.WILL_QOS_SHIFT : 0;
        flags |= will ? protocol.WILL_FLAG_MASK : 0;
        flags |= clean ? protocol.CLEAN_SESSION_MASK : 0;
        stream.write(Buffer.from([flags]));
        writeNumber(stream, keepalive);
        if (protocolVersion === 5) {
          propertiesData.write();
        }
        writeStringOrBuffer(stream, clientId);
        if (will) {
          if (protocolVersion === 5) {
            willProperties.write();
          }
          writeString(stream, will.topic);
          writeStringOrBuffer(stream, will.payload);
        }
        if (username != null) {
          writeStringOrBuffer(stream, username);
        }
        if (password != null) {
          writeStringOrBuffer(stream, password);
        }
        return true;
      }
      function connack(packet, stream, opts) {
        var version2 = opts ? opts.protocolVersion : 4;
        var settings = packet || {};
        var rc = version2 === 5 ? settings.reasonCode : settings.returnCode;
        var properties = settings.properties;
        var length = 2;
        if (typeof rc !== "number") {
          stream.emit("error", new Error("Invalid return code"));
          return false;
        }
        var propertiesData = null;
        if (version2 === 5) {
          propertiesData = getProperties(stream, properties);
          if (!propertiesData) {
            return false;
          }
          length += propertiesData.length;
        }
        stream.write(protocol.CONNACK_HEADER);
        writeVarByteInt(stream, length);
        stream.write(settings.sessionPresent ? protocol.SESSIONPRESENT_HEADER : zeroBuf);
        stream.write(Buffer.from([rc]));
        if (propertiesData != null) {
          propertiesData.write();
        }
        return true;
      }
      function publish(packet, stream, opts) {
        debug("publish: packet: %o", packet);
        var version2 = opts ? opts.protocolVersion : 4;
        var settings = packet || {};
        var qos = settings.qos || 0;
        var retain = settings.retain ? protocol.RETAIN_MASK : 0;
        var topic = settings.topic;
        var payload = settings.payload || empty;
        var id = settings.messageId;
        var properties = settings.properties;
        var length = 0;
        if (typeof topic === "string")
          length += Buffer.byteLength(topic) + 2;
        else if (Buffer.isBuffer(topic))
          length += topic.length + 2;
        else {
          stream.emit("error", new Error("Invalid topic"));
          return false;
        }
        if (!Buffer.isBuffer(payload))
          length += Buffer.byteLength(payload);
        else
          length += payload.length;
        if (qos && typeof id !== "number") {
          stream.emit("error", new Error("Invalid messageId"));
          return false;
        } else if (qos)
          length += 2;
        var propertiesData = null;
        if (version2 === 5) {
          propertiesData = getProperties(stream, properties);
          if (!propertiesData) {
            return false;
          }
          length += propertiesData.length;
        }
        stream.write(protocol.PUBLISH_HEADER[qos][settings.dup ? 1 : 0][retain ? 1 : 0]);
        writeVarByteInt(stream, length);
        writeNumber(stream, byteLength(topic));
        stream.write(topic);
        if (qos > 0)
          writeNumber(stream, id);
        if (propertiesData != null) {
          propertiesData.write();
        }
        debug("publish: payload: %o", payload);
        return stream.write(payload);
      }
      function confirmation(packet, stream, opts) {
        var version2 = opts ? opts.protocolVersion : 4;
        var settings = packet || {};
        var type = settings.cmd || "puback";
        var id = settings.messageId;
        var dup = settings.dup && type === "pubrel" ? protocol.DUP_MASK : 0;
        var qos = 0;
        var reasonCode = settings.reasonCode;
        var properties = settings.properties;
        var length = version2 === 5 ? 3 : 2;
        if (type === "pubrel")
          qos = 1;
        if (typeof id !== "number") {
          stream.emit("error", new Error("Invalid messageId"));
          return false;
        }
        var propertiesData = null;
        if (version2 === 5) {
          if (typeof properties === "object") {
            propertiesData = getPropertiesByMaximumPacketSize(stream, properties, opts, length);
            if (!propertiesData) {
              return false;
            }
            length += propertiesData.length;
          }
        }
        stream.write(protocol.ACKS[type][qos][dup][0]);
        writeVarByteInt(stream, length);
        writeNumber(stream, id);
        if (version2 === 5) {
          stream.write(Buffer.from([reasonCode]));
        }
        if (propertiesData !== null) {
          propertiesData.write();
        }
        return true;
      }
      function subscribe(packet, stream, opts) {
        debug("subscribe: packet: ");
        var version2 = opts ? opts.protocolVersion : 4;
        var settings = packet || {};
        var dup = settings.dup ? protocol.DUP_MASK : 0;
        var id = settings.messageId;
        var subs = settings.subscriptions;
        var properties = settings.properties;
        var length = 0;
        if (typeof id !== "number") {
          stream.emit("error", new Error("Invalid messageId"));
          return false;
        } else
          length += 2;
        var propertiesData = null;
        if (version2 === 5) {
          propertiesData = getProperties(stream, properties);
          if (!propertiesData) {
            return false;
          }
          length += propertiesData.length;
        }
        if (typeof subs === "object" && subs.length) {
          for (var i = 0; i < subs.length; i += 1) {
            var itopic = subs[i].topic;
            var iqos = subs[i].qos;
            if (typeof itopic !== "string") {
              stream.emit("error", new Error("Invalid subscriptions - invalid topic"));
              return false;
            }
            if (typeof iqos !== "number") {
              stream.emit("error", new Error("Invalid subscriptions - invalid qos"));
              return false;
            }
            if (version2 === 5) {
              var nl = subs[i].nl || false;
              if (typeof nl !== "boolean") {
                stream.emit("error", new Error("Invalid subscriptions - invalid No Local"));
                return false;
              }
              var rap = subs[i].rap || false;
              if (typeof rap !== "boolean") {
                stream.emit("error", new Error("Invalid subscriptions - invalid Retain as Published"));
                return false;
              }
              var rh = subs[i].rh || 0;
              if (typeof rh !== "number" || rh > 2) {
                stream.emit("error", new Error("Invalid subscriptions - invalid Retain Handling"));
                return false;
              }
            }
            length += Buffer.byteLength(itopic) + 2 + 1;
          }
        } else {
          stream.emit("error", new Error("Invalid subscriptions"));
          return false;
        }
        debug("subscribe: writing to stream: %o", protocol.SUBSCRIBE_HEADER);
        stream.write(protocol.SUBSCRIBE_HEADER[1][dup ? 1 : 0][0]);
        writeVarByteInt(stream, length);
        writeNumber(stream, id);
        if (propertiesData !== null) {
          propertiesData.write();
        }
        var result = true;
        for (var j = 0; j < subs.length; j++) {
          var sub = subs[j];
          var jtopic = sub.topic;
          var jqos = sub.qos;
          var jnl = +sub.nl;
          var jrap = +sub.rap;
          var jrh = sub.rh;
          var joptions;
          writeString(stream, jtopic);
          joptions = protocol.SUBSCRIBE_OPTIONS_QOS[jqos];
          if (version2 === 5) {
            joptions |= jnl ? protocol.SUBSCRIBE_OPTIONS_NL : 0;
            joptions |= jrap ? protocol.SUBSCRIBE_OPTIONS_RAP : 0;
            joptions |= jrh ? protocol.SUBSCRIBE_OPTIONS_RH[jrh] : 0;
          }
          result = stream.write(Buffer.from([joptions]));
        }
        return result;
      }
      function suback(packet, stream, opts) {
        var version2 = opts ? opts.protocolVersion : 4;
        var settings = packet || {};
        var id = settings.messageId;
        var granted = settings.granted;
        var properties = settings.properties;
        var length = 0;
        if (typeof id !== "number") {
          stream.emit("error", new Error("Invalid messageId"));
          return false;
        } else
          length += 2;
        if (typeof granted === "object" && granted.length) {
          for (var i = 0; i < granted.length; i += 1) {
            if (typeof granted[i] !== "number") {
              stream.emit("error", new Error("Invalid qos vector"));
              return false;
            }
            length += 1;
          }
        } else {
          stream.emit("error", new Error("Invalid qos vector"));
          return false;
        }
        var propertiesData = null;
        if (version2 === 5) {
          propertiesData = getPropertiesByMaximumPacketSize(stream, properties, opts, length);
          if (!propertiesData) {
            return false;
          }
          length += propertiesData.length;
        }
        stream.write(protocol.SUBACK_HEADER);
        writeVarByteInt(stream, length);
        writeNumber(stream, id);
        if (propertiesData !== null) {
          propertiesData.write();
        }
        return stream.write(Buffer.from(granted));
      }
      function unsubscribe(packet, stream, opts) {
        var version2 = opts ? opts.protocolVersion : 4;
        var settings = packet || {};
        var id = settings.messageId;
        var dup = settings.dup ? protocol.DUP_MASK : 0;
        var unsubs = settings.unsubscriptions;
        var properties = settings.properties;
        var length = 0;
        if (typeof id !== "number") {
          stream.emit("error", new Error("Invalid messageId"));
          return false;
        } else {
          length += 2;
        }
        if (typeof unsubs === "object" && unsubs.length) {
          for (var i = 0; i < unsubs.length; i += 1) {
            if (typeof unsubs[i] !== "string") {
              stream.emit("error", new Error("Invalid unsubscriptions"));
              return false;
            }
            length += Buffer.byteLength(unsubs[i]) + 2;
          }
        } else {
          stream.emit("error", new Error("Invalid unsubscriptions"));
          return false;
        }
        var propertiesData = null;
        if (version2 === 5) {
          propertiesData = getProperties(stream, properties);
          if (!propertiesData) {
            return false;
          }
          length += propertiesData.length;
        }
        stream.write(protocol.UNSUBSCRIBE_HEADER[1][dup ? 1 : 0][0]);
        writeVarByteInt(stream, length);
        writeNumber(stream, id);
        if (propertiesData !== null) {
          propertiesData.write();
        }
        var result = true;
        for (var j = 0; j < unsubs.length; j++) {
          result = writeString(stream, unsubs[j]);
        }
        return result;
      }
      function unsuback(packet, stream, opts) {
        var version2 = opts ? opts.protocolVersion : 4;
        var settings = packet || {};
        var id = settings.messageId;
        var dup = settings.dup ? protocol.DUP_MASK : 0;
        var granted = settings.granted;
        var properties = settings.properties;
        var type = settings.cmd;
        var qos = 0;
        var length = 2;
        if (typeof id !== "number") {
          stream.emit("error", new Error("Invalid messageId"));
          return false;
        }
        if (version2 === 5) {
          if (typeof granted === "object" && granted.length) {
            for (var i = 0; i < granted.length; i += 1) {
              if (typeof granted[i] !== "number") {
                stream.emit("error", new Error("Invalid qos vector"));
                return false;
              }
              length += 1;
            }
          } else {
            stream.emit("error", new Error("Invalid qos vector"));
            return false;
          }
        }
        var propertiesData = null;
        if (version2 === 5) {
          propertiesData = getPropertiesByMaximumPacketSize(stream, properties, opts, length);
          if (!propertiesData) {
            return false;
          }
          length += propertiesData.length;
        }
        stream.write(protocol.ACKS[type][qos][dup][0]);
        writeVarByteInt(stream, length);
        writeNumber(stream, id);
        if (propertiesData !== null) {
          propertiesData.write();
        }
        if (version2 === 5) {
          stream.write(Buffer.from(granted));
        }
        return true;
      }
      function emptyPacket(packet, stream, opts) {
        return stream.write(protocol.EMPTY[packet.cmd]);
      }
      function disconnect(packet, stream, opts) {
        var version2 = opts ? opts.protocolVersion : 4;
        var settings = packet || {};
        var reasonCode = settings.reasonCode;
        var properties = settings.properties;
        var length = version2 === 5 ? 1 : 0;
        var propertiesData = null;
        if (version2 === 5) {
          propertiesData = getPropertiesByMaximumPacketSize(stream, properties, opts, length);
          if (!propertiesData) {
            return false;
          }
          length += propertiesData.length;
        }
        stream.write(Buffer.from([protocol.codes["disconnect"] << 4]));
        writeVarByteInt(stream, length);
        if (version2 === 5) {
          stream.write(Buffer.from([reasonCode]));
        }
        if (propertiesData !== null) {
          propertiesData.write();
        }
        return true;
      }
      function auth(packet, stream, opts) {
        var version2 = opts ? opts.protocolVersion : 4;
        var settings = packet || {};
        var reasonCode = settings.reasonCode;
        var properties = settings.properties;
        var length = version2 === 5 ? 1 : 0;
        if (version2 !== 5)
          stream.emit("error", new Error("Invalid mqtt version for auth packet"));
        var propertiesData = getPropertiesByMaximumPacketSize(stream, properties, opts, length);
        if (!propertiesData) {
          return false;
        }
        length += propertiesData.length;
        stream.write(Buffer.from([protocol.codes["auth"] << 4]));
        writeVarByteInt(stream, length);
        stream.write(Buffer.from([reasonCode]));
        if (propertiesData !== null) {
          propertiesData.write();
        }
        return true;
      }
      var varByteIntCache = {};
      function writeVarByteInt(stream, num) {
        var buffer2 = varByteIntCache[num];
        if (!buffer2) {
          buffer2 = genBufVariableByteInt(num).data;
          if (num < 16384)
            varByteIntCache[num] = buffer2;
        }
        debug("writeVarByteInt: writing to stream: %o", buffer2);
        stream.write(buffer2);
      }
      function writeString(stream, string) {
        var strlen = Buffer.byteLength(string);
        writeNumber(stream, strlen);
        debug("writeString: %s", string);
        return stream.write(string, "utf8");
      }
      function writeStringPair(stream, name, value) {
        writeString(stream, name);
        writeString(stream, value);
      }
      function writeNumberCached(stream, number) {
        debug("writeNumberCached: number: %d", number);
        debug("writeNumberCached: %o", numCache[number]);
        return stream.write(numCache[number]);
      }
      function writeNumberGenerated(stream, number) {
        var generatedNumber = generateNumber(number);
        debug("writeNumberGenerated: %o", generatedNumber);
        return stream.write(generatedNumber);
      }
      function write4ByteNumber(stream, number) {
        var generated4ByteBuffer = generate4ByteBuffer(number);
        debug("write4ByteNumber: %o", generated4ByteBuffer);
        return stream.write(generated4ByteBuffer);
      }
      function writeStringOrBuffer(stream, toWrite) {
        if (typeof toWrite === "string") {
          writeString(stream, toWrite);
        } else if (toWrite) {
          writeNumber(stream, toWrite.length);
          stream.write(toWrite);
        } else
          writeNumber(stream, 0);
      }
      function getProperties(stream, properties) {
        if (typeof properties !== "object" || properties.length != null) {
          return {
            length: 1,
            write: function() {
              writeProperties(stream, {}, 0);
            }
          };
        }
        var propertiesLength = 0;
        function getLengthProperty(name, value) {
          var type = protocol.propertiesTypes[name];
          var length = 0;
          switch (type) {
            case "byte": {
              if (typeof value !== "boolean") {
                stream.emit("error", new Error("Invalid " + name + ": " + value));
                return false;
              }
              length += 1 + 1;
              break;
            }
            case "int8": {
              if (typeof value !== "number" || value < 0 || value > 255) {
                stream.emit("error", new Error("Invalid " + name + ": " + value));
                return false;
              }
              length += 1 + 1;
              break;
            }
            case "binary": {
              if (value && value === null) {
                stream.emit("error", new Error("Invalid " + name + ": " + value));
                return false;
              }
              length += 1 + Buffer.byteLength(value) + 2;
              break;
            }
            case "int16": {
              if (typeof value !== "number" || value < 0 || value > 65535) {
                stream.emit("error", new Error("Invalid " + name + ": " + value));
                return false;
              }
              length += 1 + 2;
              break;
            }
            case "int32": {
              if (typeof value !== "number" || value < 0 || value > 4294967295) {
                stream.emit("error", new Error("Invalid " + name + ": " + value));
                return false;
              }
              length += 1 + 4;
              break;
            }
            case "var": {
              if (typeof value !== "number" || value < 0 || value > 4294967295) {
                stream.emit("error", new Error("Invalid " + name + ": " + value));
                return false;
              }
              length += 1 + genBufVariableByteInt(value).length;
              break;
            }
            case "string": {
              if (typeof value !== "string") {
                stream.emit("error", new Error("Invalid " + name + ": " + value));
                return false;
              }
              length += 1 + 2 + Buffer.byteLength(value.toString());
              break;
            }
            case "pair": {
              if (typeof value !== "object") {
                stream.emit("error", new Error("Invalid " + name + ": " + value));
                return false;
              }
              length += Object.getOwnPropertyNames(value).reduce(function(result, name2) {
                var currentValue = value[name2];
                if (Array.isArray(currentValue)) {
                  result += currentValue.reduce(function(currentLength, value2) {
                    currentLength += 1 + 2 + Buffer.byteLength(name2.toString()) + 2 + Buffer.byteLength(value2.toString());
                    return currentLength;
                  }, 0);
                } else {
                  result += 1 + 2 + Buffer.byteLength(name2.toString()) + 2 + Buffer.byteLength(value[name2].toString());
                }
                return result;
              }, 0);
              break;
            }
            default: {
              stream.emit("error", new Error("Invalid property " + name + ": " + value));
              return false;
            }
          }
          return length;
        }
        if (properties) {
          for (var propName in properties) {
            var propLength = 0;
            var propValueLength = 0;
            var propValue = properties[propName];
            if (Array.isArray(propValue)) {
              for (var valueIndex = 0; valueIndex < propValue.length; valueIndex++) {
                propValueLength = getLengthProperty(propName, propValue[valueIndex]);
                if (!propValueLength) {
                  return false;
                }
                propLength += propValueLength;
              }
            } else {
              propValueLength = getLengthProperty(propName, propValue);
              if (!propValueLength) {
                return false;
              }
              propLength = propValueLength;
            }
            if (!propLength)
              return false;
            propertiesLength += propLength;
          }
        }
        var propertiesLengthLength = genBufVariableByteInt(propertiesLength).length;
        return {
          length: propertiesLengthLength + propertiesLength,
          write: function() {
            writeProperties(stream, properties, propertiesLength);
          }
        };
      }
      function getPropertiesByMaximumPacketSize(stream, properties, opts, length) {
        var mayEmptyProps = ["reasonString", "userProperties"];
        var maximumPacketSize = opts && opts.properties && opts.properties.maximumPacketSize ? opts.properties.maximumPacketSize : 0;
        var propertiesData = getProperties(stream, properties);
        if (maximumPacketSize) {
          while (length + propertiesData.length > maximumPacketSize) {
            var currentMayEmptyProp = mayEmptyProps.shift();
            if (currentMayEmptyProp && properties[currentMayEmptyProp]) {
              delete properties[currentMayEmptyProp];
              propertiesData = getProperties(stream, properties);
            } else {
              return false;
            }
          }
        }
        return propertiesData;
      }
      function writeProperty(stream, propName, value) {
        var type = protocol.propertiesTypes[propName];
        switch (type) {
          case "byte": {
            stream.write(Buffer.from([protocol.properties[propName]]));
            stream.write(Buffer.from([+value]));
            break;
          }
          case "int8": {
            stream.write(Buffer.from([protocol.properties[propName]]));
            stream.write(Buffer.from([value]));
            break;
          }
          case "binary": {
            stream.write(Buffer.from([protocol.properties[propName]]));
            writeStringOrBuffer(stream, value);
            break;
          }
          case "int16": {
            stream.write(Buffer.from([protocol.properties[propName]]));
            writeNumber(stream, value);
            break;
          }
          case "int32": {
            stream.write(Buffer.from([protocol.properties[propName]]));
            write4ByteNumber(stream, value);
            break;
          }
          case "var": {
            stream.write(Buffer.from([protocol.properties[propName]]));
            writeVarByteInt(stream, value);
            break;
          }
          case "string": {
            stream.write(Buffer.from([protocol.properties[propName]]));
            writeString(stream, value);
            break;
          }
          case "pair": {
            Object.getOwnPropertyNames(value).forEach(function(name) {
              var currentValue = value[name];
              if (Array.isArray(currentValue)) {
                currentValue.forEach(function(value2) {
                  stream.write(Buffer.from([protocol.properties[propName]]));
                  writeStringPair(stream, name.toString(), value2.toString());
                });
              } else {
                stream.write(Buffer.from([protocol.properties[propName]]));
                writeStringPair(stream, name.toString(), currentValue.toString());
              }
            });
            break;
          }
          default: {
            stream.emit("error", new Error("Invalid property " + propName + " value: " + value));
            return false;
          }
        }
      }
      function writeProperties(stream, properties, propertiesLength) {
        writeVarByteInt(stream, propertiesLength);
        for (var propName in properties) {
          if (properties.hasOwnProperty(propName) && properties[propName] !== null) {
            var value = properties[propName];
            if (Array.isArray(value)) {
              for (var valueIndex = 0; valueIndex < value.length; valueIndex++) {
                writeProperty(stream, propName, value[valueIndex]);
              }
            } else {
              writeProperty(stream, propName, value);
            }
          }
        }
      }
      function byteLength(bufOrString) {
        if (!bufOrString)
          return 0;
        else if (bufOrString instanceof Buffer)
          return bufOrString.length;
        else
          return Buffer.byteLength(bufOrString);
      }
      function isStringOrBuffer(field) {
        return typeof field === "string" || field instanceof Buffer;
      }
      module3.exports = generate;
    }, { "./constants": 91, "./numbers": 94, "debug": 17, "process-nextick-args": 100, "safe-buffer": 117 }], 98: [function(require2, module3, exports3) {
      var s2 = 1e3;
      var m = s2 * 60;
      var h = m * 60;
      var d = h * 24;
      var w = d * 7;
      var y = d * 365.25;
      module3.exports = function(val, options) {
        options = options || {};
        var type = typeof val;
        if (type === "string" && val.length > 0) {
          return parse2(val);
        } else if (type === "number" && isFinite(val)) {
          return options.long ? fmtLong(val) : fmtShort(val);
        }
        throw new Error(
          "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
        );
      };
      function parse2(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          str
        );
        if (!match) {
          return;
        }
        var n2 = parseFloat(match[1]);
        var type = (match[2] || "ms").toLowerCase();
        switch (type) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return n2 * y;
          case "weeks":
          case "week":
          case "w":
            return n2 * w;
          case "days":
          case "day":
          case "d":
            return n2 * d;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return n2 * h;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return n2 * m;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return n2 * s2;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return n2;
          default:
            return void 0;
        }
      }
      function fmtShort(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return Math.round(ms / d) + "d";
        }
        if (msAbs >= h) {
          return Math.round(ms / h) + "h";
        }
        if (msAbs >= m) {
          return Math.round(ms / m) + "m";
        }
        if (msAbs >= s2) {
          return Math.round(ms / s2) + "s";
        }
        return ms + "ms";
      }
      function fmtLong(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return plural(ms, msAbs, d, "day");
        }
        if (msAbs >= h) {
          return plural(ms, msAbs, h, "hour");
        }
        if (msAbs >= m) {
          return plural(ms, msAbs, m, "minute");
        }
        if (msAbs >= s2) {
          return plural(ms, msAbs, s2, "second");
        }
        return ms + " ms";
      }
      function plural(ms, msAbs, n2, name) {
        var isPlural = msAbs >= n2 * 1.5;
        return Math.round(ms / n2) + " " + name + (isPlural ? "s" : "");
      }
    }, {}], 99: [function(require2, module3, exports3) {
      var wrappy = require2("wrappy");
      module3.exports = wrappy(once2);
      module3.exports.strict = wrappy(onceStrict);
      once2.proto = once2(function() {
        Object.defineProperty(Function.prototype, "once", {
          value: function() {
            return once2(this);
          },
          configurable: true
        });
        Object.defineProperty(Function.prototype, "onceStrict", {
          value: function() {
            return onceStrict(this);
          },
          configurable: true
        });
      });
      function once2(fn) {
        var f2 = function() {
          if (f2.called)
            return f2.value;
          f2.called = true;
          return f2.value = fn.apply(this, arguments);
        };
        f2.called = false;
        return f2;
      }
      function onceStrict(fn) {
        var f2 = function() {
          if (f2.called)
            throw new Error(f2.onceError);
          f2.called = true;
          return f2.value = fn.apply(this, arguments);
        };
        var name = fn.name || "Function wrapped with `once`";
        f2.onceError = name + " shouldn't be called more than once";
        f2.called = false;
        return f2;
      }
    }, { "wrappy": 138 }], 100: [function(require2, module3, exports3) {
      (function(process) {
        if (typeof process === "undefined" || !process.version || process.version.indexOf("v0.") === 0 || process.version.indexOf("v1.") === 0 && process.version.indexOf("v1.8.") !== 0) {
          module3.exports = { nextTick: nextTick2 };
        } else {
          module3.exports = process;
        }
        function nextTick2(fn, arg1, arg2, arg3) {
          if (typeof fn !== "function") {
            throw new TypeError('"callback" argument must be a function');
          }
          var len = arguments.length;
          var args, i;
          switch (len) {
            case 0:
            case 1:
              return process.nextTick(fn);
            case 2:
              return process.nextTick(function afterTickOne() {
                fn.call(null, arg1);
              });
            case 3:
              return process.nextTick(function afterTickTwo() {
                fn.call(null, arg1, arg2);
              });
            case 4:
              return process.nextTick(function afterTickThree() {
                fn.call(null, arg1, arg2, arg3);
              });
            default:
              args = new Array(len - 1);
              i = 0;
              while (i < args.length) {
                args[i++] = arguments[i];
              }
              return process.nextTick(function afterTick() {
                fn.apply(null, args);
              });
          }
        }
      }).call(this, require2("_process"));
    }, { "_process": 101 }], 101: [function(require2, module3, exports3) {
      var process = module3.exports = {};
      var cachedSetTimeout;
      var cachedClearTimeout;
      function defaultSetTimout() {
        throw new Error("setTimeout has not been defined");
      }
      function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined");
      }
      (function() {
        try {
          if (typeof setTimeout === "function") {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e2) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === "function") {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e2) {
          cachedClearTimeout = defaultClearTimeout;
        }
      })();
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          return setTimeout(fun, 0);
        }
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          return cachedSetTimeout(fun, 0);
        } catch (e2) {
          try {
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e3) {
            return cachedSetTimeout.call(this, fun, 0);
          }
        }
      }
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          return clearTimeout(marker);
        }
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          return cachedClearTimeout(marker);
        } catch (e2) {
          try {
            return cachedClearTimeout.call(null, marker);
          } catch (e3) {
            return cachedClearTimeout.call(this, marker);
          }
        }
      }
      var queue2 = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;
      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue2 = currentQueue.concat(queue2);
        } else {
          queueIndex = -1;
        }
        if (queue2.length) {
          drainQueue();
        }
      }
      function drainQueue() {
        if (draining) {
          return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;
        var len = queue2.length;
        while (len) {
          currentQueue = queue2;
          queue2 = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue2.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }
      process.nextTick = function(fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue2.push(new Item(fun, args));
        if (queue2.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      process.title = "browser";
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = "";
      process.versions = {};
      function noop2() {
      }
      process.on = noop2;
      process.addListener = noop2;
      process.once = noop2;
      process.off = noop2;
      process.removeListener = noop2;
      process.removeAllListeners = noop2;
      process.emit = noop2;
      process.prependListener = noop2;
      process.prependOnceListener = noop2;
      process.listeners = function(name) {
        return [];
      };
      process.binding = function(name) {
        throw new Error("process.binding is not supported");
      };
      process.cwd = function() {
        return "/";
      };
      process.chdir = function(dir) {
        throw new Error("process.chdir is not supported");
      };
      process.umask = function() {
        return 0;
      };
    }, {}], 102: [function(require2, module3, exports3) {
      (function(global2) {
        (function(root) {
          var freeExports = typeof exports3 == "object" && exports3 && !exports3.nodeType && exports3;
          var freeModule = typeof module3 == "object" && module3 && !module3.nodeType && module3;
          var freeGlobal = typeof global2 == "object" && global2;
          if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
            root = freeGlobal;
          }
          var punycode, maxInt = 2147483647, base = 36, tMin = 1, tMax = 26, skew = 38, damp = 700, initialBias = 72, initialN = 128, delimiter = "-", regexPunycode = /^xn--/, regexNonASCII = /[^\x20-\x7E]/, regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, errors = {
            "overflow": "Overflow: input needs wider integers to process",
            "not-basic": "Illegal input >= 0x80 (not a basic code point)",
            "invalid-input": "Invalid input"
          }, baseMinusTMin = base - tMin, floor = Math.floor, stringFromCharCode = String.fromCharCode, key;
          function error(type) {
            throw new RangeError(errors[type]);
          }
          function map(array, fn) {
            var length = array.length;
            var result = [];
            while (length--) {
              result[length] = fn(array[length]);
            }
            return result;
          }
          function mapDomain(string, fn) {
            var parts = string.split("@");
            var result = "";
            if (parts.length > 1) {
              result = parts[0] + "@";
              string = parts[1];
            }
            string = string.replace(regexSeparators, ".");
            var labels = string.split(".");
            var encoded = map(labels, fn).join(".");
            return result + encoded;
          }
          function ucs2decode(string) {
            var output = [], counter = 0, length = string.length, value, extra;
            while (counter < length) {
              value = string.charCodeAt(counter++);
              if (value >= 55296 && value <= 56319 && counter < length) {
                extra = string.charCodeAt(counter++);
                if ((extra & 64512) == 56320) {
                  output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
                } else {
                  output.push(value);
                  counter--;
                }
              } else {
                output.push(value);
              }
            }
            return output;
          }
          function ucs2encode(array) {
            return map(array, function(value) {
              var output = "";
              if (value > 65535) {
                value -= 65536;
                output += stringFromCharCode(value >>> 10 & 1023 | 55296);
                value = 56320 | value & 1023;
              }
              output += stringFromCharCode(value);
              return output;
            }).join("");
          }
          function basicToDigit(codePoint) {
            if (codePoint - 48 < 10) {
              return codePoint - 22;
            }
            if (codePoint - 65 < 26) {
              return codePoint - 65;
            }
            if (codePoint - 97 < 26) {
              return codePoint - 97;
            }
            return base;
          }
          function digitToBasic(digit, flag) {
            return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
          }
          function adapt(delta, numPoints, firstTime) {
            var k = 0;
            delta = firstTime ? floor(delta / damp) : delta >> 1;
            delta += floor(delta / numPoints);
            for (; delta > baseMinusTMin * tMax >> 1; k += base) {
              delta = floor(delta / baseMinusTMin);
            }
            return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
          }
          function decode(input) {
            var output = [], inputLength = input.length, out, i = 0, n2 = initialN, bias = initialBias, basic, j, index2, oldi, w, k, digit, t2, baseMinusT;
            basic = input.lastIndexOf(delimiter);
            if (basic < 0) {
              basic = 0;
            }
            for (j = 0; j < basic; ++j) {
              if (input.charCodeAt(j) >= 128) {
                error("not-basic");
              }
              output.push(input.charCodeAt(j));
            }
            for (index2 = basic > 0 ? basic + 1 : 0; index2 < inputLength; ) {
              for (oldi = i, w = 1, k = base; ; k += base) {
                if (index2 >= inputLength) {
                  error("invalid-input");
                }
                digit = basicToDigit(input.charCodeAt(index2++));
                if (digit >= base || digit > floor((maxInt - i) / w)) {
                  error("overflow");
                }
                i += digit * w;
                t2 = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                if (digit < t2) {
                  break;
                }
                baseMinusT = base - t2;
                if (w > floor(maxInt / baseMinusT)) {
                  error("overflow");
                }
                w *= baseMinusT;
              }
              out = output.length + 1;
              bias = adapt(i - oldi, out, oldi == 0);
              if (floor(i / out) > maxInt - n2) {
                error("overflow");
              }
              n2 += floor(i / out);
              i %= out;
              output.splice(i++, 0, n2);
            }
            return ucs2encode(output);
          }
          function encode2(input) {
            var n2, delta, handledCPCount, basicLength, bias, j, m, q, k, t2, currentValue, output = [], inputLength, handledCPCountPlusOne, baseMinusT, qMinusT;
            input = ucs2decode(input);
            inputLength = input.length;
            n2 = initialN;
            delta = 0;
            bias = initialBias;
            for (j = 0; j < inputLength; ++j) {
              currentValue = input[j];
              if (currentValue < 128) {
                output.push(stringFromCharCode(currentValue));
              }
            }
            handledCPCount = basicLength = output.length;
            if (basicLength) {
              output.push(delimiter);
            }
            while (handledCPCount < inputLength) {
              for (m = maxInt, j = 0; j < inputLength; ++j) {
                currentValue = input[j];
                if (currentValue >= n2 && currentValue < m) {
                  m = currentValue;
                }
              }
              handledCPCountPlusOne = handledCPCount + 1;
              if (m - n2 > floor((maxInt - delta) / handledCPCountPlusOne)) {
                error("overflow");
              }
              delta += (m - n2) * handledCPCountPlusOne;
              n2 = m;
              for (j = 0; j < inputLength; ++j) {
                currentValue = input[j];
                if (currentValue < n2 && ++delta > maxInt) {
                  error("overflow");
                }
                if (currentValue == n2) {
                  for (q = delta, k = base; ; k += base) {
                    t2 = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                    if (q < t2) {
                      break;
                    }
                    qMinusT = q - t2;
                    baseMinusT = base - t2;
                    output.push(
                      stringFromCharCode(digitToBasic(t2 + qMinusT % baseMinusT, 0))
                    );
                    q = floor(qMinusT / baseMinusT);
                  }
                  output.push(stringFromCharCode(digitToBasic(q, 0)));
                  bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                  delta = 0;
                  ++handledCPCount;
                }
              }
              ++delta;
              ++n2;
            }
            return output.join("");
          }
          function toUnicode(input) {
            return mapDomain(input, function(string) {
              return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
            });
          }
          function toASCII(input) {
            return mapDomain(input, function(string) {
              return regexNonASCII.test(string) ? "xn--" + encode2(string) : string;
            });
          }
          punycode = {
            /**
             * A string representing the current Punycode.js version number.
             * @memberOf punycode
             * @type String
             */
            "version": "1.4.1",
            /**
             * An object of methods to convert from JavaScript's internal character
             * representation (UCS-2) to Unicode code points, and back.
             * @see <https://mathiasbynens.be/notes/javascript-encoding>
             * @memberOf punycode
             * @type Object
             */
            "ucs2": {
              "decode": ucs2decode,
              "encode": ucs2encode
            },
            "decode": decode,
            "encode": encode2,
            "toASCII": toASCII,
            "toUnicode": toUnicode
          };
          if (freeExports && freeModule) {
            if (module3.exports == freeExports) {
              freeModule.exports = punycode;
            } else {
              for (key in punycode) {
                punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
              }
            }
          } else {
            root.punycode = punycode;
          }
        })(this);
      }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}], 103: [function(require2, module3, exports3) {
      function hasOwnProperty2(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }
      module3.exports = function(qs, sep, eq, options) {
        sep = sep || "&";
        eq = eq || "=";
        var obj = {};
        if (typeof qs !== "string" || qs.length === 0) {
          return obj;
        }
        var regexp = /\+/g;
        qs = qs.split(sep);
        var maxKeys = 1e3;
        if (options && typeof options.maxKeys === "number") {
          maxKeys = options.maxKeys;
        }
        var len = qs.length;
        if (maxKeys > 0 && len > maxKeys) {
          len = maxKeys;
        }
        for (var i = 0; i < len; ++i) {
          var x = qs[i].replace(regexp, "%20"), idx = x.indexOf(eq), kstr, vstr, k, v;
          if (idx >= 0) {
            kstr = x.substr(0, idx);
            vstr = x.substr(idx + 1);
          } else {
            kstr = x;
            vstr = "";
          }
          k = decodeURIComponent(kstr);
          v = decodeURIComponent(vstr);
          if (!hasOwnProperty2(obj, k)) {
            obj[k] = v;
          } else if (isArray2(obj[k])) {
            obj[k].push(v);
          } else {
            obj[k] = [obj[k], v];
          }
        }
        return obj;
      };
      var isArray2 = Array.isArray || function(xs) {
        return Object.prototype.toString.call(xs) === "[object Array]";
      };
    }, {}], 104: [function(require2, module3, exports3) {
      var stringifyPrimitive = function(v) {
        switch (typeof v) {
          case "string":
            return v;
          case "boolean":
            return v ? "true" : "false";
          case "number":
            return isFinite(v) ? v : "";
          default:
            return "";
        }
      };
      module3.exports = function(obj, sep, eq, name) {
        sep = sep || "&";
        eq = eq || "=";
        if (obj === null) {
          obj = void 0;
        }
        if (typeof obj === "object") {
          return map(objectKeys2(obj), function(k) {
            var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
            if (isArray2(obj[k])) {
              return map(obj[k], function(v) {
                return ks + encodeURIComponent(stringifyPrimitive(v));
              }).join(sep);
            } else {
              return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
            }
          }).join(sep);
        }
        if (!name)
          return "";
        return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
      };
      var isArray2 = Array.isArray || function(xs) {
        return Object.prototype.toString.call(xs) === "[object Array]";
      };
      function map(xs, f2) {
        if (xs.map)
          return xs.map(f2);
        var res = [];
        for (var i = 0; i < xs.length; i++) {
          res.push(f2(xs[i], i));
        }
        return res;
      }
      var objectKeys2 = Object.keys || function(obj) {
        var res = [];
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key))
            res.push(key);
        }
        return res;
      };
    }, {}], 105: [function(require2, module3, exports3) {
      exports3.decode = exports3.parse = require2("./decode");
      exports3.encode = exports3.stringify = require2("./encode");
    }, { "./decode": 103, "./encode": 104 }], 106: [function(require2, module3, exports3) {
      module3.exports = require2("./lib/_stream_duplex.js");
    }, { "./lib/_stream_duplex.js": 107 }], 107: [function(require2, module3, exports3) {
      var pna = require2("process-nextick-args");
      var objectKeys2 = Object.keys || function(obj) {
        var keys2 = [];
        for (var key in obj) {
          keys2.push(key);
        }
        return keys2;
      };
      module3.exports = Duplex;
      var util = Object.create(require2("core-util-is"));
      util.inherits = require2("inherits");
      var Readable = require2("./_stream_readable");
      var Writable = require2("./_stream_writable");
      util.inherits(Duplex, Readable);
      {
        var keys = objectKeys2(Writable.prototype);
        for (var v = 0; v < keys.length; v++) {
          var method = keys[v];
          if (!Duplex.prototype[method])
            Duplex.prototype[method] = Writable.prototype[method];
        }
      }
      function Duplex(options) {
        if (!(this instanceof Duplex))
          return new Duplex(options);
        Readable.call(this, options);
        Writable.call(this, options);
        if (options && options.readable === false)
          this.readable = false;
        if (options && options.writable === false)
          this.writable = false;
        this.allowHalfOpen = true;
        if (options && options.allowHalfOpen === false)
          this.allowHalfOpen = false;
        this.once("end", onend);
      }
      Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
        // making it explicit this property is not enumerable
        // because otherwise some prototype manipulation in
        // userland will fail
        enumerable: false,
        get: function() {
          return this._writableState.highWaterMark;
        }
      });
      function onend() {
        if (this.allowHalfOpen || this._writableState.ended)
          return;
        pna.nextTick(onEndNT, this);
      }
      function onEndNT(self2) {
        self2.end();
      }
      Object.defineProperty(Duplex.prototype, "destroyed", {
        get: function() {
          if (this._readableState === void 0 || this._writableState === void 0) {
            return false;
          }
          return this._readableState.destroyed && this._writableState.destroyed;
        },
        set: function(value) {
          if (this._readableState === void 0 || this._writableState === void 0) {
            return;
          }
          this._readableState.destroyed = value;
          this._writableState.destroyed = value;
        }
      });
      Duplex.prototype._destroy = function(err, cb) {
        this.push(null);
        this.end();
        pna.nextTick(cb, err);
      };
    }, { "./_stream_readable": 109, "./_stream_writable": 111, "core-util-is": 14, "inherits": 88, "process-nextick-args": 100 }], 108: [function(require2, module3, exports3) {
      module3.exports = PassThrough;
      var Transform = require2("./_stream_transform");
      var util = Object.create(require2("core-util-is"));
      util.inherits = require2("inherits");
      util.inherits(PassThrough, Transform);
      function PassThrough(options) {
        if (!(this instanceof PassThrough))
          return new PassThrough(options);
        Transform.call(this, options);
      }
      PassThrough.prototype._transform = function(chunk, encoding, cb) {
        cb(null, chunk);
      };
    }, { "./_stream_transform": 110, "core-util-is": 14, "inherits": 88 }], 109: [function(require2, module3, exports3) {
      (function(process, global2) {
        var pna = require2("process-nextick-args");
        module3.exports = Readable;
        var isArray2 = require2("isarray");
        var Duplex;
        Readable.ReadableState = ReadableState;
        require2("events").EventEmitter;
        var EElistenerCount = function(emitter2, type) {
          return emitter2.listeners(type).length;
        };
        var Stream = require2("./internal/streams/stream");
        var Buffer = require2("safe-buffer").Buffer;
        var OurUint8Array = global2.Uint8Array || function() {
        };
        function _uint8ArrayToBuffer(chunk) {
          return Buffer.from(chunk);
        }
        function _isUint8Array(obj) {
          return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
        }
        var util = Object.create(require2("core-util-is"));
        util.inherits = require2("inherits");
        var debugUtil = require2("util");
        var debug = void 0;
        if (debugUtil && debugUtil.debuglog) {
          debug = debugUtil.debuglog("stream");
        } else {
          debug = function() {
          };
        }
        var BufferList = require2("./internal/streams/BufferList");
        var destroyImpl = require2("./internal/streams/destroy");
        var StringDecoder;
        util.inherits(Readable, Stream);
        var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
        function prependListener(emitter2, event, fn) {
          if (typeof emitter2.prependListener === "function")
            return emitter2.prependListener(event, fn);
          if (!emitter2._events || !emitter2._events[event])
            emitter2.on(event, fn);
          else if (isArray2(emitter2._events[event]))
            emitter2._events[event].unshift(fn);
          else
            emitter2._events[event] = [fn, emitter2._events[event]];
        }
        function ReadableState(options, stream) {
          Duplex = Duplex || require2("./_stream_duplex");
          options = options || {};
          var isDuplex = stream instanceof Duplex;
          this.objectMode = !!options.objectMode;
          if (isDuplex)
            this.objectMode = this.objectMode || !!options.readableObjectMode;
          var hwm = options.highWaterMark;
          var readableHwm = options.readableHighWaterMark;
          var defaultHwm = this.objectMode ? 16 : 16 * 1024;
          if (hwm || hwm === 0)
            this.highWaterMark = hwm;
          else if (isDuplex && (readableHwm || readableHwm === 0))
            this.highWaterMark = readableHwm;
          else
            this.highWaterMark = defaultHwm;
          this.highWaterMark = Math.floor(this.highWaterMark);
          this.buffer = new BufferList();
          this.length = 0;
          this.pipes = null;
          this.pipesCount = 0;
          this.flowing = null;
          this.ended = false;
          this.endEmitted = false;
          this.reading = false;
          this.sync = true;
          this.needReadable = false;
          this.emittedReadable = false;
          this.readableListening = false;
          this.resumeScheduled = false;
          this.destroyed = false;
          this.defaultEncoding = options.defaultEncoding || "utf8";
          this.awaitDrain = 0;
          this.readingMore = false;
          this.decoder = null;
          this.encoding = null;
          if (options.encoding) {
            if (!StringDecoder)
              StringDecoder = require2("string_decoder/").StringDecoder;
            this.decoder = new StringDecoder(options.encoding);
            this.encoding = options.encoding;
          }
        }
        function Readable(options) {
          Duplex = Duplex || require2("./_stream_duplex");
          if (!(this instanceof Readable))
            return new Readable(options);
          this._readableState = new ReadableState(options, this);
          this.readable = true;
          if (options) {
            if (typeof options.read === "function")
              this._read = options.read;
            if (typeof options.destroy === "function")
              this._destroy = options.destroy;
          }
          Stream.call(this);
        }
        Object.defineProperty(Readable.prototype, "destroyed", {
          get: function() {
            if (this._readableState === void 0) {
              return false;
            }
            return this._readableState.destroyed;
          },
          set: function(value) {
            if (!this._readableState) {
              return;
            }
            this._readableState.destroyed = value;
          }
        });
        Readable.prototype.destroy = destroyImpl.destroy;
        Readable.prototype._undestroy = destroyImpl.undestroy;
        Readable.prototype._destroy = function(err, cb) {
          this.push(null);
          cb(err);
        };
        Readable.prototype.push = function(chunk, encoding) {
          var state = this._readableState;
          var skipChunkCheck;
          if (!state.objectMode) {
            if (typeof chunk === "string") {
              encoding = encoding || state.defaultEncoding;
              if (encoding !== state.encoding) {
                chunk = Buffer.from(chunk, encoding);
                encoding = "";
              }
              skipChunkCheck = true;
            }
          } else {
            skipChunkCheck = true;
          }
          return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
        };
        Readable.prototype.unshift = function(chunk) {
          return readableAddChunk(this, chunk, null, true, false);
        };
        function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
          var state = stream._readableState;
          if (chunk === null) {
            state.reading = false;
            onEofChunk(stream, state);
          } else {
            var er;
            if (!skipChunkCheck)
              er = chunkInvalid(state, chunk);
            if (er) {
              stream.emit("error", er);
            } else if (state.objectMode || chunk && chunk.length > 0) {
              if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
                chunk = _uint8ArrayToBuffer(chunk);
              }
              if (addToFront) {
                if (state.endEmitted)
                  stream.emit("error", new Error("stream.unshift() after end event"));
                else
                  addChunk(stream, state, chunk, true);
              } else if (state.ended) {
                stream.emit("error", new Error("stream.push() after EOF"));
              } else {
                state.reading = false;
                if (state.decoder && !encoding) {
                  chunk = state.decoder.write(chunk);
                  if (state.objectMode || chunk.length !== 0)
                    addChunk(stream, state, chunk, false);
                  else
                    maybeReadMore(stream, state);
                } else {
                  addChunk(stream, state, chunk, false);
                }
              }
            } else if (!addToFront) {
              state.reading = false;
            }
          }
          return needMoreData(state);
        }
        function addChunk(stream, state, chunk, addToFront) {
          if (state.flowing && state.length === 0 && !state.sync) {
            stream.emit("data", chunk);
            stream.read(0);
          } else {
            state.length += state.objectMode ? 1 : chunk.length;
            if (addToFront)
              state.buffer.unshift(chunk);
            else
              state.buffer.push(chunk);
            if (state.needReadable)
              emitReadable(stream);
          }
          maybeReadMore(stream, state);
        }
        function chunkInvalid(state, chunk) {
          var er;
          if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
            er = new TypeError("Invalid non-string/buffer chunk");
          }
          return er;
        }
        function needMoreData(state) {
          return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
        }
        Readable.prototype.isPaused = function() {
          return this._readableState.flowing === false;
        };
        Readable.prototype.setEncoding = function(enc) {
          if (!StringDecoder)
            StringDecoder = require2("string_decoder/").StringDecoder;
          this._readableState.decoder = new StringDecoder(enc);
          this._readableState.encoding = enc;
          return this;
        };
        var MAX_HWM = 8388608;
        function computeNewHighWaterMark(n2) {
          if (n2 >= MAX_HWM) {
            n2 = MAX_HWM;
          } else {
            n2--;
            n2 |= n2 >>> 1;
            n2 |= n2 >>> 2;
            n2 |= n2 >>> 4;
            n2 |= n2 >>> 8;
            n2 |= n2 >>> 16;
            n2++;
          }
          return n2;
        }
        function howMuchToRead(n2, state) {
          if (n2 <= 0 || state.length === 0 && state.ended)
            return 0;
          if (state.objectMode)
            return 1;
          if (n2 !== n2) {
            if (state.flowing && state.length)
              return state.buffer.head.data.length;
            else
              return state.length;
          }
          if (n2 > state.highWaterMark)
            state.highWaterMark = computeNewHighWaterMark(n2);
          if (n2 <= state.length)
            return n2;
          if (!state.ended) {
            state.needReadable = true;
            return 0;
          }
          return state.length;
        }
        Readable.prototype.read = function(n2) {
          debug("read", n2);
          n2 = parseInt(n2, 10);
          var state = this._readableState;
          var nOrig = n2;
          if (n2 !== 0)
            state.emittedReadable = false;
          if (n2 === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
            debug("read: emitReadable", state.length, state.ended);
            if (state.length === 0 && state.ended)
              endReadable(this);
            else
              emitReadable(this);
            return null;
          }
          n2 = howMuchToRead(n2, state);
          if (n2 === 0 && state.ended) {
            if (state.length === 0)
              endReadable(this);
            return null;
          }
          var doRead = state.needReadable;
          debug("need readable", doRead);
          if (state.length === 0 || state.length - n2 < state.highWaterMark) {
            doRead = true;
            debug("length less than watermark", doRead);
          }
          if (state.ended || state.reading) {
            doRead = false;
            debug("reading or ended", doRead);
          } else if (doRead) {
            debug("do read");
            state.reading = true;
            state.sync = true;
            if (state.length === 0)
              state.needReadable = true;
            this._read(state.highWaterMark);
            state.sync = false;
            if (!state.reading)
              n2 = howMuchToRead(nOrig, state);
          }
          var ret;
          if (n2 > 0)
            ret = fromList(n2, state);
          else
            ret = null;
          if (ret === null) {
            state.needReadable = true;
            n2 = 0;
          } else {
            state.length -= n2;
          }
          if (state.length === 0) {
            if (!state.ended)
              state.needReadable = true;
            if (nOrig !== n2 && state.ended)
              endReadable(this);
          }
          if (ret !== null)
            this.emit("data", ret);
          return ret;
        };
        function onEofChunk(stream, state) {
          if (state.ended)
            return;
          if (state.decoder) {
            var chunk = state.decoder.end();
            if (chunk && chunk.length) {
              state.buffer.push(chunk);
              state.length += state.objectMode ? 1 : chunk.length;
            }
          }
          state.ended = true;
          emitReadable(stream);
        }
        function emitReadable(stream) {
          var state = stream._readableState;
          state.needReadable = false;
          if (!state.emittedReadable) {
            debug("emitReadable", state.flowing);
            state.emittedReadable = true;
            if (state.sync)
              pna.nextTick(emitReadable_, stream);
            else
              emitReadable_(stream);
          }
        }
        function emitReadable_(stream) {
          debug("emit readable");
          stream.emit("readable");
          flow(stream);
        }
        function maybeReadMore(stream, state) {
          if (!state.readingMore) {
            state.readingMore = true;
            pna.nextTick(maybeReadMore_, stream, state);
          }
        }
        function maybeReadMore_(stream, state) {
          var len = state.length;
          while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
            debug("maybeReadMore read 0");
            stream.read(0);
            if (len === state.length)
              break;
            else
              len = state.length;
          }
          state.readingMore = false;
        }
        Readable.prototype._read = function(n2) {
          this.emit("error", new Error("_read() is not implemented"));
        };
        Readable.prototype.pipe = function(dest, pipeOpts) {
          var src = this;
          var state = this._readableState;
          switch (state.pipesCount) {
            case 0:
              state.pipes = dest;
              break;
            case 1:
              state.pipes = [state.pipes, dest];
              break;
            default:
              state.pipes.push(dest);
              break;
          }
          state.pipesCount += 1;
          debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
          var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
          var endFn = doEnd ? onend : unpipe;
          if (state.endEmitted)
            pna.nextTick(endFn);
          else
            src.once("end", endFn);
          dest.on("unpipe", onunpipe);
          function onunpipe(readable, unpipeInfo) {
            debug("onunpipe");
            if (readable === src) {
              if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
                unpipeInfo.hasUnpiped = true;
                cleanup();
              }
            }
          }
          function onend() {
            debug("onend");
            dest.end();
          }
          var ondrain = pipeOnDrain(src);
          dest.on("drain", ondrain);
          var cleanedUp = false;
          function cleanup() {
            debug("cleanup");
            dest.removeListener("close", onclose);
            dest.removeListener("finish", onfinish);
            dest.removeListener("drain", ondrain);
            dest.removeListener("error", onerror);
            dest.removeListener("unpipe", onunpipe);
            src.removeListener("end", onend);
            src.removeListener("end", unpipe);
            src.removeListener("data", ondata);
            cleanedUp = true;
            if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
              ondrain();
          }
          var increasedAwaitDrain = false;
          src.on("data", ondata);
          function ondata(chunk) {
            debug("ondata");
            increasedAwaitDrain = false;
            var ret = dest.write(chunk);
            if (false === ret && !increasedAwaitDrain) {
              if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
                debug("false write response, pause", src._readableState.awaitDrain);
                src._readableState.awaitDrain++;
                increasedAwaitDrain = true;
              }
              src.pause();
            }
          }
          function onerror(er) {
            debug("onerror", er);
            unpipe();
            dest.removeListener("error", onerror);
            if (EElistenerCount(dest, "error") === 0)
              dest.emit("error", er);
          }
          prependListener(dest, "error", onerror);
          function onclose() {
            dest.removeListener("finish", onfinish);
            unpipe();
          }
          dest.once("close", onclose);
          function onfinish() {
            debug("onfinish");
            dest.removeListener("close", onclose);
            unpipe();
          }
          dest.once("finish", onfinish);
          function unpipe() {
            debug("unpipe");
            src.unpipe(dest);
          }
          dest.emit("pipe", src);
          if (!state.flowing) {
            debug("pipe resume");
            src.resume();
          }
          return dest;
        };
        function pipeOnDrain(src) {
          return function() {
            var state = src._readableState;
            debug("pipeOnDrain", state.awaitDrain);
            if (state.awaitDrain)
              state.awaitDrain--;
            if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
              state.flowing = true;
              flow(src);
            }
          };
        }
        Readable.prototype.unpipe = function(dest) {
          var state = this._readableState;
          var unpipeInfo = { hasUnpiped: false };
          if (state.pipesCount === 0)
            return this;
          if (state.pipesCount === 1) {
            if (dest && dest !== state.pipes)
              return this;
            if (!dest)
              dest = state.pipes;
            state.pipes = null;
            state.pipesCount = 0;
            state.flowing = false;
            if (dest)
              dest.emit("unpipe", this, unpipeInfo);
            return this;
          }
          if (!dest) {
            var dests = state.pipes;
            var len = state.pipesCount;
            state.pipes = null;
            state.pipesCount = 0;
            state.flowing = false;
            for (var i = 0; i < len; i++) {
              dests[i].emit("unpipe", this, unpipeInfo);
            }
            return this;
          }
          var index2 = indexOf(state.pipes, dest);
          if (index2 === -1)
            return this;
          state.pipes.splice(index2, 1);
          state.pipesCount -= 1;
          if (state.pipesCount === 1)
            state.pipes = state.pipes[0];
          dest.emit("unpipe", this, unpipeInfo);
          return this;
        };
        Readable.prototype.on = function(ev, fn) {
          var res = Stream.prototype.on.call(this, ev, fn);
          if (ev === "data") {
            if (this._readableState.flowing !== false)
              this.resume();
          } else if (ev === "readable") {
            var state = this._readableState;
            if (!state.endEmitted && !state.readableListening) {
              state.readableListening = state.needReadable = true;
              state.emittedReadable = false;
              if (!state.reading) {
                pna.nextTick(nReadingNextTick, this);
              } else if (state.length) {
                emitReadable(this);
              }
            }
          }
          return res;
        };
        Readable.prototype.addListener = Readable.prototype.on;
        function nReadingNextTick(self2) {
          debug("readable nexttick read 0");
          self2.read(0);
        }
        Readable.prototype.resume = function() {
          var state = this._readableState;
          if (!state.flowing) {
            debug("resume");
            state.flowing = true;
            resume(this, state);
          }
          return this;
        };
        function resume(stream, state) {
          if (!state.resumeScheduled) {
            state.resumeScheduled = true;
            pna.nextTick(resume_, stream, state);
          }
        }
        function resume_(stream, state) {
          if (!state.reading) {
            debug("resume read 0");
            stream.read(0);
          }
          state.resumeScheduled = false;
          state.awaitDrain = 0;
          stream.emit("resume");
          flow(stream);
          if (state.flowing && !state.reading)
            stream.read(0);
        }
        Readable.prototype.pause = function() {
          debug("call pause flowing=%j", this._readableState.flowing);
          if (false !== this._readableState.flowing) {
            debug("pause");
            this._readableState.flowing = false;
            this.emit("pause");
          }
          return this;
        };
        function flow(stream) {
          var state = stream._readableState;
          debug("flow", state.flowing);
          while (state.flowing && stream.read() !== null) {
          }
        }
        Readable.prototype.wrap = function(stream) {
          var _this = this;
          var state = this._readableState;
          var paused = false;
          stream.on("end", function() {
            debug("wrapped end");
            if (state.decoder && !state.ended) {
              var chunk = state.decoder.end();
              if (chunk && chunk.length)
                _this.push(chunk);
            }
            _this.push(null);
          });
          stream.on("data", function(chunk) {
            debug("wrapped data");
            if (state.decoder)
              chunk = state.decoder.write(chunk);
            if (state.objectMode && (chunk === null || chunk === void 0))
              return;
            else if (!state.objectMode && (!chunk || !chunk.length))
              return;
            var ret = _this.push(chunk);
            if (!ret) {
              paused = true;
              stream.pause();
            }
          });
          for (var i in stream) {
            if (this[i] === void 0 && typeof stream[i] === "function") {
              this[i] = function(method) {
                return function() {
                  return stream[method].apply(stream, arguments);
                };
              }(i);
            }
          }
          for (var n2 = 0; n2 < kProxyEvents.length; n2++) {
            stream.on(kProxyEvents[n2], this.emit.bind(this, kProxyEvents[n2]));
          }
          this._read = function(n3) {
            debug("wrapped _read", n3);
            if (paused) {
              paused = false;
              stream.resume();
            }
          };
          return this;
        };
        Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: false,
          get: function() {
            return this._readableState.highWaterMark;
          }
        });
        Readable._fromList = fromList;
        function fromList(n2, state) {
          if (state.length === 0)
            return null;
          var ret;
          if (state.objectMode)
            ret = state.buffer.shift();
          else if (!n2 || n2 >= state.length) {
            if (state.decoder)
              ret = state.buffer.join("");
            else if (state.buffer.length === 1)
              ret = state.buffer.head.data;
            else
              ret = state.buffer.concat(state.length);
            state.buffer.clear();
          } else {
            ret = fromListPartial(n2, state.buffer, state.decoder);
          }
          return ret;
        }
        function fromListPartial(n2, list, hasStrings) {
          var ret;
          if (n2 < list.head.data.length) {
            ret = list.head.data.slice(0, n2);
            list.head.data = list.head.data.slice(n2);
          } else if (n2 === list.head.data.length) {
            ret = list.shift();
          } else {
            ret = hasStrings ? copyFromBufferString(n2, list) : copyFromBuffer(n2, list);
          }
          return ret;
        }
        function copyFromBufferString(n2, list) {
          var p2 = list.head;
          var c = 1;
          var ret = p2.data;
          n2 -= ret.length;
          while (p2 = p2.next) {
            var str = p2.data;
            var nb = n2 > str.length ? str.length : n2;
            if (nb === str.length)
              ret += str;
            else
              ret += str.slice(0, n2);
            n2 -= nb;
            if (n2 === 0) {
              if (nb === str.length) {
                ++c;
                if (p2.next)
                  list.head = p2.next;
                else
                  list.head = list.tail = null;
              } else {
                list.head = p2;
                p2.data = str.slice(nb);
              }
              break;
            }
            ++c;
          }
          list.length -= c;
          return ret;
        }
        function copyFromBuffer(n2, list) {
          var ret = Buffer.allocUnsafe(n2);
          var p2 = list.head;
          var c = 1;
          p2.data.copy(ret);
          n2 -= p2.data.length;
          while (p2 = p2.next) {
            var buf = p2.data;
            var nb = n2 > buf.length ? buf.length : n2;
            buf.copy(ret, ret.length - n2, 0, nb);
            n2 -= nb;
            if (n2 === 0) {
              if (nb === buf.length) {
                ++c;
                if (p2.next)
                  list.head = p2.next;
                else
                  list.head = list.tail = null;
              } else {
                list.head = p2;
                p2.data = buf.slice(nb);
              }
              break;
            }
            ++c;
          }
          list.length -= c;
          return ret;
        }
        function endReadable(stream) {
          var state = stream._readableState;
          if (state.length > 0)
            throw new Error('"endReadable()" called on non-empty stream');
          if (!state.endEmitted) {
            state.ended = true;
            pna.nextTick(endReadableNT, state, stream);
          }
        }
        function endReadableNT(state, stream) {
          if (!state.endEmitted && state.length === 0) {
            state.endEmitted = true;
            stream.readable = false;
            stream.emit("end");
          }
        }
        function indexOf(xs, x) {
          for (var i = 0, l = xs.length; i < l; i++) {
            if (xs[i] === x)
              return i;
          }
          return -1;
        }
      }).call(this, require2("_process"), typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, { "./_stream_duplex": 107, "./internal/streams/BufferList": 112, "./internal/streams/destroy": 113, "./internal/streams/stream": 114, "_process": 101, "core-util-is": 14, "events": 83, "inherits": 88, "isarray": 90, "process-nextick-args": 100, "safe-buffer": 117, "string_decoder/": 119, "util": 12 }], 110: [function(require2, module3, exports3) {
      module3.exports = Transform;
      var Duplex = require2("./_stream_duplex");
      var util = Object.create(require2("core-util-is"));
      util.inherits = require2("inherits");
      util.inherits(Transform, Duplex);
      function afterTransform(er, data) {
        var ts = this._transformState;
        ts.transforming = false;
        var cb = ts.writecb;
        if (!cb) {
          return this.emit("error", new Error("write callback called multiple times"));
        }
        ts.writechunk = null;
        ts.writecb = null;
        if (data != null)
          this.push(data);
        cb(er);
        var rs = this._readableState;
        rs.reading = false;
        if (rs.needReadable || rs.length < rs.highWaterMark) {
          this._read(rs.highWaterMark);
        }
      }
      function Transform(options) {
        if (!(this instanceof Transform))
          return new Transform(options);
        Duplex.call(this, options);
        this._transformState = {
          afterTransform: afterTransform.bind(this),
          needTransform: false,
          transforming: false,
          writecb: null,
          writechunk: null,
          writeencoding: null
        };
        this._readableState.needReadable = true;
        this._readableState.sync = false;
        if (options) {
          if (typeof options.transform === "function")
            this._transform = options.transform;
          if (typeof options.flush === "function")
            this._flush = options.flush;
        }
        this.on("prefinish", prefinish);
      }
      function prefinish() {
        var _this = this;
        if (typeof this._flush === "function") {
          this._flush(function(er, data) {
            done(_this, er, data);
          });
        } else {
          done(this, null, null);
        }
      }
      Transform.prototype.push = function(chunk, encoding) {
        this._transformState.needTransform = false;
        return Duplex.prototype.push.call(this, chunk, encoding);
      };
      Transform.prototype._transform = function(chunk, encoding, cb) {
        throw new Error("_transform() is not implemented");
      };
      Transform.prototype._write = function(chunk, encoding, cb) {
        var ts = this._transformState;
        ts.writecb = cb;
        ts.writechunk = chunk;
        ts.writeencoding = encoding;
        if (!ts.transforming) {
          var rs = this._readableState;
          if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
            this._read(rs.highWaterMark);
        }
      };
      Transform.prototype._read = function(n2) {
        var ts = this._transformState;
        if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
          ts.transforming = true;
          this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
        } else {
          ts.needTransform = true;
        }
      };
      Transform.prototype._destroy = function(err, cb) {
        var _this2 = this;
        Duplex.prototype._destroy.call(this, err, function(err2) {
          cb(err2);
          _this2.emit("close");
        });
      };
      function done(stream, er, data) {
        if (er)
          return stream.emit("error", er);
        if (data != null)
          stream.push(data);
        if (stream._writableState.length)
          throw new Error("Calling transform done when ws.length != 0");
        if (stream._transformState.transforming)
          throw new Error("Calling transform done when still transforming");
        return stream.push(null);
      }
    }, { "./_stream_duplex": 107, "core-util-is": 14, "inherits": 88 }], 111: [function(require2, module3, exports3) {
      (function(process, global2, setImmediate) {
        var pna = require2("process-nextick-args");
        module3.exports = Writable;
        function CorkedRequest(state) {
          var _this = this;
          this.next = null;
          this.entry = null;
          this.finish = function() {
            onCorkedFinish(_this, state);
          };
        }
        var asyncWrite = !process.browser && ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
        var Duplex;
        Writable.WritableState = WritableState;
        var util = Object.create(require2("core-util-is"));
        util.inherits = require2("inherits");
        var internalUtil = {
          deprecate: require2("util-deprecate")
        };
        var Stream = require2("./internal/streams/stream");
        var Buffer = require2("safe-buffer").Buffer;
        var OurUint8Array = global2.Uint8Array || function() {
        };
        function _uint8ArrayToBuffer(chunk) {
          return Buffer.from(chunk);
        }
        function _isUint8Array(obj) {
          return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
        }
        var destroyImpl = require2("./internal/streams/destroy");
        util.inherits(Writable, Stream);
        function nop() {
        }
        function WritableState(options, stream) {
          Duplex = Duplex || require2("./_stream_duplex");
          options = options || {};
          var isDuplex = stream instanceof Duplex;
          this.objectMode = !!options.objectMode;
          if (isDuplex)
            this.objectMode = this.objectMode || !!options.writableObjectMode;
          var hwm = options.highWaterMark;
          var writableHwm = options.writableHighWaterMark;
          var defaultHwm = this.objectMode ? 16 : 16 * 1024;
          if (hwm || hwm === 0)
            this.highWaterMark = hwm;
          else if (isDuplex && (writableHwm || writableHwm === 0))
            this.highWaterMark = writableHwm;
          else
            this.highWaterMark = defaultHwm;
          this.highWaterMark = Math.floor(this.highWaterMark);
          this.finalCalled = false;
          this.needDrain = false;
          this.ending = false;
          this.ended = false;
          this.finished = false;
          this.destroyed = false;
          var noDecode = options.decodeStrings === false;
          this.decodeStrings = !noDecode;
          this.defaultEncoding = options.defaultEncoding || "utf8";
          this.length = 0;
          this.writing = false;
          this.corked = 0;
          this.sync = true;
          this.bufferProcessing = false;
          this.onwrite = function(er) {
            onwrite(stream, er);
          };
          this.writecb = null;
          this.writelen = 0;
          this.bufferedRequest = null;
          this.lastBufferedRequest = null;
          this.pendingcb = 0;
          this.prefinished = false;
          this.errorEmitted = false;
          this.bufferedRequestCount = 0;
          this.corkedRequestsFree = new CorkedRequest(this);
        }
        WritableState.prototype.getBuffer = function getBuffer() {
          var current = this.bufferedRequest;
          var out = [];
          while (current) {
            out.push(current);
            current = current.next;
          }
          return out;
        };
        (function() {
          try {
            Object.defineProperty(WritableState.prototype, "buffer", {
              get: internalUtil.deprecate(function() {
                return this.getBuffer();
              }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
            });
          } catch (_) {
          }
        })();
        var realHasInstance;
        if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
          realHasInstance = Function.prototype[Symbol.hasInstance];
          Object.defineProperty(Writable, Symbol.hasInstance, {
            value: function(object) {
              if (realHasInstance.call(this, object))
                return true;
              if (this !== Writable)
                return false;
              return object && object._writableState instanceof WritableState;
            }
          });
        } else {
          realHasInstance = function(object) {
            return object instanceof this;
          };
        }
        function Writable(options) {
          Duplex = Duplex || require2("./_stream_duplex");
          if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
            return new Writable(options);
          }
          this._writableState = new WritableState(options, this);
          this.writable = true;
          if (options) {
            if (typeof options.write === "function")
              this._write = options.write;
            if (typeof options.writev === "function")
              this._writev = options.writev;
            if (typeof options.destroy === "function")
              this._destroy = options.destroy;
            if (typeof options.final === "function")
              this._final = options.final;
          }
          Stream.call(this);
        }
        Writable.prototype.pipe = function() {
          this.emit("error", new Error("Cannot pipe, not readable"));
        };
        function writeAfterEnd(stream, cb) {
          var er = new Error("write after end");
          stream.emit("error", er);
          pna.nextTick(cb, er);
        }
        function validChunk(stream, state, chunk, cb) {
          var valid = true;
          var er = false;
          if (chunk === null) {
            er = new TypeError("May not write null values to stream");
          } else if (typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
            er = new TypeError("Invalid non-string/buffer chunk");
          }
          if (er) {
            stream.emit("error", er);
            pna.nextTick(cb, er);
            valid = false;
          }
          return valid;
        }
        Writable.prototype.write = function(chunk, encoding, cb) {
          var state = this._writableState;
          var ret = false;
          var isBuf = !state.objectMode && _isUint8Array(chunk);
          if (isBuf && !Buffer.isBuffer(chunk)) {
            chunk = _uint8ArrayToBuffer(chunk);
          }
          if (typeof encoding === "function") {
            cb = encoding;
            encoding = null;
          }
          if (isBuf)
            encoding = "buffer";
          else if (!encoding)
            encoding = state.defaultEncoding;
          if (typeof cb !== "function")
            cb = nop;
          if (state.ended)
            writeAfterEnd(this, cb);
          else if (isBuf || validChunk(this, state, chunk, cb)) {
            state.pendingcb++;
            ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
          }
          return ret;
        };
        Writable.prototype.cork = function() {
          var state = this._writableState;
          state.corked++;
        };
        Writable.prototype.uncork = function() {
          var state = this._writableState;
          if (state.corked) {
            state.corked--;
            if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest)
              clearBuffer(this, state);
          }
        };
        Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
          if (typeof encoding === "string")
            encoding = encoding.toLowerCase();
          if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
            throw new TypeError("Unknown encoding: " + encoding);
          this._writableState.defaultEncoding = encoding;
          return this;
        };
        function decodeChunk(state, chunk, encoding) {
          if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
            chunk = Buffer.from(chunk, encoding);
          }
          return chunk;
        }
        Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: false,
          get: function() {
            return this._writableState.highWaterMark;
          }
        });
        function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
          if (!isBuf) {
            var newChunk = decodeChunk(state, chunk, encoding);
            if (chunk !== newChunk) {
              isBuf = true;
              encoding = "buffer";
              chunk = newChunk;
            }
          }
          var len = state.objectMode ? 1 : chunk.length;
          state.length += len;
          var ret = state.length < state.highWaterMark;
          if (!ret)
            state.needDrain = true;
          if (state.writing || state.corked) {
            var last = state.lastBufferedRequest;
            state.lastBufferedRequest = {
              chunk,
              encoding,
              isBuf,
              callback: cb,
              next: null
            };
            if (last) {
              last.next = state.lastBufferedRequest;
            } else {
              state.bufferedRequest = state.lastBufferedRequest;
            }
            state.bufferedRequestCount += 1;
          } else {
            doWrite(stream, state, false, len, chunk, encoding, cb);
          }
          return ret;
        }
        function doWrite(stream, state, writev, len, chunk, encoding, cb) {
          state.writelen = len;
          state.writecb = cb;
          state.writing = true;
          state.sync = true;
          if (writev)
            stream._writev(chunk, state.onwrite);
          else
            stream._write(chunk, encoding, state.onwrite);
          state.sync = false;
        }
        function onwriteError(stream, state, sync, er, cb) {
          --state.pendingcb;
          if (sync) {
            pna.nextTick(cb, er);
            pna.nextTick(finishMaybe, stream, state);
            stream._writableState.errorEmitted = true;
            stream.emit("error", er);
          } else {
            cb(er);
            stream._writableState.errorEmitted = true;
            stream.emit("error", er);
            finishMaybe(stream, state);
          }
        }
        function onwriteStateUpdate(state) {
          state.writing = false;
          state.writecb = null;
          state.length -= state.writelen;
          state.writelen = 0;
        }
        function onwrite(stream, er) {
          var state = stream._writableState;
          var sync = state.sync;
          var cb = state.writecb;
          onwriteStateUpdate(state);
          if (er)
            onwriteError(stream, state, sync, er, cb);
          else {
            var finished = needFinish(state);
            if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
              clearBuffer(stream, state);
            }
            if (sync) {
              asyncWrite(afterWrite, stream, state, finished, cb);
            } else {
              afterWrite(stream, state, finished, cb);
            }
          }
        }
        function afterWrite(stream, state, finished, cb) {
          if (!finished)
            onwriteDrain(stream, state);
          state.pendingcb--;
          cb();
          finishMaybe(stream, state);
        }
        function onwriteDrain(stream, state) {
          if (state.length === 0 && state.needDrain) {
            state.needDrain = false;
            stream.emit("drain");
          }
        }
        function clearBuffer(stream, state) {
          state.bufferProcessing = true;
          var entry = state.bufferedRequest;
          if (stream._writev && entry && entry.next) {
            var l = state.bufferedRequestCount;
            var buffer2 = new Array(l);
            var holder = state.corkedRequestsFree;
            holder.entry = entry;
            var count = 0;
            var allBuffers = true;
            while (entry) {
              buffer2[count] = entry;
              if (!entry.isBuf)
                allBuffers = false;
              entry = entry.next;
              count += 1;
            }
            buffer2.allBuffers = allBuffers;
            doWrite(stream, state, true, state.length, buffer2, "", holder.finish);
            state.pendingcb++;
            state.lastBufferedRequest = null;
            if (holder.next) {
              state.corkedRequestsFree = holder.next;
              holder.next = null;
            } else {
              state.corkedRequestsFree = new CorkedRequest(state);
            }
            state.bufferedRequestCount = 0;
          } else {
            while (entry) {
              var chunk = entry.chunk;
              var encoding = entry.encoding;
              var cb = entry.callback;
              var len = state.objectMode ? 1 : chunk.length;
              doWrite(stream, state, false, len, chunk, encoding, cb);
              entry = entry.next;
              state.bufferedRequestCount--;
              if (state.writing) {
                break;
              }
            }
            if (entry === null)
              state.lastBufferedRequest = null;
          }
          state.bufferedRequest = entry;
          state.bufferProcessing = false;
        }
        Writable.prototype._write = function(chunk, encoding, cb) {
          cb(new Error("_write() is not implemented"));
        };
        Writable.prototype._writev = null;
        Writable.prototype.end = function(chunk, encoding, cb) {
          var state = this._writableState;
          if (typeof chunk === "function") {
            cb = chunk;
            chunk = null;
            encoding = null;
          } else if (typeof encoding === "function") {
            cb = encoding;
            encoding = null;
          }
          if (chunk !== null && chunk !== void 0)
            this.write(chunk, encoding);
          if (state.corked) {
            state.corked = 1;
            this.uncork();
          }
          if (!state.ending && !state.finished)
            endWritable(this, state, cb);
        };
        function needFinish(state) {
          return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
        }
        function callFinal(stream, state) {
          stream._final(function(err) {
            state.pendingcb--;
            if (err) {
              stream.emit("error", err);
            }
            state.prefinished = true;
            stream.emit("prefinish");
            finishMaybe(stream, state);
          });
        }
        function prefinish(stream, state) {
          if (!state.prefinished && !state.finalCalled) {
            if (typeof stream._final === "function") {
              state.pendingcb++;
              state.finalCalled = true;
              pna.nextTick(callFinal, stream, state);
            } else {
              state.prefinished = true;
              stream.emit("prefinish");
            }
          }
        }
        function finishMaybe(stream, state) {
          var need = needFinish(state);
          if (need) {
            prefinish(stream, state);
            if (state.pendingcb === 0) {
              state.finished = true;
              stream.emit("finish");
            }
          }
          return need;
        }
        function endWritable(stream, state, cb) {
          state.ending = true;
          finishMaybe(stream, state);
          if (cb) {
            if (state.finished)
              pna.nextTick(cb);
            else
              stream.once("finish", cb);
          }
          state.ended = true;
          stream.writable = false;
        }
        function onCorkedFinish(corkReq, state, err) {
          var entry = corkReq.entry;
          corkReq.entry = null;
          while (entry) {
            var cb = entry.callback;
            state.pendingcb--;
            cb(err);
            entry = entry.next;
          }
          if (state.corkedRequestsFree) {
            state.corkedRequestsFree.next = corkReq;
          } else {
            state.corkedRequestsFree = corkReq;
          }
        }
        Object.defineProperty(Writable.prototype, "destroyed", {
          get: function() {
            if (this._writableState === void 0) {
              return false;
            }
            return this._writableState.destroyed;
          },
          set: function(value) {
            if (!this._writableState) {
              return;
            }
            this._writableState.destroyed = value;
          }
        });
        Writable.prototype.destroy = destroyImpl.destroy;
        Writable.prototype._undestroy = destroyImpl.undestroy;
        Writable.prototype._destroy = function(err, cb) {
          this.end();
          cb(err);
        };
      }).call(this, require2("_process"), typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require2("timers").setImmediate);
    }, { "./_stream_duplex": 107, "./internal/streams/destroy": 113, "./internal/streams/stream": 114, "_process": 101, "core-util-is": 14, "inherits": 88, "process-nextick-args": 100, "safe-buffer": 117, "timers": 120, "util-deprecate": 134 }], 112: [function(require2, module3, exports3) {
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      var Buffer = require2("safe-buffer").Buffer;
      var util = require2("util");
      function copyBuffer(src, target, offset) {
        src.copy(target, offset);
      }
      module3.exports = function() {
        function BufferList() {
          _classCallCheck(this, BufferList);
          this.head = null;
          this.tail = null;
          this.length = 0;
        }
        BufferList.prototype.push = function push(v) {
          var entry = { data: v, next: null };
          if (this.length > 0)
            this.tail.next = entry;
          else
            this.head = entry;
          this.tail = entry;
          ++this.length;
        };
        BufferList.prototype.unshift = function unshift(v) {
          var entry = { data: v, next: this.head };
          if (this.length === 0)
            this.tail = entry;
          this.head = entry;
          ++this.length;
        };
        BufferList.prototype.shift = function shift() {
          if (this.length === 0)
            return;
          var ret = this.head.data;
          if (this.length === 1)
            this.head = this.tail = null;
          else
            this.head = this.head.next;
          --this.length;
          return ret;
        };
        BufferList.prototype.clear = function clear2() {
          this.head = this.tail = null;
          this.length = 0;
        };
        BufferList.prototype.join = function join(s2) {
          if (this.length === 0)
            return "";
          var p2 = this.head;
          var ret = "" + p2.data;
          while (p2 = p2.next) {
            ret += s2 + p2.data;
          }
          return ret;
        };
        BufferList.prototype.concat = function concat(n2) {
          if (this.length === 0)
            return Buffer.alloc(0);
          if (this.length === 1)
            return this.head.data;
          var ret = Buffer.allocUnsafe(n2 >>> 0);
          var p2 = this.head;
          var i = 0;
          while (p2) {
            copyBuffer(p2.data, ret, i);
            i += p2.data.length;
            p2 = p2.next;
          }
          return ret;
        };
        return BufferList;
      }();
      if (util && util.inspect && util.inspect.custom) {
        module3.exports.prototype[util.inspect.custom] = function() {
          var obj = util.inspect({ length: this.length });
          return this.constructor.name + " " + obj;
        };
      }
    }, { "safe-buffer": 117, "util": 12 }], 113: [function(require2, module3, exports3) {
      var pna = require2("process-nextick-args");
      function destroy(err, cb) {
        var _this = this;
        var readableDestroyed = this._readableState && this._readableState.destroyed;
        var writableDestroyed = this._writableState && this._writableState.destroyed;
        if (readableDestroyed || writableDestroyed) {
          if (cb) {
            cb(err);
          } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
            pna.nextTick(emitErrorNT, this, err);
          }
          return this;
        }
        if (this._readableState) {
          this._readableState.destroyed = true;
        }
        if (this._writableState) {
          this._writableState.destroyed = true;
        }
        this._destroy(err || null, function(err2) {
          if (!cb && err2) {
            pna.nextTick(emitErrorNT, _this, err2);
            if (_this._writableState) {
              _this._writableState.errorEmitted = true;
            }
          } else if (cb) {
            cb(err2);
          }
        });
        return this;
      }
      function undestroy() {
        if (this._readableState) {
          this._readableState.destroyed = false;
          this._readableState.reading = false;
          this._readableState.ended = false;
          this._readableState.endEmitted = false;
        }
        if (this._writableState) {
          this._writableState.destroyed = false;
          this._writableState.ended = false;
          this._writableState.ending = false;
          this._writableState.finished = false;
          this._writableState.errorEmitted = false;
        }
      }
      function emitErrorNT(self2, err) {
        self2.emit("error", err);
      }
      module3.exports = {
        destroy,
        undestroy
      };
    }, { "process-nextick-args": 100 }], 114: [function(require2, module3, exports3) {
      module3.exports = require2("events").EventEmitter;
    }, { "events": 83 }], 115: [function(require2, module3, exports3) {
      exports3 = module3.exports = require2("./lib/_stream_readable.js");
      exports3.Stream = exports3;
      exports3.Readable = exports3;
      exports3.Writable = require2("./lib/_stream_writable.js");
      exports3.Duplex = require2("./lib/_stream_duplex.js");
      exports3.Transform = require2("./lib/_stream_transform.js");
      exports3.PassThrough = require2("./lib/_stream_passthrough.js");
    }, { "./lib/_stream_duplex.js": 107, "./lib/_stream_passthrough.js": 108, "./lib/_stream_readable.js": 109, "./lib/_stream_transform.js": 110, "./lib/_stream_writable.js": 111 }], 116: [function(require2, module3, exports3) {
      function ReInterval(callback, interval, args) {
        var self2 = this;
        this._callback = callback;
        this._args = args;
        this._interval = setInterval(callback, interval, this._args);
        this.reschedule = function(interval2) {
          if (!interval2)
            interval2 = self2._interval;
          if (self2._interval)
            clearInterval(self2._interval);
          self2._interval = setInterval(self2._callback, interval2, self2._args);
        };
        this.clear = function() {
          if (self2._interval) {
            clearInterval(self2._interval);
            self2._interval = void 0;
          }
        };
        this.destroy = function() {
          if (self2._interval) {
            clearInterval(self2._interval);
          }
          self2._callback = void 0;
          self2._interval = void 0;
          self2._args = void 0;
        };
      }
      function reInterval() {
        if (typeof arguments[0] !== "function")
          throw new Error("callback needed");
        if (typeof arguments[1] !== "number")
          throw new Error("interval needed");
        var args;
        if (arguments.length > 0) {
          args = new Array(arguments.length - 2);
          for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i + 2];
          }
        }
        return new ReInterval(arguments[0], arguments[1], args);
      }
      module3.exports = reInterval;
    }, {}], 117: [function(require2, module3, exports3) {
      var buffer2 = require2("buffer");
      var Buffer = buffer2.Buffer;
      function copyProps(src, dst) {
        for (var key in src) {
          dst[key] = src[key];
        }
      }
      if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
        module3.exports = buffer2;
      } else {
        copyProps(buffer2, exports3);
        exports3.Buffer = SafeBuffer;
      }
      function SafeBuffer(arg, encodingOrOffset, length) {
        return Buffer(arg, encodingOrOffset, length);
      }
      copyProps(Buffer, SafeBuffer);
      SafeBuffer.from = function(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          throw new TypeError("Argument must not be a number");
        }
        return Buffer(arg, encodingOrOffset, length);
      };
      SafeBuffer.alloc = function(size2, fill, encoding) {
        if (typeof size2 !== "number") {
          throw new TypeError("Argument must be a number");
        }
        var buf = Buffer(size2);
        if (fill !== void 0) {
          if (typeof encoding === "string") {
            buf.fill(fill, encoding);
          } else {
            buf.fill(fill);
          }
        } else {
          buf.fill(0);
        }
        return buf;
      };
      SafeBuffer.allocUnsafe = function(size2) {
        if (typeof size2 !== "number") {
          throw new TypeError("Argument must be a number");
        }
        return Buffer(size2);
      };
      SafeBuffer.allocUnsafeSlow = function(size2) {
        if (typeof size2 !== "number") {
          throw new TypeError("Argument must be a number");
        }
        return buffer2.SlowBuffer(size2);
      };
    }, { "buffer": 13 }], 118: [function(require2, module3, exports3) {
      module3.exports = shift;
      function shift(stream) {
        var rs = stream._readableState;
        if (!rs)
          return null;
        return rs.objectMode || typeof stream._duplexState === "number" ? stream.read() : stream.read(getStateLength(rs));
      }
      function getStateLength(state) {
        if (state.buffer.length) {
          if (state.buffer.head) {
            return state.buffer.head.data.length;
          }
          return state.buffer[0].length;
        }
        return state.length;
      }
    }, {}], 119: [function(require2, module3, exports3) {
      var Buffer = require2("safe-buffer").Buffer;
      var isEncoding = Buffer.isEncoding || function(encoding) {
        encoding = "" + encoding;
        switch (encoding && encoding.toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw":
            return true;
          default:
            return false;
        }
      };
      function _normalizeEncoding(enc) {
        if (!enc)
          return "utf8";
        var retried;
        while (true) {
          switch (enc) {
            case "utf8":
            case "utf-8":
              return "utf8";
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return "utf16le";
            case "latin1":
            case "binary":
              return "latin1";
            case "base64":
            case "ascii":
            case "hex":
              return enc;
            default:
              if (retried)
                return;
              enc = ("" + enc).toLowerCase();
              retried = true;
          }
        }
      }
      function normalizeEncoding(enc) {
        var nenc = _normalizeEncoding(enc);
        if (typeof nenc !== "string" && (Buffer.isEncoding === isEncoding || !isEncoding(enc)))
          throw new Error("Unknown encoding: " + enc);
        return nenc || enc;
      }
      exports3.StringDecoder = StringDecoder;
      function StringDecoder(encoding) {
        this.encoding = normalizeEncoding(encoding);
        var nb;
        switch (this.encoding) {
          case "utf16le":
            this.text = utf16Text;
            this.end = utf16End;
            nb = 4;
            break;
          case "utf8":
            this.fillLast = utf8FillLast;
            nb = 4;
            break;
          case "base64":
            this.text = base64Text;
            this.end = base64End;
            nb = 3;
            break;
          default:
            this.write = simpleWrite;
            this.end = simpleEnd;
            return;
        }
        this.lastNeed = 0;
        this.lastTotal = 0;
        this.lastChar = Buffer.allocUnsafe(nb);
      }
      StringDecoder.prototype.write = function(buf) {
        if (buf.length === 0)
          return "";
        var r;
        var i;
        if (this.lastNeed) {
          r = this.fillLast(buf);
          if (r === void 0)
            return "";
          i = this.lastNeed;
          this.lastNeed = 0;
        } else {
          i = 0;
        }
        if (i < buf.length)
          return r ? r + this.text(buf, i) : this.text(buf, i);
        return r || "";
      };
      StringDecoder.prototype.end = utf8End;
      StringDecoder.prototype.text = utf8Text;
      StringDecoder.prototype.fillLast = function(buf) {
        if (this.lastNeed <= buf.length) {
          buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
          return this.lastChar.toString(this.encoding, 0, this.lastTotal);
        }
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
        this.lastNeed -= buf.length;
      };
      function utf8CheckByte(byte) {
        if (byte <= 127)
          return 0;
        else if (byte >> 5 === 6)
          return 2;
        else if (byte >> 4 === 14)
          return 3;
        else if (byte >> 3 === 30)
          return 4;
        return byte >> 6 === 2 ? -1 : -2;
      }
      function utf8CheckIncomplete(self2, buf, i) {
        var j = buf.length - 1;
        if (j < i)
          return 0;
        var nb = utf8CheckByte(buf[j]);
        if (nb >= 0) {
          if (nb > 0)
            self2.lastNeed = nb - 1;
          return nb;
        }
        if (--j < i || nb === -2)
          return 0;
        nb = utf8CheckByte(buf[j]);
        if (nb >= 0) {
          if (nb > 0)
            self2.lastNeed = nb - 2;
          return nb;
        }
        if (--j < i || nb === -2)
          return 0;
        nb = utf8CheckByte(buf[j]);
        if (nb >= 0) {
          if (nb > 0) {
            if (nb === 2)
              nb = 0;
            else
              self2.lastNeed = nb - 3;
          }
          return nb;
        }
        return 0;
      }
      function utf8CheckExtraBytes(self2, buf, p2) {
        if ((buf[0] & 192) !== 128) {
          self2.lastNeed = 0;
          return "�";
        }
        if (self2.lastNeed > 1 && buf.length > 1) {
          if ((buf[1] & 192) !== 128) {
            self2.lastNeed = 1;
            return "�";
          }
          if (self2.lastNeed > 2 && buf.length > 2) {
            if ((buf[2] & 192) !== 128) {
              self2.lastNeed = 2;
              return "�";
            }
          }
        }
      }
      function utf8FillLast(buf) {
        var p2 = this.lastTotal - this.lastNeed;
        var r = utf8CheckExtraBytes(this, buf);
        if (r !== void 0)
          return r;
        if (this.lastNeed <= buf.length) {
          buf.copy(this.lastChar, p2, 0, this.lastNeed);
          return this.lastChar.toString(this.encoding, 0, this.lastTotal);
        }
        buf.copy(this.lastChar, p2, 0, buf.length);
        this.lastNeed -= buf.length;
      }
      function utf8Text(buf, i) {
        var total = utf8CheckIncomplete(this, buf, i);
        if (!this.lastNeed)
          return buf.toString("utf8", i);
        this.lastTotal = total;
        var end = buf.length - (total - this.lastNeed);
        buf.copy(this.lastChar, 0, end);
        return buf.toString("utf8", i, end);
      }
      function utf8End(buf) {
        var r = buf && buf.length ? this.write(buf) : "";
        if (this.lastNeed)
          return r + "�";
        return r;
      }
      function utf16Text(buf, i) {
        if ((buf.length - i) % 2 === 0) {
          var r = buf.toString("utf16le", i);
          if (r) {
            var c = r.charCodeAt(r.length - 1);
            if (c >= 55296 && c <= 56319) {
              this.lastNeed = 2;
              this.lastTotal = 4;
              this.lastChar[0] = buf[buf.length - 2];
              this.lastChar[1] = buf[buf.length - 1];
              return r.slice(0, -1);
            }
          }
          return r;
        }
        this.lastNeed = 1;
        this.lastTotal = 2;
        this.lastChar[0] = buf[buf.length - 1];
        return buf.toString("utf16le", i, buf.length - 1);
      }
      function utf16End(buf) {
        var r = buf && buf.length ? this.write(buf) : "";
        if (this.lastNeed) {
          var end = this.lastTotal - this.lastNeed;
          return r + this.lastChar.toString("utf16le", 0, end);
        }
        return r;
      }
      function base64Text(buf, i) {
        var n2 = (buf.length - i) % 3;
        if (n2 === 0)
          return buf.toString("base64", i);
        this.lastNeed = 3 - n2;
        this.lastTotal = 3;
        if (n2 === 1) {
          this.lastChar[0] = buf[buf.length - 1];
        } else {
          this.lastChar[0] = buf[buf.length - 2];
          this.lastChar[1] = buf[buf.length - 1];
        }
        return buf.toString("base64", i, buf.length - n2);
      }
      function base64End(buf) {
        var r = buf && buf.length ? this.write(buf) : "";
        if (this.lastNeed)
          return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
        return r;
      }
      function simpleWrite(buf) {
        return buf.toString(this.encoding);
      }
      function simpleEnd(buf) {
        return buf && buf.length ? this.write(buf) : "";
      }
    }, { "safe-buffer": 117 }], 120: [function(require2, module3, exports3) {
      (function(setImmediate, clearImmediate) {
        var nextTick2 = require2("process/browser.js").nextTick;
        var apply = Function.prototype.apply;
        var slice = Array.prototype.slice;
        var immediateIds = {};
        var nextImmediateId = 0;
        exports3.setTimeout = function() {
          return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
        };
        exports3.setInterval = function() {
          return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
        };
        exports3.clearTimeout = exports3.clearInterval = function(timeout) {
          timeout.close();
        };
        function Timeout(id, clearFn) {
          this._id = id;
          this._clearFn = clearFn;
        }
        Timeout.prototype.unref = Timeout.prototype.ref = function() {
        };
        Timeout.prototype.close = function() {
          this._clearFn.call(window, this._id);
        };
        exports3.enroll = function(item, msecs) {
          clearTimeout(item._idleTimeoutId);
          item._idleTimeout = msecs;
        };
        exports3.unenroll = function(item) {
          clearTimeout(item._idleTimeoutId);
          item._idleTimeout = -1;
        };
        exports3._unrefActive = exports3.active = function(item) {
          clearTimeout(item._idleTimeoutId);
          var msecs = item._idleTimeout;
          if (msecs >= 0) {
            item._idleTimeoutId = setTimeout(function onTimeout() {
              if (item._onTimeout)
                item._onTimeout();
            }, msecs);
          }
        };
        exports3.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
          var id = nextImmediateId++;
          var args = arguments.length < 2 ? false : slice.call(arguments, 1);
          immediateIds[id] = true;
          nextTick2(function onNextTick() {
            if (immediateIds[id]) {
              if (args) {
                fn.apply(null, args);
              } else {
                fn.call(null);
              }
              exports3.clearImmediate(id);
            }
          });
          return id;
        };
        exports3.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
          delete immediateIds[id];
        };
      }).call(this, require2("timers").setImmediate, require2("timers").clearImmediate);
    }, { "process/browser.js": 101, "timers": 120 }], 121: [function(require2, module3, exports3) {
      var isPrototype = require2("../prototype/is");
      module3.exports = function(value) {
        if (typeof value !== "function")
          return false;
        if (!hasOwnProperty.call(value, "length"))
          return false;
        try {
          if (typeof value.length !== "number")
            return false;
          if (typeof value.call !== "function")
            return false;
          if (typeof value.apply !== "function")
            return false;
        } catch (error) {
          return false;
        }
        return !isPrototype(value);
      };
    }, { "../prototype/is": 128 }], 122: [function(require2, module3, exports3) {
      var isValue = require2("../value/is"), isObject2 = require2("../object/is"), stringCoerce = require2("../string/coerce"), toShortString = require2("./to-short-string");
      var resolveMessage = function(message, value) {
        return message.replace("%v", toShortString(value));
      };
      module3.exports = function(value, defaultMessage, inputOptions) {
        if (!isObject2(inputOptions))
          throw new TypeError(resolveMessage(defaultMessage, value));
        if (!isValue(value)) {
          if ("default" in inputOptions)
            return inputOptions["default"];
          if (inputOptions.isOptional)
            return null;
        }
        var errorMessage = stringCoerce(inputOptions.errorMessage);
        if (!isValue(errorMessage))
          errorMessage = defaultMessage;
        throw new TypeError(resolveMessage(errorMessage, value));
      };
    }, { "../object/is": 125, "../string/coerce": 129, "../value/is": 131, "./to-short-string": 124 }], 123: [function(require2, module3, exports3) {
      module3.exports = function(value) {
        try {
          return value.toString();
        } catch (error) {
          try {
            return String(value);
          } catch (error2) {
            return null;
          }
        }
      };
    }, {}], 124: [function(require2, module3, exports3) {
      var safeToString = require2("./safe-to-string");
      var reNewLine = /[\n\r\u2028\u2029]/g;
      module3.exports = function(value) {
        var string = safeToString(value);
        if (string === null)
          return "<Non-coercible to string value>";
        if (string.length > 100)
          string = string.slice(0, 99) + "…";
        string = string.replace(reNewLine, function(char) {
          switch (char) {
            case "\n":
              return "\\n";
            case "\r":
              return "\\r";
            case "\u2028":
              return "\\u2028";
            case "\u2029":
              return "\\u2029";
            default:
              throw new Error("Unexpected character");
          }
        });
        return string;
      };
    }, { "./safe-to-string": 123 }], 125: [function(require2, module3, exports3) {
      var isValue = require2("../value/is");
      var possibleTypes = {
        "object": true,
        "function": true,
        "undefined": true
        /* document.all */
      };
      module3.exports = function(value) {
        if (!isValue(value))
          return false;
        return hasOwnProperty.call(possibleTypes, typeof value);
      };
    }, { "../value/is": 131 }], 126: [function(require2, module3, exports3) {
      var resolveException = require2("../lib/resolve-exception"), is = require2("./is");
      module3.exports = function(value) {
        if (is(value))
          return value;
        return resolveException(value, "%v is not a plain function", arguments[1]);
      };
    }, { "../lib/resolve-exception": 122, "./is": 127 }], 127: [function(require2, module3, exports3) {
      var isFunction2 = require2("../function/is");
      var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;
      module3.exports = function(value) {
        if (!isFunction2(value))
          return false;
        if (classRe.test(functionToString.call(value)))
          return false;
        return true;
      };
    }, { "../function/is": 121 }], 128: [function(require2, module3, exports3) {
      var isObject2 = require2("../object/is");
      module3.exports = function(value) {
        if (!isObject2(value))
          return false;
        try {
          if (!value.constructor)
            return false;
          return value.constructor.prototype === value;
        } catch (error) {
          return false;
        }
      };
    }, { "../object/is": 125 }], 129: [function(require2, module3, exports3) {
      var isValue = require2("../value/is"), isObject2 = require2("../object/is");
      var objectToString2 = Object.prototype.toString;
      module3.exports = function(value) {
        if (!isValue(value))
          return null;
        if (isObject2(value)) {
          var valueToString = value.toString;
          if (typeof valueToString !== "function")
            return null;
          if (valueToString === objectToString2)
            return null;
        }
        try {
          return "" + value;
        } catch (error) {
          return null;
        }
      };
    }, { "../object/is": 125, "../value/is": 131 }], 130: [function(require2, module3, exports3) {
      var resolveException = require2("../lib/resolve-exception"), is = require2("./is");
      module3.exports = function(value) {
        if (is(value))
          return value;
        return resolveException(value, "Cannot use %v", arguments[1]);
      };
    }, { "../lib/resolve-exception": 122, "./is": 131 }], 131: [function(require2, module3, exports3) {
      var _undefined = void 0;
      module3.exports = function(value) {
        return value !== _undefined && value !== null;
      };
    }, {}], 132: [function(require2, module3, exports3) {
      var punycode = require2("punycode");
      var util = require2("./util");
      exports3.parse = urlParse;
      exports3.resolve = urlResolve;
      exports3.resolveObject = urlResolveObject;
      exports3.format = urlFormat;
      exports3.Url = Url;
      function Url() {
        this.protocol = null;
        this.slashes = null;
        this.auth = null;
        this.host = null;
        this.port = null;
        this.hostname = null;
        this.hash = null;
        this.search = null;
        this.query = null;
        this.pathname = null;
        this.path = null;
        this.href = null;
      }
      var protocolPattern = /^([a-z0-9.+-]+:)/i, portPattern = /:[0-9]*$/, simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, delims = ["<", ">", '"', "`", " ", "\r", "\n", "	"], unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims), autoEscape = ["'"].concat(unwise), nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape), hostEndingChars = ["/", "?", "#"], hostnameMaxLen = 255, hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/, hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, unsafeProtocol = {
        "javascript": true,
        "javascript:": true
      }, hostlessProtocol = {
        "javascript": true,
        "javascript:": true
      }, slashedProtocol = {
        "http": true,
        "https": true,
        "ftp": true,
        "gopher": true,
        "file": true,
        "http:": true,
        "https:": true,
        "ftp:": true,
        "gopher:": true,
        "file:": true
      }, querystring = require2("querystring");
      function urlParse(url, parseQueryString, slashesDenoteHost) {
        if (url && util.isObject(url) && url instanceof Url)
          return url;
        var u = new Url();
        u.parse(url, parseQueryString, slashesDenoteHost);
        return u;
      }
      Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
        if (!util.isString(url)) {
          throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
        }
        var queryIndex = url.indexOf("?"), splitter = queryIndex !== -1 && queryIndex < url.indexOf("#") ? "?" : "#", uSplit = url.split(splitter), slashRegex = /\\/g;
        uSplit[0] = uSplit[0].replace(slashRegex, "/");
        url = uSplit.join(splitter);
        var rest = url;
        rest = rest.trim();
        if (!slashesDenoteHost && url.split("#").length === 1) {
          var simplePath = simplePathPattern.exec(rest);
          if (simplePath) {
            this.path = rest;
            this.href = rest;
            this.pathname = simplePath[1];
            if (simplePath[2]) {
              this.search = simplePath[2];
              if (parseQueryString) {
                this.query = querystring.parse(this.search.substr(1));
              } else {
                this.query = this.search.substr(1);
              }
            } else if (parseQueryString) {
              this.search = "";
              this.query = {};
            }
            return this;
          }
        }
        var proto = protocolPattern.exec(rest);
        if (proto) {
          proto = proto[0];
          var lowerProto = proto.toLowerCase();
          this.protocol = lowerProto;
          rest = rest.substr(proto.length);
        }
        if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
          var slashes = rest.substr(0, 2) === "//";
          if (slashes && !(proto && hostlessProtocol[proto])) {
            rest = rest.substr(2);
            this.slashes = true;
          }
        }
        if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
          var hostEnd = -1;
          for (var i = 0; i < hostEndingChars.length; i++) {
            var hec = rest.indexOf(hostEndingChars[i]);
            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
              hostEnd = hec;
          }
          var auth, atSign;
          if (hostEnd === -1) {
            atSign = rest.lastIndexOf("@");
          } else {
            atSign = rest.lastIndexOf("@", hostEnd);
          }
          if (atSign !== -1) {
            auth = rest.slice(0, atSign);
            rest = rest.slice(atSign + 1);
            this.auth = decodeURIComponent(auth);
          }
          hostEnd = -1;
          for (var i = 0; i < nonHostChars.length; i++) {
            var hec = rest.indexOf(nonHostChars[i]);
            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
              hostEnd = hec;
          }
          if (hostEnd === -1)
            hostEnd = rest.length;
          this.host = rest.slice(0, hostEnd);
          rest = rest.slice(hostEnd);
          this.parseHost();
          this.hostname = this.hostname || "";
          var ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
          if (!ipv6Hostname) {
            var hostparts = this.hostname.split(/\./);
            for (var i = 0, l = hostparts.length; i < l; i++) {
              var part = hostparts[i];
              if (!part)
                continue;
              if (!part.match(hostnamePartPattern)) {
                var newpart = "";
                for (var j = 0, k = part.length; j < k; j++) {
                  if (part.charCodeAt(j) > 127) {
                    newpart += "x";
                  } else {
                    newpart += part[j];
                  }
                }
                if (!newpart.match(hostnamePartPattern)) {
                  var validParts = hostparts.slice(0, i);
                  var notHost = hostparts.slice(i + 1);
                  var bit = part.match(hostnamePartStart);
                  if (bit) {
                    validParts.push(bit[1]);
                    notHost.unshift(bit[2]);
                  }
                  if (notHost.length) {
                    rest = "/" + notHost.join(".") + rest;
                  }
                  this.hostname = validParts.join(".");
                  break;
                }
              }
            }
          }
          if (this.hostname.length > hostnameMaxLen) {
            this.hostname = "";
          } else {
            this.hostname = this.hostname.toLowerCase();
          }
          if (!ipv6Hostname) {
            this.hostname = punycode.toASCII(this.hostname);
          }
          var p2 = this.port ? ":" + this.port : "";
          var h = this.hostname || "";
          this.host = h + p2;
          this.href += this.host;
          if (ipv6Hostname) {
            this.hostname = this.hostname.substr(1, this.hostname.length - 2);
            if (rest[0] !== "/") {
              rest = "/" + rest;
            }
          }
        }
        if (!unsafeProtocol[lowerProto]) {
          for (var i = 0, l = autoEscape.length; i < l; i++) {
            var ae = autoEscape[i];
            if (rest.indexOf(ae) === -1)
              continue;
            var esc = encodeURIComponent(ae);
            if (esc === ae) {
              esc = escape(ae);
            }
            rest = rest.split(ae).join(esc);
          }
        }
        var hash = rest.indexOf("#");
        if (hash !== -1) {
          this.hash = rest.substr(hash);
          rest = rest.slice(0, hash);
        }
        var qm = rest.indexOf("?");
        if (qm !== -1) {
          this.search = rest.substr(qm);
          this.query = rest.substr(qm + 1);
          if (parseQueryString) {
            this.query = querystring.parse(this.query);
          }
          rest = rest.slice(0, qm);
        } else if (parseQueryString) {
          this.search = "";
          this.query = {};
        }
        if (rest)
          this.pathname = rest;
        if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
          this.pathname = "/";
        }
        if (this.pathname || this.search) {
          var p2 = this.pathname || "";
          var s2 = this.search || "";
          this.path = p2 + s2;
        }
        this.href = this.format();
        return this;
      };
      function urlFormat(obj) {
        if (util.isString(obj))
          obj = urlParse(obj);
        if (!(obj instanceof Url))
          return Url.prototype.format.call(obj);
        return obj.format();
      }
      Url.prototype.format = function() {
        var auth = this.auth || "";
        if (auth) {
          auth = encodeURIComponent(auth);
          auth = auth.replace(/%3A/i, ":");
          auth += "@";
        }
        var protocol = this.protocol || "", pathname = this.pathname || "", hash = this.hash || "", host2 = false, query = "";
        if (this.host) {
          host2 = auth + this.host;
        } else if (this.hostname) {
          host2 = auth + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]");
          if (this.port) {
            host2 += ":" + this.port;
          }
        }
        if (this.query && util.isObject(this.query) && Object.keys(this.query).length) {
          query = querystring.stringify(this.query);
        }
        var search = this.search || query && "?" + query || "";
        if (protocol && protocol.substr(-1) !== ":")
          protocol += ":";
        if (this.slashes || (!protocol || slashedProtocol[protocol]) && host2 !== false) {
          host2 = "//" + (host2 || "");
          if (pathname && pathname.charAt(0) !== "/")
            pathname = "/" + pathname;
        } else if (!host2) {
          host2 = "";
        }
        if (hash && hash.charAt(0) !== "#")
          hash = "#" + hash;
        if (search && search.charAt(0) !== "?")
          search = "?" + search;
        pathname = pathname.replace(/[?#]/g, function(match) {
          return encodeURIComponent(match);
        });
        search = search.replace("#", "%23");
        return protocol + host2 + pathname + search + hash;
      };
      function urlResolve(source, relative) {
        return urlParse(source, false, true).resolve(relative);
      }
      Url.prototype.resolve = function(relative) {
        return this.resolveObject(urlParse(relative, false, true)).format();
      };
      function urlResolveObject(source, relative) {
        if (!source)
          return relative;
        return urlParse(source, false, true).resolveObject(relative);
      }
      Url.prototype.resolveObject = function(relative) {
        if (util.isString(relative)) {
          var rel = new Url();
          rel.parse(relative, false, true);
          relative = rel;
        }
        var result = new Url();
        var tkeys = Object.keys(this);
        for (var tk = 0; tk < tkeys.length; tk++) {
          var tkey = tkeys[tk];
          result[tkey] = this[tkey];
        }
        result.hash = relative.hash;
        if (relative.href === "") {
          result.href = result.format();
          return result;
        }
        if (relative.slashes && !relative.protocol) {
          var rkeys = Object.keys(relative);
          for (var rk = 0; rk < rkeys.length; rk++) {
            var rkey = rkeys[rk];
            if (rkey !== "protocol")
              result[rkey] = relative[rkey];
          }
          if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
            result.path = result.pathname = "/";
          }
          result.href = result.format();
          return result;
        }
        if (relative.protocol && relative.protocol !== result.protocol) {
          if (!slashedProtocol[relative.protocol]) {
            var keys = Object.keys(relative);
            for (var v = 0; v < keys.length; v++) {
              var k = keys[v];
              result[k] = relative[k];
            }
            result.href = result.format();
            return result;
          }
          result.protocol = relative.protocol;
          if (!relative.host && !hostlessProtocol[relative.protocol]) {
            var relPath = (relative.pathname || "").split("/");
            while (relPath.length && !(relative.host = relPath.shift()))
              ;
            if (!relative.host)
              relative.host = "";
            if (!relative.hostname)
              relative.hostname = "";
            if (relPath[0] !== "")
              relPath.unshift("");
            if (relPath.length < 2)
              relPath.unshift("");
            result.pathname = relPath.join("/");
          } else {
            result.pathname = relative.pathname;
          }
          result.search = relative.search;
          result.query = relative.query;
          result.host = relative.host || "";
          result.auth = relative.auth;
          result.hostname = relative.hostname || relative.host;
          result.port = relative.port;
          if (result.pathname || result.search) {
            var p2 = result.pathname || "";
            var s2 = result.search || "";
            result.path = p2 + s2;
          }
          result.slashes = result.slashes || relative.slashes;
          result.href = result.format();
          return result;
        }
        var isSourceAbs = result.pathname && result.pathname.charAt(0) === "/", isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === "/", mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname, removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split("/") || [], relPath = relative.pathname && relative.pathname.split("/") || [], psychotic = result.protocol && !slashedProtocol[result.protocol];
        if (psychotic) {
          result.hostname = "";
          result.port = null;
          if (result.host) {
            if (srcPath[0] === "")
              srcPath[0] = result.host;
            else
              srcPath.unshift(result.host);
          }
          result.host = "";
          if (relative.protocol) {
            relative.hostname = null;
            relative.port = null;
            if (relative.host) {
              if (relPath[0] === "")
                relPath[0] = relative.host;
              else
                relPath.unshift(relative.host);
            }
            relative.host = null;
          }
          mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "");
        }
        if (isRelAbs) {
          result.host = relative.host || relative.host === "" ? relative.host : result.host;
          result.hostname = relative.hostname || relative.hostname === "" ? relative.hostname : result.hostname;
          result.search = relative.search;
          result.query = relative.query;
          srcPath = relPath;
        } else if (relPath.length) {
          if (!srcPath)
            srcPath = [];
          srcPath.pop();
          srcPath = srcPath.concat(relPath);
          result.search = relative.search;
          result.query = relative.query;
        } else if (!util.isNullOrUndefined(relative.search)) {
          if (psychotic) {
            result.hostname = result.host = srcPath.shift();
            var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
            if (authInHost) {
              result.auth = authInHost.shift();
              result.host = result.hostname = authInHost.shift();
            }
          }
          result.search = relative.search;
          result.query = relative.query;
          if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
            result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
          }
          result.href = result.format();
          return result;
        }
        if (!srcPath.length) {
          result.pathname = null;
          if (result.search) {
            result.path = "/" + result.search;
          } else {
            result.path = null;
          }
          result.href = result.format();
          return result;
        }
        var last = srcPath.slice(-1)[0];
        var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === "." || last === "..") || last === "";
        var up = 0;
        for (var i = srcPath.length; i >= 0; i--) {
          last = srcPath[i];
          if (last === ".") {
            srcPath.splice(i, 1);
          } else if (last === "..") {
            srcPath.splice(i, 1);
            up++;
          } else if (up) {
            srcPath.splice(i, 1);
            up--;
          }
        }
        if (!mustEndAbs && !removeAllDots) {
          for (; up--; up) {
            srcPath.unshift("..");
          }
        }
        if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {
          srcPath.unshift("");
        }
        if (hasTrailingSlash && srcPath.join("/").substr(-1) !== "/") {
          srcPath.push("");
        }
        var isAbsolute = srcPath[0] === "" || srcPath[0] && srcPath[0].charAt(0) === "/";
        if (psychotic) {
          result.hostname = result.host = isAbsolute ? "" : srcPath.length ? srcPath.shift() : "";
          var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
          if (authInHost) {
            result.auth = authInHost.shift();
            result.host = result.hostname = authInHost.shift();
          }
        }
        mustEndAbs = mustEndAbs || result.host && srcPath.length;
        if (mustEndAbs && !isAbsolute) {
          srcPath.unshift("");
        }
        if (!srcPath.length) {
          result.pathname = null;
          result.path = null;
        } else {
          result.pathname = srcPath.join("/");
        }
        if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
          result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
        }
        result.auth = relative.auth || result.auth;
        result.slashes = result.slashes || relative.slashes;
        result.href = result.format();
        return result;
      };
      Url.prototype.parseHost = function() {
        var host2 = this.host;
        var port = portPattern.exec(host2);
        if (port) {
          port = port[0];
          if (port !== ":") {
            this.port = port.substr(1);
          }
          host2 = host2.substr(0, host2.length - port.length);
        }
        if (host2)
          this.hostname = host2;
      };
    }, { "./util": 133, "punycode": 102, "querystring": 105 }], 133: [function(require2, module3, exports3) {
      module3.exports = {
        isString: function(arg) {
          return typeof arg === "string";
        },
        isObject: function(arg) {
          return typeof arg === "object" && arg !== null;
        },
        isNull: function(arg) {
          return arg === null;
        },
        isNullOrUndefined: function(arg) {
          return arg == null;
        }
      };
    }, {}], 134: [function(require2, module3, exports3) {
      (function(global2) {
        module3.exports = deprecate;
        function deprecate(fn, msg) {
          if (config("noDeprecation")) {
            return fn;
          }
          var warned = false;
          function deprecated() {
            if (!warned) {
              if (config("throwDeprecation")) {
                throw new Error(msg);
              } else if (config("traceDeprecation")) {
                console.trace(msg);
              } else {
                console.warn(msg);
              }
              warned = true;
            }
            return fn.apply(this, arguments);
          }
          return deprecated;
        }
        function config(name) {
          try {
            if (!global2.localStorage)
              return false;
          } catch (_) {
            return false;
          }
          var val = global2.localStorage[name];
          if (null == val)
            return false;
          return String(val).toLowerCase() === "true";
        }
      }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}], 135: [function(require2, module3, exports3) {
      if (typeof Object.create === "function") {
        module3.exports = function inherits(ctor, superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        };
      } else {
        module3.exports = function inherits(ctor, superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        };
      }
    }, {}], 136: [function(require2, module3, exports3) {
      module3.exports = function isBuffer(arg) {
        return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
      };
    }, {}], 137: [function(require2, module3, exports3) {
      (function(process, global2) {
        var formatRegExp = /%[sdj%]/g;
        exports3.format = function(f2) {
          if (!isString2(f2)) {
            var objects = [];
            for (var i = 0; i < arguments.length; i++) {
              objects.push(inspect(arguments[i]));
            }
            return objects.join(" ");
          }
          var i = 1;
          var args = arguments;
          var len = args.length;
          var str = String(f2).replace(formatRegExp, function(x2) {
            if (x2 === "%%")
              return "%";
            if (i >= len)
              return x2;
            switch (x2) {
              case "%s":
                return String(args[i++]);
              case "%d":
                return Number(args[i++]);
              case "%j":
                try {
                  return JSON.stringify(args[i++]);
                } catch (_) {
                  return "[Circular]";
                }
              default:
                return x2;
            }
          });
          for (var x = args[i]; i < len; x = args[++i]) {
            if (isNull(x) || !isObject2(x)) {
              str += " " + x;
            } else {
              str += " " + inspect(x);
            }
          }
          return str;
        };
        exports3.deprecate = function(fn, msg) {
          if (isUndefined(global2.process)) {
            return function() {
              return exports3.deprecate(fn, msg).apply(this, arguments);
            };
          }
          if (process.noDeprecation === true) {
            return fn;
          }
          var warned = false;
          function deprecated() {
            if (!warned) {
              if (process.throwDeprecation) {
                throw new Error(msg);
              } else if (process.traceDeprecation) {
                console.trace(msg);
              } else {
                console.error(msg);
              }
              warned = true;
            }
            return fn.apply(this, arguments);
          }
          return deprecated;
        };
        var debugs = {};
        var debugEnviron;
        exports3.debuglog = function(set2) {
          if (isUndefined(debugEnviron))
            debugEnviron = process.env.NODE_DEBUG || "";
          set2 = set2.toUpperCase();
          if (!debugs[set2]) {
            if (new RegExp("\\b" + set2 + "\\b", "i").test(debugEnviron)) {
              var pid = process.pid;
              debugs[set2] = function() {
                var msg = exports3.format.apply(exports3, arguments);
                console.error("%s %d: %s", set2, pid, msg);
              };
            } else {
              debugs[set2] = function() {
              };
            }
          }
          return debugs[set2];
        };
        function inspect(obj, opts) {
          var ctx = {
            seen: [],
            stylize: stylizeNoColor
          };
          if (arguments.length >= 3)
            ctx.depth = arguments[2];
          if (arguments.length >= 4)
            ctx.colors = arguments[3];
          if (isBoolean2(opts)) {
            ctx.showHidden = opts;
          } else if (opts) {
            exports3._extend(ctx, opts);
          }
          if (isUndefined(ctx.showHidden))
            ctx.showHidden = false;
          if (isUndefined(ctx.depth))
            ctx.depth = 2;
          if (isUndefined(ctx.colors))
            ctx.colors = false;
          if (isUndefined(ctx.customInspect))
            ctx.customInspect = true;
          if (ctx.colors)
            ctx.stylize = stylizeWithColor;
          return formatValue(ctx, obj, ctx.depth);
        }
        exports3.inspect = inspect;
        inspect.colors = {
          "bold": [1, 22],
          "italic": [3, 23],
          "underline": [4, 24],
          "inverse": [7, 27],
          "white": [37, 39],
          "grey": [90, 39],
          "black": [30, 39],
          "blue": [34, 39],
          "cyan": [36, 39],
          "green": [32, 39],
          "magenta": [35, 39],
          "red": [31, 39],
          "yellow": [33, 39]
        };
        inspect.styles = {
          "special": "cyan",
          "number": "yellow",
          "boolean": "yellow",
          "undefined": "grey",
          "null": "bold",
          "string": "green",
          "date": "magenta",
          // "name": intentionally not styling
          "regexp": "red"
        };
        function stylizeWithColor(str, styleType) {
          var style = inspect.styles[styleType];
          if (style) {
            return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
          } else {
            return str;
          }
        }
        function stylizeNoColor(str, styleType) {
          return str;
        }
        function arrayToHash(array) {
          var hash = {};
          array.forEach(function(val, idx) {
            hash[val] = true;
          });
          return hash;
        }
        function formatValue(ctx, value, recurseTimes) {
          if (ctx.customInspect && value && isFunction2(value.inspect) && // Filter out the util module, it's inspect function is special
          value.inspect !== exports3.inspect && // Also filter out any prototype objects using the circular check.
          !(value.constructor && value.constructor.prototype === value)) {
            var ret = value.inspect(recurseTimes, ctx);
            if (!isString2(ret)) {
              ret = formatValue(ctx, ret, recurseTimes);
            }
            return ret;
          }
          var primitive = formatPrimitive(ctx, value);
          if (primitive) {
            return primitive;
          }
          var keys = Object.keys(value);
          var visibleKeys = arrayToHash(keys);
          if (ctx.showHidden) {
            keys = Object.getOwnPropertyNames(value);
          }
          if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
            return formatError(value);
          }
          if (keys.length === 0) {
            if (isFunction2(value)) {
              var name = value.name ? ": " + value.name : "";
              return ctx.stylize("[Function" + name + "]", "special");
            }
            if (isRegExp(value)) {
              return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
            }
            if (isDate(value)) {
              return ctx.stylize(Date.prototype.toString.call(value), "date");
            }
            if (isError(value)) {
              return formatError(value);
            }
          }
          var base = "", array = false, braces = ["{", "}"];
          if (isArray2(value)) {
            array = true;
            braces = ["[", "]"];
          }
          if (isFunction2(value)) {
            var n2 = value.name ? ": " + value.name : "";
            base = " [Function" + n2 + "]";
          }
          if (isRegExp(value)) {
            base = " " + RegExp.prototype.toString.call(value);
          }
          if (isDate(value)) {
            base = " " + Date.prototype.toUTCString.call(value);
          }
          if (isError(value)) {
            base = " " + formatError(value);
          }
          if (keys.length === 0 && (!array || value.length == 0)) {
            return braces[0] + base + braces[1];
          }
          if (recurseTimes < 0) {
            if (isRegExp(value)) {
              return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
            } else {
              return ctx.stylize("[Object]", "special");
            }
          }
          ctx.seen.push(value);
          var output;
          if (array) {
            output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
          } else {
            output = keys.map(function(key) {
              return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
            });
          }
          ctx.seen.pop();
          return reduceToSingleString(output, base, braces);
        }
        function formatPrimitive(ctx, value) {
          if (isUndefined(value))
            return ctx.stylize("undefined", "undefined");
          if (isString2(value)) {
            var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
            return ctx.stylize(simple, "string");
          }
          if (isNumber(value))
            return ctx.stylize("" + value, "number");
          if (isBoolean2(value))
            return ctx.stylize("" + value, "boolean");
          if (isNull(value))
            return ctx.stylize("null", "null");
        }
        function formatError(value) {
          return "[" + Error.prototype.toString.call(value) + "]";
        }
        function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
          var output = [];
          for (var i = 0, l = value.length; i < l; ++i) {
            if (hasOwnProperty2(value, String(i))) {
              output.push(formatProperty(
                ctx,
                value,
                recurseTimes,
                visibleKeys,
                String(i),
                true
              ));
            } else {
              output.push("");
            }
          }
          keys.forEach(function(key) {
            if (!key.match(/^\d+$/)) {
              output.push(formatProperty(
                ctx,
                value,
                recurseTimes,
                visibleKeys,
                key,
                true
              ));
            }
          });
          return output;
        }
        function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
          var name, str, desc;
          desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
          if (desc.get) {
            if (desc.set) {
              str = ctx.stylize("[Getter/Setter]", "special");
            } else {
              str = ctx.stylize("[Getter]", "special");
            }
          } else {
            if (desc.set) {
              str = ctx.stylize("[Setter]", "special");
            }
          }
          if (!hasOwnProperty2(visibleKeys, key)) {
            name = "[" + key + "]";
          }
          if (!str) {
            if (ctx.seen.indexOf(desc.value) < 0) {
              if (isNull(recurseTimes)) {
                str = formatValue(ctx, desc.value, null);
              } else {
                str = formatValue(ctx, desc.value, recurseTimes - 1);
              }
              if (str.indexOf("\n") > -1) {
                if (array) {
                  str = str.split("\n").map(function(line) {
                    return "  " + line;
                  }).join("\n").substr(2);
                } else {
                  str = "\n" + str.split("\n").map(function(line) {
                    return "   " + line;
                  }).join("\n");
                }
              }
            } else {
              str = ctx.stylize("[Circular]", "special");
            }
          }
          if (isUndefined(name)) {
            if (array && key.match(/^\d+$/)) {
              return str;
            }
            name = JSON.stringify("" + key);
            if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
              name = name.substr(1, name.length - 2);
              name = ctx.stylize(name, "name");
            } else {
              name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
              name = ctx.stylize(name, "string");
            }
          }
          return name + ": " + str;
        }
        function reduceToSingleString(output, base, braces) {
          var length = output.reduce(function(prev, cur) {
            if (cur.indexOf("\n") >= 0)
              ;
            return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
          }, 0);
          if (length > 60) {
            return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
          }
          return braces[0] + base + " " + output.join(", ") + " " + braces[1];
        }
        function isArray2(ar) {
          return Array.isArray(ar);
        }
        exports3.isArray = isArray2;
        function isBoolean2(arg) {
          return typeof arg === "boolean";
        }
        exports3.isBoolean = isBoolean2;
        function isNull(arg) {
          return arg === null;
        }
        exports3.isNull = isNull;
        function isNullOrUndefined(arg) {
          return arg == null;
        }
        exports3.isNullOrUndefined = isNullOrUndefined;
        function isNumber(arg) {
          return typeof arg === "number";
        }
        exports3.isNumber = isNumber;
        function isString2(arg) {
          return typeof arg === "string";
        }
        exports3.isString = isString2;
        function isSymbol2(arg) {
          return typeof arg === "symbol";
        }
        exports3.isSymbol = isSymbol2;
        function isUndefined(arg) {
          return arg === void 0;
        }
        exports3.isUndefined = isUndefined;
        function isRegExp(re) {
          return isObject2(re) && objectToString2(re) === "[object RegExp]";
        }
        exports3.isRegExp = isRegExp;
        function isObject2(arg) {
          return typeof arg === "object" && arg !== null;
        }
        exports3.isObject = isObject2;
        function isDate(d) {
          return isObject2(d) && objectToString2(d) === "[object Date]";
        }
        exports3.isDate = isDate;
        function isError(e2) {
          return isObject2(e2) && (objectToString2(e2) === "[object Error]" || e2 instanceof Error);
        }
        exports3.isError = isError;
        function isFunction2(arg) {
          return typeof arg === "function";
        }
        exports3.isFunction = isFunction2;
        function isPrimitive(arg) {
          return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
          typeof arg === "undefined";
        }
        exports3.isPrimitive = isPrimitive;
        exports3.isBuffer = require2("./support/isBuffer");
        function objectToString2(o2) {
          return Object.prototype.toString.call(o2);
        }
        function pad(n2) {
          return n2 < 10 ? "0" + n2.toString(10) : n2.toString(10);
        }
        var months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ];
        function timestamp() {
          var d = /* @__PURE__ */ new Date();
          var time = [
            pad(d.getHours()),
            pad(d.getMinutes()),
            pad(d.getSeconds())
          ].join(":");
          return [d.getDate(), months[d.getMonth()], time].join(" ");
        }
        exports3.log = function() {
          console.log("%s - %s", timestamp(), exports3.format.apply(exports3, arguments));
        };
        exports3.inherits = require2("inherits");
        exports3._extend = function(origin, add2) {
          if (!add2 || !isObject2(add2))
            return origin;
          var keys = Object.keys(add2);
          var i = keys.length;
          while (i--) {
            origin[keys[i]] = add2[keys[i]];
          }
          return origin;
        };
        function hasOwnProperty2(obj, prop) {
          return Object.prototype.hasOwnProperty.call(obj, prop);
        }
      }).call(this, require2("_process"), typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, { "./support/isBuffer": 136, "_process": 101, "inherits": 135 }], 138: [function(require2, module3, exports3) {
      module3.exports = wrappy;
      function wrappy(fn, cb) {
        if (fn && cb)
          return wrappy(fn)(cb);
        if (typeof fn !== "function")
          throw new TypeError("need wrapper function");
        Object.keys(fn).forEach(function(k) {
          wrapper[k] = fn[k];
        });
        return wrapper;
        function wrapper() {
          var args = new Array(arguments.length);
          for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
          }
          var ret = fn.apply(this, args);
          var cb2 = args[args.length - 1];
          if (typeof ret === "function" && ret !== cb2) {
            Object.keys(cb2).forEach(function(k) {
              ret[k] = cb2[k];
            });
          }
          return ret;
        }
      }
    }, {}], 139: [function(require2, module3, exports3) {
      module3.exports = function() {
        throw new Error(
          "ws does not work in the browser. Browser clients must use the native WebSocket object"
        );
      };
    }, {}], 140: [function(require2, module3, exports3) {
      module3.exports = extend2;
      var hasOwnProperty2 = Object.prototype.hasOwnProperty;
      function extend2() {
        var target = {};
        for (var i = 0; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (hasOwnProperty2.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      }
    }, {}] }, {}, [9])(9);
  });
})(mqtt$1);
const mqtt = mqttExports;
exports._export_sfc = _export_sfc;
exports.createPinia = createPinia;
exports.createSSRApp = createSSRApp;
exports.defineStore = defineStore;
exports.e = e;
exports.f = f;
exports.index = index$1;
exports.index$1 = index;
exports.initVueI18n = initVueI18n;
exports.mqtt = mqtt;
exports.n = n;
exports.o = o;
exports.p = p;
exports.resolveComponent = resolveComponent;
exports.s = s;
exports.sr = sr;
exports.t = t;

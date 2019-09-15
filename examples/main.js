import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import hljs from "highlight.js";

//导入组件
import YuanUI from "../packages/index";
import DemoBlock from "./components/DemoBlock.vue";

import "~/theme-chalk/src/index.scss";
import "./assets/styles/common.scss";

Vue.component("DemoBlock", DemoBlock);

router.afterEach(route => {
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll("pre code:not(.hljs)");
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
});
//注册组件
Vue.use(YuanUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

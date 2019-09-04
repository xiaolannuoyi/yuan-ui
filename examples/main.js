import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//导入组件
import YuanUI from "../packages/index";
//注册组件
Vue.use(YuanUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

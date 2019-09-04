// 为组件提供 install 方法，供组件对外按需引入
import YuanTest from "./src/test";
YuanTest.install = Vue => {
  Vue.component(YuanTest.name, YuanTest);
};
export default YuanTest;

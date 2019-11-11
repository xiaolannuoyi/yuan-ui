import { once, on } from "src/utils/dom";

export default {
  bind(el, binding, vnode) {
    //el dom
    //binding 一个对象
    //vnode Vue编译生成的虚拟节点
    let interval = null;
    let startTime;
    const handler = () => vnode.context[binding.expression].apply(); // 相当于组件内的 decrease / increase 方法
    const clear = () => {
      if (Date.now() - startTime < 100) {
        handler();
      }
      clearInterval(interval);
      interval = null;
    };

    on(el, "mousedown", e => {
      if (e.button !== 0) return;
      startTime = Date.now();
      once(document, "mouseup", clear);
      clearInterval(interval);
      interval = setInterval(handler, 100);
    });
  }
};

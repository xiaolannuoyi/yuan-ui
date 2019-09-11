import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "test",
      // component: r => require.ensure([], () => r(require(`@/docs/test.md`)))
      component: () => import("@/docs/test.md")
    }
  ]
});

import Vue from "vue";
import Router from "vue-router";

import navConfig from "./nav.config";

Vue.use(Router);
const docsRoutefun = navConfig => {
  let route = [];
  navConfig[0].groups.forEach(group => {
    group.list.forEach(nav => {
      route.push({
        path: nav.path,
        name: nav.path,
        component: r =>
          require.ensure([], () => r(require(`@/docs${nav.path}.md`)))
      });
    });
  });
  return route;
};
let docsRoute = docsRoutefun(navConfig);
docsRoute = docsRoute.concat([
  {
    path: "/",
    redirect: "/test",
    name: "test",
    component: r => require.ensure([], () => r(require(`@/docs/test.md`)))
    // component: () => import("@/docs/test.md")
  }
]);
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: docsRoute
});

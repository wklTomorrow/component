import Vue from "vue";
import WrapMain from "./main/wrapMain.vue";
import VueRouter from "vue-router";
import { components } from "./config";
import "./common.less";
import store from "./vue/store/index";
Vue.use(VueRouter);
const router = new VueRouter({
  routes: components.map(({ path, name, component, children }) => {
    return {
      path,
      name,
      component,
      children,
    };
  }),
});
new Vue({
  router,
  store,
  render: (h) => h(WrapMain),
}).$mount("#app");

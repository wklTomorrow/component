import Vue from "vue";
import Loading from "./loading.vue";
const Load = {
  _instance: null,
  _init() {
    const Wrap = Vue.extend(Loading);
    Load._instance = new Wrap();
    Load._instance.$mount();
    document.body.appendChild(Load._instance.$el);
  },
  show() {
    Load._instance && Load._instance.showThis();
  },
  hide() {
    Load._instance && Load._instance.hide();
  },
};
Load._init();
export { Load };

import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const store = new Vuex.Store({
  state() {
    return {
      vuex: {
        count: 0,
      },
    };
  },
  mutations: {
    increment(state, obj) {
      state.vuex = obj;
    },
  },
  actions: {
    add({ commit }, num) {
      commit("increment", { count: num, type: "add" });
    },
    decrease({ commit }, num) {
      commit("increment", { count: num, type: "decrease" });
    },
  },
});

export default store;

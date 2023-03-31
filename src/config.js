export const vue = [
  {
    name: "折叠面板",
    path: "expand",
    component: () => import("/src/vue/component/ExpandCollapse/index.vue"),
  },
  {
    name: "确认弹窗",
    path: "modal",
    component: () => import("/src/vue/component/modal/index.vue"),
  },
  {
    name: "pop弹层",
    path: "pop",
    component: () => import("/src/vue/component/pop/index.vue"),
  },
  {
    name: "表情",
    path: "emoji",
    component: () => import("/src/vue/component/emoji/index.vue"),
  },
  {
    name: "拖拽",
    path: "draggable",
    component: () => import("/src/vue/component/draggable/index.vue"),
  },
  {
    name: "testVue",
    path: "test",
    component: () => import("/src/vue/component/test/index.vue"),
  },
  {
    name: "vuex",
    path: "vuex",
    component: () => import("/src/vue/component/vuex/index.vue"),
  },
];

export const react = [
  {
    name: "a",
    path: "/react.html#/a",
    component: "a",
    route: "/a",
  },
  {
    name: "b",
    path: "/react.html#/b",
    component: "b",
    route: "/b",
  },
  {
    name: "dragable",
    path: "/react.html#/dragable",
    component: "dragable",
    route: "/dragable",
  },
  {
    name: "webComponent",
    path: "/react.html#/webComponent",
    component: "webComponent",
    route: "/webComponent",
  },
];

export const components = [
  {
    name: "html",
    component: () => import("/src/main/container.vue"),
    path: "/html",
    children: [
      {
        path: "*",
      },
    ],
  },
  {
    name: "vue",
    path: "/vue",
    component: () => import("/src/main/container.vue"),
    children: vue,
  },
  {
    name: "react",
    component: () => import("/src/main/container.vue"),
    path: "/react",
    children: [
      {
        path: "*",
      },
    ],
  },
];

export const html = [
  {
    name: "测试页面",
    path: "/test.html",
  },
  {
    name: "tinyVue",
    path: "/vue.html",
  },
  {
    name: "swiper",
    path: "/swiper.html",
  },
  {
    name: "watermark",
    path: "/watermark.html",
  },
  {
    name: "展开与折叠",
    path: "/collapse.html",
  },
  {
    name: "下拉刷新",
    path: "/pullRefresh.html",
  },
  {
    name: "折叠面板",
    path: "/accordion.html",
  },
  {
    name: "切换tab",
    path: "/scrollItem.html",
  },
  {
    name: "粘性布局",
    path: "/sticky.html",
  },
  {
    name: "锚点",
    path: "/anchor.html",
  },
  {
    name: "测试maskImage",
    path: "/maskImage.html",
  },
  {
    name: "love",
    path: "/love.html",
  },
  {
    name: "heart",
    path: "/heart.html",
  },
  {
    name: "drag",
    path: "/drag.html",
  },
  {
    name: "webComponents",
    path: "/webComponents.html",
  },
];

export default {
  html,
  vue,
  react,
};

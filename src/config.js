import A from "/src/react/components/a";
import B from "/src/react/components/b";
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
];

export const react = [
  {
    name: "a",
    path: "/react.html#/a",
    component: A,
    route: "/a",
  },
  {
    name: "b",
    path: "/react.html#/b",
    component: B,
    route: "/b",
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
];

export default {
  html,
  vue,
  react,
};

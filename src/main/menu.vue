<template>
  <div class="menu">
    <div class="menu-item">组件库</div>
    <template v-for="(item, index) in menu">
      <div
        class="menu-item type"
        :class="{ active: active == item.key }"
        :key="index"
        @click="handleSelect(item)"
      >
        {{ item.name }}
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menu: [
        {
          name: "原生JS",
          key: "html",
          path: "/html",
        },
        {
          name: "vue",
          key: "vue",
          path: "/vue",
        },
        {
          name: "react",
          key: "react",
          path: "/react",
        },
      ],
      active: '',
    };
  },
  mounted() {
    this.active = window.location.hash.split("/")[1];
  },
  methods: {
    handleSelect({ key, path }) {
      this.active = key;
      this.$router.push(path);
    },
  },
};
</script>

<style lang="less" scoped>
.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background: #001528;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 3%), 0 1px 6px -1px rgb(0 0 0 / 2%),
    0 2px 4px 0 rgb(0 0 0 / 2%);
  display: flex;
  font-size: 18px;
  font-weight: bold;
  color: hsla(0, 0%, 100%, 0.65);
  .type {
    cursor: pointer;

    &:hover {
      background: #4569d4;
      color: #ffffff;
    }
  }
  .active {
    background: #4569d4;
    color: #ffffff;
  }
  .menu-item {
    line-height: 64px;
    padding: 0 32px;
  }
}
</style>

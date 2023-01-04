<template>
  <div class="container">
    <Menu />
    <div class="body">
      <router-view />
    </div>
  </div>
</template>
<script>
import Menu from "./menu.vue";
import Container from "./container.vue";
export default {
  components: {
    Menu,
    Container,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.container {
  padding-top: 64px;
  box-sizing: border-box;
  background: #f2f4f5;
  padding: 84px 20px 20px 20px;
  .body {
    min-height: calc(100vh - 104px);
    border-radius: 20px;
    background: #ffffff;
    display: flex;
    width: 100%;
  }
}
</style>

<template>
  <div class="content">
    <div class="content-nav">
      <template v-for="(item, index) in com">
        <div
          :key="index"
          class="items"
          @click="handleClick(item)"
          :class="{ active: active === item.name || active === item.path }"
        >
          {{ item.name }}
        </div>
      </template>
    </div>
    <div class="detail">
      <template v-if="showIframe">
        <iframe :src="iframePath"></iframe>
        <router-view></router-view>
      </template>
      <router-view v-else></router-view>
    </div>
  </div>
</template>

<script>
import component from "../config";
export default {
  data() {
    return {
      component,
      active: "",
      path: "",
      com: [],
      showIframe: false,
      iframePath: "",
      type: "",
    };
  },
  mounted() {
    this.active = decodeURI(window.location.hash.split("/")[2]);
    this.path = this.$route.path;
    this.getNavList(this.path);
  },
  methods: {
    handleClick({ name, path }) {
      this.active = name;
      if (this.path.includes("vue")) {
        this.showIframe = false;
        this.$router.push(`/${this.type}/${path}`);
        return;
      }
      this.showIframe = true;
      this.iframePath = [window.location.origin, `/${this.type}`, path].join(
        ""
      );
      this.$router.push(`/${this.type}/${name}`);
    },
    getNavList(newVal) {
      this.type = newVal.split("/")[1];
      this.com = this.component[this.type];
      this.path = newVal;
      const curPath = this.com.find(({ name }) => name === this.active);
      if (!this.path.includes("vue") && curPath) {
        this.showIframe = true;
        this.iframePath = [
          window.location.origin,
          `/${this.type}`,
          curPath.path,
        ].join("");
      }
    },
  },
  watch: {
    "$route.path": function (newVal, oldVal) {
      this.getNavList(newVal);
      const newType = newVal.split("/")[1];
      const oldType = oldVal.split("/")[1];
      if (newType !== oldType) {
        this.iframePath = "";
      }
    },
    com: {
      deep: true,
      handler(val, oldVal) {
        if (val.length && oldVal.length) {
          this.active = "";
        }
      },
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  display: flex;
  &-nav {
    width: 250px;
    padding: 20px;
    box-sizing: border-box;
    box-sizing: border-box;
    border-right: 1px solid lightgray;

    .items {
      height: 32px;
      cursor: pointer;
    }
  }
  .detail {
    padding: 20px;
    flex: 1;
  }
  .active {
    color: #4569d4;
  }
}
iframe {
  border: none;
  width: 100%;
  min-height: 100%;
}
</style>

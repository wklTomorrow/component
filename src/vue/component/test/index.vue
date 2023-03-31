<template>
  <div>
    {{ title }}
    <Child />
    <button @click="onShowDialog">show</button>
    <button @click="onHideDialog">hide</button>
  </div>
</template>

<script>
import Child from "./children.vue";
import { Load } from "./loadWrap";
export default {
  components: {
    Child,
  },
  data() {
    return {
      title: "明天更好",
    };
  },
  async created() {
    await this.init();
    this.title = "hello world";
    console.log("create");
  },
  mounted() {
    console.log("mounted");
  },
  methods: {
    async init() {
      await new Promise((r, j) => {
        setTimeout(() => {
          r();
        }, 1000);
      });
    },
    onShowDialog() {
      console.log("show");
      Load.show();
    },
    onHideDialog() {
      console.log("hide");
      Load.hide();
    },
  },
};
</script>

<style></style>

<template>
  <div>
    {{ title }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "hello",
    };
  },
  async created() {
    await this.sleep();
    this.title = "hello world";
  },
  methods: {
    async sleep() {
      await new Promise((r, j) => {
        setTimeout(() => {
          r();
        }, 10000);
      });
    },
  },
};
</script>

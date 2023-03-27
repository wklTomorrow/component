<template>
  <div v-if="show" class="wrap">hello world</div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    hide() {
      this.show = false;
    },
    showThis() {
      this.show = true;
    },
  },
};
</script>
<style scoped>
.wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: lightblue;
}
</style>

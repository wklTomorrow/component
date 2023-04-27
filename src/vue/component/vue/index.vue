<template>
  <div class="wrap">
    <transition name="fade">
      <div class="content" v-if="show">
        <p>
          Math trial lessons are available on the Creta Class app, and after you
          purchase the lessons, you need to download the app to view your study
          schedule at Learn tab. Math trial lessons are available on the Creta
          Class app, and after you purchase the lessons, you need to download
          the app to view your study schedule at Learn tab.
        </p>
        <p>
          Math trial lessons are available on the Creta Class app, and after you
          purchase the lessons, you need to download the app to view your study
          schedule at Learn tab. Math trial lessons are available on the Creta
          Class app, and after you purchase the lessons, you need to download
          the app to view your study schedule at Learn tab.
        </p>
      </div>
    </transition>
    <button @click="handleClick">click</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
    };
  },
  methods: {
    handleClick() {
      this.show = !this.show;
    },
  },
};
</script>
<style lang="less" scoped>
.fade-enter,
.fade-leave-to {
  max-height: 0;
}

.fade-enter-to,
.fade-leave {
  max-height: 500px;
}

.fade-enter-active {
  transition: all 0.8s linear 0s;
}

.fade-leave-active {
  transition: all 0.5s ease 0s;
}

.wrap {
  transition: all 1s ease;
  overflow: hidden;
}
.content {
}
</style>

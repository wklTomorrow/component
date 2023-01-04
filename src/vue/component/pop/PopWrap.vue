<template>
  <div class="modal">
    <div
      class="mask"
      :class="{ 'modal-fade': showModal }"
      @click.stop="handleMaskClick"
    ></div>
    <div
      class="top"
      :style="{ height: topHeight }"
      @click.stop="handleMaskClick"
    >
      <slot name="top"></slot>
    </div>
    <div
      class="content"
      :class="{ 'show-content': showModal }"
      @click.stop
      ref="content"
    >
      <div class="close" @click="handleClose" v-if="showCloseIcon">
        <img :src="close" />
      </div>
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script>
import close from "../../../asset/close.png";
export default {
  props: {
    maskClose: {
      type: Boolean,
      default: true,
    },
    showCloseIcon: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showModal: false,
      timer: null,
      close,
      movingTime: 200,
      paddingBottom: 0,
      containerHeight: 0,
    };
  },
  mounted() {
    this.timer = setTimeout(() => {
      this.showModal = true;
      this.clearTimer();
    });
    this.$nextTick(() => {
      const { offsetHeight } = this.$refs.content;
      const paddingBottom = window?.getComputedStyle(this.$refs.content)[
        "padding-bottom"
      ];
      this.paddingBottom = parseFloat(paddingBottom).toFixed(4);
      this.containerHeight = offsetHeight;
    });
  },
  destroyed() {
    this.clearTimer();
  },
  computed: {
    topHeight() {
      return `calc(100vh - ${this.paddingBottom}px - ${this.containerHeight}px)`;
    },
  },
  methods: {
    handleClose() {
      this.showModal = false;
      this.timer = setTimeout(() => {
        this.$emit("handleClose", "showShareContentModal");
        this.clearTimer();
      }, this.movingTime);
    },
    handleMaskClick() {
      if (this.maskClose) {
        this.handleClose();
      }
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.modal {
  .top {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
  }

  .mask {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: rgba(0, 0, 0, 0.1);
    transition: background 0.2s linear;
  }

  .modal-fade {
    background: rgba(0, 0, 0, 0.7);
  }

  .content {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    background: #ffffff;
    transform: translateY(100%);
    transition: transform 0.2s linear;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding-bottom: env(safe-area-inset-bottom);

    .close {
      position: absolute;
      right: 10px;
      top: 14px;
      height: 32px;
      width: 32px;
      padding: 6px;
      z-index: 10;
      box-sizing: border-box;

      & > img {
        height: 20px;
        width: 20px;
      }
    }
  }
  .show-content {
    transform: translateY(0%);
  }
}
</style>

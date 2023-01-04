<template>
  <div class="modal" @click.stop>
    <div class="modal-layer"></div>
    <div class="modal-wrap">
      <div class="modal-wrap_content">
        {{ content }}
      </div>
      <div class="modal-wrap_op" @click="handleConfirm">{{ confirmText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: '...',
    },
    confirmText: {
      type: String,
      default: 'OK',
    },
  },
  methods: {
    handleConfirm() {
      this.$emit('confirm');
    },
  },
};
</script>

<style lang="less" scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  z-index: 999;

  &-layer {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #000000;
    opacity: 0.7;
  }

  &-wrap {
    position: relative;
    margin: 0 48px;
    width: calc(100% - 96px);
    background: #ffffff;
    border-radius: 16px;
    opacity: 1;
    animation: show 0.1s;

    &_content {
      padding: 20px 24px;
      text-align: center;
      color: #000000;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      box-sizing: border-box;
      border-bottom: 0.5px solid #e6e6e6;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
    }

    &_op {
      border-bottom-left-radius: 16px;
      border-bottom-right-radius: 16px;
      text-align: center;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 26px;
      color: #ff711f;
      padding: 12px 0;
    }
  }
}
@keyframes show {
  0% {
    transform: scale(0.6);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes show {
  0% {
    transform: scale(0.6);
  }
  100% {
    transform: scale(1);
  }
}
</style>

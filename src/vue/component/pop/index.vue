<template>
  <div>
    <button @click="handleShow">show</button>
    <Pop v-if="showPop" @handleClose="handleClose">
      <div>
        <div class="header">
          <div class="title">
            {{ "Share for more rewards" }}
          </div>
        </div>
        <div class="body">{{ content }}</div>
        <div class="footer">
          <div class="btn">{{ "share" }}</div>
        </div>
      </div>
    </Pop>
  </div>
</template>
<script>
import Pop from "./PopWrap.vue";
export default {
  components: {
    Pop,
  },
  data() {
    return {
      showPop: false,
      content:
        " Hi my friend,  I have a very good AI maths lesson to share with you here. My child has been studying in Creta Class recently, and he loves the fun AI interactive lessons, you",
    };
  },
  methods: {
    handleShow() {
      this.showPop = true;
    },
    handleClose() {
      this.showPop = false;
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  padding: 16px 0;
  height: 25px;
  position: relative;

  .title {
    position: absolute;
    left: 116px;
    top: 16px;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    color: #000000;
  }
}
.body {
  margin-top: 8px;
  padding: 0 16px;

  .replace-copy-text {
    margin-top: 20px;
    margin-bottom: 14px;
    display: flex;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    align-items: center;
    color: #9a45db;
    justify-content: center;

    .click-area {
      display: flex;
      align-items: center;
      & > img {
        height: 16px;
        width: 16px;
        margin-right: 8px;
      }
    }
  }

  .copy-text {
    padding: 12px 16px;
    background: #fafafa;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    border-radius: 12px;
  }
}
.footer {
  height: 64px;
  padding: 8px 16px;
  box-sizing: border-box;

  .btn {
    border-radius: 32px;
    background: linear-gradient(90deg, #dd39f9 0%, #9a45db 100%);
    font-weight: 500;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    line-height: 48px;
  }
}
</style>

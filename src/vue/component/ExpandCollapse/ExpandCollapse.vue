<template>
  <div class="expand-collapse" ref="content">
    {{ text }}
    <span class="collapse text" v-if="showCollapse" @click="handleCollapse">
      {{ collapse }}
    </span>
    <div v-if="showExpand" class="expand" :style="{ background: bgColor }">
      <div class="omit">...</div>
      <div class="text" @click="handleExpand">
        {{ expand }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    clamp: {
      type: Number,
      default: 3,
    },
    text: {
      type: String,
      default: '',
    },
    expand: {
      type: String,
      default: 'Expand',
    },
    collapse: {
      type: String,
      default: 'Collapse',
    },
    bgColor: {
      type: String,
      default: '#ffffff',
    },
  },
  data() {
    return {
      showExpand: false,
      showCollapse: false,
    };
  },
  mounted() {
    this.$refs.content.style['-webkit-line-clamp'] = this.clamp;
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      const { offsetHeight, scrollHeight } = this.$refs.content;
      if (offsetHeight < scrollHeight) {
        this.showExpand = true;
      }
    },
    handleExpand() {
      this.$refs.content.style = '';
      this.showExpand = false;
      this.showCollapse = true;
      this.$emit('handleOperate', 'expand');
    },
    handleCollapse() {
      this.$refs.content.style['-webkit-line-clamp'] = this.clamp;
      this.showExpand = true;
      this.showCollapse = false;
      this.$emit('handleOperate', 'collapse');
    },
  },
};
</script>

<style lang="less" scoped>
.expand-collapse {
  position: relative;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;

  .collapse {
    margin-left: 6px;
    display: inline-block;
  }

  .expand {
    position: absolute;
    bottom: 0px;
    right: 0px;
    display: flex;

    .omit {
      margin-right: 6px;
    }
  }
  .text {
    color: rgba(0, 0, 0, 0.4);
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>

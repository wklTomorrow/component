<template>
  <section class="faq">
    <h1>{{ `expand && fold` }}</h1>
    <h2 class="title">FAQs</h2>
    <ul class="content" key="content">
      <li
        v-for="(item, index) in content"
        :key="index"
        class="content-item"
        :ref="`detail-${index}`"
        :style="{ height: item.height ? `${item.height}px` : 'max-content' }"
      >
        <div
          class="operate"
          @click="handleExpandOrFold(item.expand, index)"
          :style="{ transform: `rotate(${item.iconDown ? 0 : 180}deg)` }"
        >
          <img :src="upIcon" />
        </div>
        <h3 class="item" :ref="`title-${index}`">
          {{ item.title }}
        </h3>
        <ul
          class="content detail"
          key="item"
          v-if="item.expand"
          :ref="`content-${index}`"
        >
          <li
            v-for="(des, i) in item.des"
            :key="[index, i].join(',')"
            class="item-li"
          >
            <h5 class="des">{{ des }}</h5>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>
<script>
import upIcon from "../../../asset/up.png";
export default {
  props: {
    list: {
      type: Array,
      default: () => [
        {
          title: "How to take classes?",
          expand: false,
          des: [
            "Math trial lessons are available on the Creta Class app, and after you purchase the lessons, you need to download the app to view your study schedule at Learn tab.",
            "Math trial lessons are available on the Creta Class app, and after you purchase the lessons, you need to download the app to view your study schedule at Learn tab.",
          ],
        },
        {
          title: "How to take classes?",
          expand: true,
          des: [
            "Math trial lessons are available on the Creta Class app, and after you purchase the lessons, you need to download the app to view your study schedule at Learn tab.",
            "Math trial lessons are available on the Creta Class app, and after you purchase the lessons, you need to download the app to view your study schedule at Learn tab.",
          ],
        },
        {
          title: "How to take classes?",
          expand: true,
          des: [
            "Math trial lessons are available on the Creta Class app, and after you purchase the lessons, you need to download the app to view your study schedule at Learn tab.",
            "Math trial lessons are available on the Creta Class app, and after you purchase the lessons, you need to download the app to view your study schedule at Learn tab.",
          ],
        },
        {
          title: "How to take classes?",
          expand: true,
          des: [
            "Math trial lessons are available on the Creta Class app, and after you purchase the lessons, you need to download the app to view your study schedule at Learn tab.",
            "Math trial lessons are available on the Creta Class app, and after you purchase the lessons, you need to download the app to view your study schedule at Learn tab.",
          ],
        },
      ],
    },
  },
  data() {
    return {
      upIcon,
      content: [],
    };
  },
  created() {
    Object.assign(
      this.content,
      this.list.map((item) => ({
        ...item,
        iconDown: item.expand,
      }))
    );
  },
  mounted() {
    this.$nextTick(() => {
      const padRefs = this.$refs[`detail-0`];
      if (padRefs && padRefs[0]) {
        const contentTop = parseFloat(
          getComputedStyle(padRefs[0])["padding-top"]
        );
        for (let i = 0; i < this.content.length; i++) {
          const refs = this.$refs[`title-${i}`];
          const titletHeight = parseFloat(getComputedStyle(refs[0])["height"]);
          const contentRefs = this.$refs[`content-${i}`];
          let contentHeight = 0;
          if (contentRefs && contentRefs[0]) {
            contentHeight = parseFloat(
              getComputedStyle(contentRefs[0])["height"]
            );
          }
          const minHeight = titletHeight + contentTop * 2;
          this.$set(this.content, i, {
            ...this.content[i],
            height: this.content[i].expand
              ? minHeight + contentHeight
              : minHeight,
            minHeight,
            maxHeight: contentHeight ? minHeight + contentHeight : 0,
          });
        }
      }
    });
  },
  destroyed() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
  methods: {
    handleExpandOrFold(expand, index) {
      const cur = this.content[index];
      this.content[index].iconDown = !expand;
      if (expand) {
        if (this.timer) {
          return;
        }
        this.content[index].height = cur.minHeight;
        // 动画效果持续200ms
        this.timer = setTimeout(() => {
          this.content[index].expand = !expand;
          clearTimeout(this.timer);
          this.timer = null;
        }, 200);
      } else {
        this.content[index].expand = !expand;
        if (cur.maxHeight) {
          this.content[index].height = this.content[index].maxHeight;
        } else {
          this.$nextTick(() => {
            const refs = this.$refs[`content-${index}`];
            const contentHeight = parseFloat(
              getComputedStyle(refs[0])["height"]
            );
            const maxHeight = cur.minHeight + contentHeight;
            this.$set(this.content, index, {
              ...cur,
              height: maxHeight,
              maxHeight,
            });
          });
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
h1,
h2,
h3 {
  margin: 0;
  padding: 0;
}
.faq {
  width: 100%;
  height: max-content;
  padding: 0 100px;
  background: #f7f7f7;
  .content {
    list-style-type: none;
    margin: 0;
    padding: 0;
    .content-item {
      padding: 24px;
      box-sizing: border-box;
      border-radius: 16px;
      background: #ffffff;
      margin-bottom: 16px;
      overflow: hidden;
      position: relative;
      transition: height 0.2s ease;
      .operate {
        position: absolute;
        right: 24px;
        top: 24px;
        height: 24px;
        width: 24px;
        transition: transform 0.2s ease;
        & > img {
          height: 100%;
          width: 100%;
        }
      }
      &:last-child {
        margin-bottom: 0px;
      }
      .item-li {
        margin-top: 16px;
        padding-left: 24px;
        padding-right: 48px;
        position: relative;
        &::before {
          content: "";
          height: 4px;
          width: 4px;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 50%;
          position: absolute;
          left: 8px;
          top: 8px;
        }
        &:first-child {
          margin-top: 0px;
        }
        .des {
          font-family: "SF Pro Text";
          font-style: normal;
          font-weight: 400;
          font-size: 20px;
          line-height: 24px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
      .item {
        font-family: "SF Pro Text";
        font-style: normal;
        font-weight: 400;
        font-size: 28px;
        line-height: 28px;
      }
    }
  }
  .detail {
    padding-top: 16px;
  }
  .title {
    text-align: center;
    font-family: "SF Pro Text";
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 60px;
    color: #000000;
    margin-bottom: 80px;
  }
}
</style>

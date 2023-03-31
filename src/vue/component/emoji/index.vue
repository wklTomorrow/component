<template>
  <div>
    <ul class="list">
      <li calss="item" v-for="(item, index) in allEmoji" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import allEmoji from "../../../js/allEmoji";
export default {
  data() {
    return {
      allEmoji,
    };
  },
};
</script>

<style lang="less" scoped>
.list {
  display: flex;
  max-width: 100%;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
}
</style>

<template>
  <div class="wrap">
    <draggable
      class="wrap-item"
      v-model="myArray"
      @start="handleStart"
      @end="drag = false"
    >
      <div v-for="element in myArray" :key="element.id" class="item">
        {{ element.name }}
      </div>
    </draggable>
    <draggable
      class="wrap-item"
      v-model="targetArr"
      @start="drag = true"
      @end="handleEnd"
      @add="addThis"
    >
      <div v-for="element in targetArr" :key="element.id" class="item">
        {{ element.name }}
      </div>
    </draggable>
    <div class="wrap-item">hello world</div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      drag: false,
      myArray: [
        { name: 1, id: 1 },
        { name: 2, id: 2 },
        { name: 3, id: 3 },
      ],
      targetArr: [],
    };
  },
  methods: {
    handleStart(...args) {
      console.log(args);
    },
    handleEnd(...args) {
      console.log(args);
    },
    handleDragEnd(...args) {
      console.log(args);
    },
    addThis(...args) {
      console.log(args);
    }
  },
};
</script>

<style lang="less" scoped>
.wrap {
  border: 1px lightpink solid;
  padding: 10px;
  display: flex;
  .wrap-item {
    flex: 1;
    margin-right: 20px;
    &:last-child {
      margin-right: 0px;
    }
  }
  .item {
    height: 100px;
    border: 1px lightgray solid;
    text-align: center;
    line-height: 100px;
    margin-bottom: 10px;
    cursor: no-drop;
  }
}
</style>

<template>
  <div>
    <div>use stroe, <br />vue: 2.6, <br />vuex: 3X</div>
    <div>
      count: {{ vuex.count }} <br />
      type: {{ vuex.type }}
    </div>
    <div>
      <button @click="add(vuex.count + 1)">add + 1</button>
      <button @click="decrease(vuex.count - 1)">decrease - 1</button>
    </div>
    <div>
      this is vue set components <br />
      {{ setValue.value }}
      <button @click="() => (this.setValue.value = 1111)">change</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      setValue: {
        value: 'test'
      },
    };
  },
  computed: {
    ...mapState(["vuex"]),
  },
  methods: {
    ...mapActions(["add", "decrease"]),
  },
};
</script>

<template>
  <div>
    <button @click="handleShow">show</button>
    <Modal
      v-if="showModal"
      :content="'hello world'"
      @confirm="handleConfirm"
    />
  </div>
</template>
<script>
import Modal from "./Modal.vue";
export default {
  components: {
    Modal,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    handleShow() {
      this.showModal = true;
    },
    handleConfirm() {
      this.showModal = false;
    },
  },
};
</script>

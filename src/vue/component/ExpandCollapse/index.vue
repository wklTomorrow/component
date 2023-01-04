<template>
  <div>
    <Expand :text="content" />
  </div>
</template>

<script>
import Expand from "./ExpandCollapse.vue";
export default {
  components: {
    Expand,
  },
  data() {
    return {
      content: `Hi my friend,  I have a very good AI maths lesson to share with you here. My child has been studying in Creta Class recently, and he loves the fun AI interactive lessons, you could try too! 
        Hi my friend,  I have a very good AI maths lesson to share with you here. My child has been studying in Creta Class recently, and he loves the fun AI interactive lessons, you could try too! 
        Hi my friend,  I have a very good AI maths lesson to share with you here. My child has been studying in Creta Class recently, and he loves the fun AI interactive lessons, you could try too! `,
    };
  },
};
</script>

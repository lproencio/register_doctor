<template>
  <div class="container-progress col-12">
    <div class="progress col-10">
      <div :style="{ width: (current / total) * 100 + '%' }"></div>
    </div>
    <p class="col-2">{{ current + " de " + total }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: { current: Number, total: Number },
});
</script>

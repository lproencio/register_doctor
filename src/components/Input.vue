<template>
  <div class="input">
    <label for="">{{ label }}</label>
    <input :type="type" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    type: String,
    label: String,
  },
});
</script>

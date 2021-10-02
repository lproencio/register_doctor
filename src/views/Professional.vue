<template>
  <div class="about">
    <div v-for="(item, i) in inputs_type" :key="i">
      <Input :type="item.type" :label="item.label" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import Input from "@/components/Input.vue";

export default defineComponent({
  name: "Professional",
  components: { Input },
  setup() {
    const inputs_type = ref([
      { type: "text", label: "Nome Completo*" },
      { type: "text", label: "CPF*" },
      { type: "text", label: "Número de celular*" },
    ]);

    return { inputs_type };
  },
});
</script>

<template>
  <div class="about">
    <div v-for="(item, i) in inputs_type" :key="i">
      <Input
        :type="item.type"
        :label="item.label"
        v-model:value="item.value"
        :placeholder="item.placeholder"
        :validation="item.validation"
      />
    </div>
    <button @click="log_info">teste</button>
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
      {
        type: "text",
        label: "Nome Completo*",
        value: "",
        validation: "name",
        placeholder: "Digite o nome completo",
      },
      {
        type: "text",
        label: "CPF*",
        value: "",
        validation: "cpf",
        placeholder: "Digite um CPF",
      },
      {
        type: "text",
        label: "Número de Celular*",
        value: "",
        validation: "phone",
        placeholder: "(00) 0 0000-0000",
      },
    ]);

    const log_info = () => {
      console.log(inputs_type);
    };

    return { inputs_type, log_info };
  },
});
</script>

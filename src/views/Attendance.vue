<template>
  <div class="professional attendance p-4 col-12">
    <h1>Sobre o atendimento</h1>
    <h2>Detalhes do atendimento</h2>
    <Select
      title="Especialidade principal*"
      :list="speciality"
      @selected="selected_speciality"
      :selected_option="selected_speciality"
      class="col-12"
    />
    <InputValue
      class="mt-4"
      title="Informe o preço da sonsulta*"
      v-model:value="consult_value"
    />
    <div class="mt-4" v-for="(payment, i) in payment_type" :key="i">
      <TypePayment
        :title="payment"
        :value="payment"
        :options="payment_options[payment]"
      />
    </div>
    <Progress :current="2" :total="2" />
    <button class="col-12" @click="save">PRÓXIMO</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import Select from "@/components/Select.vue";
import Progress from "@/components/Progress.vue";
import InputValue from "@/components/InputValue.vue";
import TypePayment from "@/components/TypePayment.vue";

export default defineComponent({
  components: {
    Select,
    Progress,
    InputValue,
    TypePayment,
  },
  setup() {
    const speciality = ref([
      "Cardiologia",
      "Dermatologia",
      "Neurologia",
      "Oftalmologia",
      "Psiquiatria",
      "Urologia",
    ]);

    const payment_type = ref(["Em dinheiro", "Pix", "Cartão de crédito"]);
    const payment_options = ref({
      "Em dinheiro": [],
      Pix: [],
      "Cartão de crédito": [
        { value: 1, label: "1x sem juros" },
        { value: 2, label: "2x sem juros" },
        { value: 3, label: "3x sem juros" },
      ],
    });

    const selected_speciality = ref<string>("");
    const consult_value = ref<string>("");

    return {
      speciality,
      selected_speciality,
      consult_value,
      payment_type,
      payment_options,
    };
  },
});
</script>
